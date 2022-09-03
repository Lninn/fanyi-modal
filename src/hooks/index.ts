import { useCallback, useRef } from 'react';

type Callback = (...args: any[]) => unknown;

export function useEvent(callback: Callback) {
  const callbackRef = useRef<Callback>(callback);

  callbackRef.current = callback;

  const event = useCallback((...args: any[]) => {
    return callbackRef.current.apply(null, args);
  }, []);

  return event;
}
