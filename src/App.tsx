import { IframeFallback } from '@/components/IframeFallback';
import { IframeGuard } from '@/components/IframeGuard';
import { MessageListener } from '@/components/MessageListener';
import { useConfigStore } from '@/store/config';
import { useLayoutStore } from '@/store/layout';
import { parentDispatch } from '@/utils/parentDispatch';
import { Views } from '@/views/Views';
import { TRANSCRIPT_MESSAGE_ACTION } from '@humeai/voice-embed-react';
import { VoiceProvider } from '@humeai/voice-react';
import { AnimatePresence } from 'framer-motion';
import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';
import { ComponentProps } from 'react';

import './App.css';
import { Frame } from './components/Frame';

if (typeof window !== 'undefined') {
  posthog.init(import.meta.env['VITE_PUBLIC_POSTHOG_KEY'], {
    api_host:
      import.meta.env['VITE_PUBLIC_POSTHOG_HOST'] || 'https://app.posthog.com',
    loaded: (posthog) => {
      if (import.meta.env.NODE_ENV === 'development') posthog.debug(); // debug mode in development
    },
    capture_pageview: true,
    disable_session_recording: false,
    enable_recording_console_log: true,
    property_blacklist: [],
  });
}

function App() {
  const setConfig = useConfigStore((store) => store.setConfig);
  const config = useConfigStore((store) => store.config);

  const open = useLayoutStore((store) => store.open);
  const setFrameSize = useLayoutStore((store) => store.setFrameSize);

  const dispatchMessage: ComponentProps<typeof VoiceProvider>['onMessage'] = (
    message,
  ) => {
    posthog.capture('message_received', {
      message,
    });

    if (
      message.type === 'user_message' ||
      message.type === 'assistant_message'
    ) {
      parentDispatch(TRANSCRIPT_MESSAGE_ACTION(message));
    }
  };

  return (
    <>
      <PostHogProvider client={posthog}>
        <IframeGuard fallback={IframeFallback}>
          <MessageListener
            onUpdateConfig={(config) => {
              setConfig(config);
            }}
            onOpen={(dimensions) => {
              setFrameSize(dimensions);
              open();
            }}
            onResize={(dimensions) => {
              setFrameSize(dimensions);
            }}
          />
          {config ? (
            <Frame>
              <AnimatePresence mode={'wait'}>
                <VoiceProvider
                  {...config}
                  onMessage={dispatchMessage}
                  onError={(err) => {
                    posthog.capture('api_error', { error: err });
                  }}
                  onClose={(e) => {
                    posthog.capture('socket_closed', { event: e });
                  }}
                >
                  <Views />
                </VoiceProvider>
              </AnimatePresence>
            </Frame>
          ) : null}
        </IframeGuard>
      </PostHogProvider>
    </>
  );
}

export default App;
