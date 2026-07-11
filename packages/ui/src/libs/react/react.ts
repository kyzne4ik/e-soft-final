import { createContext, useContext, type Context } from "react";

export function createStrictContext<T>(): Context<T | null> {
  return createContext<T | null>(null);
}

export function useStrictContext<T>(context: Context<T | null>): T {
  const value = useContext(context);
  if (value === null) {
    throw new Error("Strict context value is not provided");
  }
  return value;
}
