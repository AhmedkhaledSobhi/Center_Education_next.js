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
    const token = localStorage.getItem("access_token");

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