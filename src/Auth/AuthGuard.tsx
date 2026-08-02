"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const getStoredToken = () => {
      const storedValue = window.localStorage.getItem("access_token");

      if (!storedValue || storedValue === "null" || storedValue === "undefined") {
        return null;
      }

      try {
        const parsedValue = JSON.parse(storedValue);
        if (typeof parsedValue === "string" && parsedValue.trim()) {
          return parsedValue;
        }
      } catch {
        // Fall back to the raw value when it is not valid JSON.
      }

      return storedValue.trim() ? storedValue : null;
    };

    const token = getStoredToken();

    if (!token) {
      const lang = pathname.split("/")[1] || "en";
      router.replace(`/${lang}/login`);
      return;
    }

    setAuthorized(true);
  }, [pathname, router]);

  if (!authorized) return null;

  return <>{children}</>;
}