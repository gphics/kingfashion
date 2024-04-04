"use client";
import cookieStorage from "@/utils/cookieStorage";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";

function Template({ children }: { children: React.ReactNode }) {
  const mgt = cookieStorage.getUser();
  const router = useRouter();
  const currentPath = usePathname();
  if (currentPath === "/mgt" && mgt) {
    router.push("/mgt/dashboard");
    return;
  }
  if (currentPath !== "/mgt" && !mgt) {
    router.push("/mgt");
    return;
  }

  return <>{children}</>;
}

// export default Template;
