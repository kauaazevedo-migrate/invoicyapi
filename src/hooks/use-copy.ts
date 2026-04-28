import { useCallback, useRef, useState } from "react";

type UseCopyOptions = {
  resetMs?: number;
};

export function useCopyToClipboard({ resetMs = 1600 }: UseCopyOptions = {}) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copy = useCallback(
    async (value: string) => {
      try {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => setCopied(false), resetMs);
      } catch {
        /* clipboard not available — silent fail */
      }
    },
    [resetMs],
  );

  return { copied, copy };
}
