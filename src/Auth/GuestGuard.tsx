"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

export default function GuestGuard({ children }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (token) {
      const lang = pathname.split("/")[1] || "en";
      router.replace(`/${lang}/dashboard`);
      return;
    }

    setReady(true);
  }, [pathname, router]);

  if (!ready) return null;

  return <>{children}</>;
}