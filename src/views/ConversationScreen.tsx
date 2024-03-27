import { LastVoiceMessage } from '@/components/LastVoiceMessage';
import { VoiceAnimationState } from '@/components/VoiceAnimation';
import { WaitingPrompt } from '@/components/WaitingPrompt';
import { WebGLAvatar } from '@/components/WebGLAvatar';
import { Backdrop } from '@/components/WebGLBackdrop';
import { useLayoutStore } from '@/store/layout';
import { useVoice } from '@humeai/voice-react';

export const ConversationScreen = () => {
  const { lastVoiceMessage, isPlaying, micFft, lastUserMessage } = useVoice();
  const frameSize = useLayoutStore((store) => store.frameSize);

  return (
    <>
      <LastVoiceMessage lastVoiceMessage={lastVoiceMessage} />
      {!lastUserMessage ? <WaitingPrompt /> : null}
      <WebGLAvatar
        fft={micFft}
        isPlaying={isPlaying}
        prosody={lastVoiceMessage?.models.prosody?.scores ?? {}}
        width={400}
        height={frameSize.height - 100}
      />
      <Backdrop
        prosody={lastVoiceMessage?.models.prosody?.scores ?? {}}
        activeView={VoiceAnimationState.IDLE}
      />
    </>
  );
};
