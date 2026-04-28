import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ApiEnv } from "@/lib/api-data";
import { BASE_URLS } from "@/lib/api-data";

const STORAGE_KEY = "invoicy-docs:env";

type EnvContextValue = {
  env: ApiEnv;
  baseUrl: string;
  setEnv: (env: ApiEnv) => void;
  toggleEnv: () => void;
};

const EnvContext = createContext<EnvContextValue | null>(null);

function readInitialEnv(): ApiEnv {
  if (typeof window === "undefined") return "homolog";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "prod" ? "prod" : "homolog";
}

export function EnvProvider({ children }: { children: React.ReactNode }) {
  const [env, setEnvState] = useState<ApiEnv>(readInitialEnv);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, env);
  }, [env]);

  const setEnv = useCallback((next: ApiEnv) => setEnvState(next), []);
  const toggleEnv = useCallback(
    () => setEnvState((cur) => (cur === "homolog" ? "prod" : "homolog")),
    [],
  );

  const value = useMemo<EnvContextValue>(
    () => ({ env, baseUrl: BASE_URLS[env], setEnv, toggleEnv }),
    [env, setEnv, toggleEnv],
  );

  return <EnvContext.Provider value={value}>{children}</EnvContext.Provider>;
}

export function useEnv(): EnvContextValue {
  const ctx = useContext(EnvContext);
  if (!ctx) throw new Error("useEnv must be used within an EnvProvider");
  return ctx;
}
