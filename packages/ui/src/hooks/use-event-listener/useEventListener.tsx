import { type RefObject, useEffect } from "react";

export function useEventListener<K extends keyof HTMLElementEventMap>(
  event: K,
  element: RefObject<HTMLElement> | Window,
  callback: (event: Event) => void,
) {
  useEffect(() => {
    const el =
      element === window ? window : (element as RefObject<HTMLElement>).current;
    if (!el) return;

    const handler = (e: HTMLElementEventMap[K]) => callback(e);

    el.addEventListener(event, handler as EventListener);

    return () => {
      el.removeEventListener(event, handler as EventListener);
    };
  }, [event, element, callback]);
}
