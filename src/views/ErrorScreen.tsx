import { Button } from '@/components/Button';
import { FC } from 'react';
import { P, match } from 'ts-pattern';

type ErrorScreenProps = {
  errorType: 'socket_error' | 'audio_error' | 'mic_error';
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
    <div className="flex flex-col items-center justify-center">
      {match(errorType)
        .with('socket_error', () => {
          return <>Our demo is at capacity</>;
        })
        .with('mic_error', () => {
          return (
            <>
              <div>We were unable to connect to a microphone</div>
              <div>
                Please enable microphone permissions on your browser and try
                again.
              </div>
            </>
          );
        })
        .with('audio_error', () => {
          return (
            <>
              <div>We experienced an issue enabling audio playback</div>
              <div>Please check your browser permissions and try again.</div>
            </>
          );
        })
        .otherwise(() => {
          return (
            <>
              <div className="text-center">
                Sorry, we had to end your session.
              </div>
              <div>Error: {errorReason}</div>
            </>
          );
        })}

      <div className="pt-4">
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
