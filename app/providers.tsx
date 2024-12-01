// app/providers.tsx
"use client";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { useEffect } from "react";

export function PHProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // if (
    //   !process.env.NEXT_PUBLIC_POSTHOG_KEY ||
    //   !process.env.NEXT_PUBLIC_POSTHOG_HOST
    // ) {
    //   console.log("API keys not found");
    //   return;
    // }

    posthog.init("phc_fuBfkF0LRmH68aRcjj2XDR6m3uYx3DKraUiqHA9GRLa", {
      api_host: "https://eu.i.posthog.com",
      person_profiles: "identified_only",
      capture_pageview: false,
    });
  }, []);

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
