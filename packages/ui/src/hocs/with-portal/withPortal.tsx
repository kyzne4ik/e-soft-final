import { createPortal } from "react-dom";
import type { ComponentType } from "react";

export function withPortal<P extends object>(
  Component: ComponentType<P>,
  containerId = "portals",
) {
  return function Portaled(props: P) {
    const container = document.getElementById(containerId);
    if (!container) return null;
    return createPortal(<Component {...props} />, container);
  };
}
