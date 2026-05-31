"use client";

import { useCallback, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

type PendingNav = {
  target: string;
  resolve: () => void;
  reject: (error: Error) => void;
  timer: ReturnType<typeof setTimeout>;
};

export function useAgentNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const pendingRef = useRef<PendingNav | null>(null);

  useEffect(() => {
    const pending = pendingRef.current;
    if (!pending) return;
    if (pathname === pending.target || pathname.startsWith(`${pending.target}/`)) {
      clearTimeout(pending.timer);
      pending.resolve();
      pendingRef.current = null;
    }
  }, [pathname]);

  const navigate = useCallback(
    (path: string) => {
      const target = path.split("?")[0];
      if (pathname === target || pathname.startsWith(`${target}/`)) {
        return Promise.resolve();
      }

      return new Promise<void>((resolve, reject) => {
        if (pendingRef.current) {
          clearTimeout(pendingRef.current.timer);
        }

        const timer = setTimeout(() => {
          if (pendingRef.current?.target === target) {
            pendingRef.current = null;
            reject(new Error(`Timed out waiting for route: ${target}`));
          }
        }, 25000);

        pendingRef.current = {
          target,
          resolve,
          reject,
          timer,
        };

        router.push(path);
      });
    },
    [pathname, router]
  );

  return navigate;
}
