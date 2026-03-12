import { useEffect } from "react";

type KeyHandler = (e: KeyboardEvent) => void;

export function useKeyboard(key: string, handler: KeyHandler, deps: unknown[] = []) {
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key === key) handler(e);
    };
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, ...deps]);
}
