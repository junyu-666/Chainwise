"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "chainwise:progress:v1";

interface ProgressState {
  completedSteps: string[];
}

function read(): ProgressState {
  if (typeof window === "undefined") return { completedSteps: [] };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { completedSteps: [] };
    const parsed = JSON.parse(raw) as ProgressState;
    return { completedSteps: parsed.completedSteps ?? [] };
  } catch {
    return { completedSteps: [] };
  }
}

function write(state: ProgressState) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* localStorage 不可用时静默降级 */
  }
}

/**
 * 学习进度 hook，基于 localStorage。
 * 第一版不强制登录，进度仅存在浏览器本地。
 */
export function useProgress() {
  const [completed, setCompleted] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setCompleted(read().completedSteps);
    setLoaded(true);
  }, []);

  const isDone = useCallback(
    (key: string) => completed.includes(key),
    [completed],
  );

  const markDone = useCallback((key: string) => {
    setCompleted((prev) => {
      if (prev.includes(key)) return prev;
      const next = [...prev, key];
      write({ completedSteps: next });
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setCompleted([]);
    write({ completedSteps: [] });
  }, []);

  return { completed, isDone, markDone, reset, loaded };
}
