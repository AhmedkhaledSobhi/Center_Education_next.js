import { useEffect } from "react";

import type { Metadata } from "next";

function hasEmptyValue(obj: Record<string, unknown>): boolean {
  return Object.values(obj).some(
    (val) =>
      val === null ||
      val === undefined ||
      val === "" ||
      (typeof val === "object" && Object.keys(val).length === 0)
  );
}
export function hasEmptyValueV2(obj: unknown) {
  if (!obj || typeof obj !== "object") return true;

  return Object.values(obj as Record<string, unknown>).some((val) => {
    return (
      val === null ||
      val === undefined ||
      val === "" ||
      (typeof val === "object" &&
        val !== null &&
        Object.keys(val as object).length === 0)
    );
  });
}
function usePageTitle(title: string) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

export {
  hasEmptyValue,
  usePageTitle,
}