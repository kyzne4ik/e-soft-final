import { type RefObject, useEffect, useRef, useState } from "react";
import { useClickOutside } from "../use-click-outside";
import { useEventListener } from "../use-event-listener";

export interface UseOverlayResult<T extends HTMLElement> {
  ref: RefObject<T | null>;
  isMounted: boolean;
  isClosing: boolean;
  onAnimationEnd: () => void;
}

export function useOverlay<T extends HTMLElement = HTMLDivElement>(
  isOpen: boolean,
  onClose: () => void,
): UseOverlayResult<T> {
  const ref = useRef<T | null>(null);
  const [isMounted, setIsMounted] = useState(isOpen);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      setIsClosing(false);
    } else {
      setIsClosing(true);
    }
  }, [isOpen]);

  const onKeyDown = (event: Event) => {
    if ((event as KeyboardEvent).key === "Escape" && isOpen) onClose();
  };

  const onAnimationEnd = () => {
    if (isClosing) {
      setIsClosing(false);
      setIsMounted(false);
    }
  };

  useClickOutside(ref, onClose);
  useEventListener("keydown", window, onKeyDown);

  return { ref, isMounted, isClosing, onAnimationEnd };
}
