import { Button } from '@/components/Button';
import { FC } from 'react';
import { match } from 'ts-pattern';
import { Balancer } from 'react-wrap-balancer';

type ErrorScreenProps = {
  errorType: 'socket_error' | 'audio_error' | 'mic_error' | 'unknown';
  errorReason: string;
  onConnect: () => void;
  isConnecting: boolean;
};

export const ErrorScreen: FC<ErrorScreenProps> = ({
  errorType,
  errorReason,
  onConnect,
  isConnecting,
}) => {
  return (
    <div className="mt-12 flex w-full flex-col items-center justify-center gap-2">
      {match(errorType)
        .with('socket_error', () => {
          return (
            <>
              <Balancer className="text-center text-2xl font-medium">
                Our demo is at capacity right now
              </Balancer>
              <Balancer className="text-center">
                Try refreshing the page. We're working hard to make sure
                everyone can chat with our empathic voice AI.
              </Balancer>
            </>
          );
        })
        .with('mic_error', () => {
          return (
            <>
              <Balancer className="text-center text-xl font-medium">
                We were unable to connect to a microphone
              </Balancer>
              <Balancer className="text-center">
                Please enable microphone permissions on your browser and try
                again.
              </Balancer>
            </>
          );
        })
        .with('audio_error', () => {
          return (
            <>
              <Balancer className="text-center text-xl font-medium">
                We experienced an issue enabling audio playback
              </Balancer>
              <Balancer className="text-center">
                Please check your browser permissions and try again.
              </Balancer>
            </>
          );
        })
        .otherwise(() => {
          return (
            <>
              <Balancer className="text-center text-xl font-medium">
                Sorry, something went wrong and we had to end your session.
              </Balancer>
              <Balancer className="text-center">
                Error reason: {errorReason}
              </Balancer>
            </>
          );
        })}

      <div className="pt-2">
        <Button
          onClick={onConnect}
          isLoading={isConnecting}
          loadingText={'Connecting...'}
        >
          Reconnect
        </Button>
      </div>
    </div>
  );
};
