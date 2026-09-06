"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type IntroState = {
  /** Yuklanish ekrani tugadi — sahifa kinematik intro boshlashi mumkin */
  ready: boolean;
  markReady: () => void;
};

const IntroCtx = createContext<IntroState>({ ready: false, markReady: () => {} });

export function IntroProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const markReady = useCallback(() => setReady(true), []);
  const value = useMemo(() => ({ ready, markReady }), [ready, markReady]);

  return <IntroCtx.Provider value={value}>{children}</IntroCtx.Provider>;
}

export function useIntro() {
  return useContext(IntroCtx);
}
