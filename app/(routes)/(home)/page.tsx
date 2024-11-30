"use client";

import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon, Phone, Calendar } from "lucide-react";
import PageLayout from "@/components/page-layout";
import { Header } from "@/components/Header";
import { StatusList } from "@/components/status-list";
import Link from "next/link";
import { usePostHog, useFeatureFlagEnabled } from "posthog-js/react";
import { toast } from "sonner";

export default function HomePage() {
  const posthog = usePostHog();

  const isCallFlagEnabled = useFeatureFlagEnabled("call-button-home");

  console.log("isCallFlagEnabled", isCallFlagEnabled);

  console.log(
    "posthog.getFeatureFlag",
    posthog.getFeatureFlag("call-button-home")
  );

  const isCallFlagEnabled_ = posthog.getFeatureFlag("call-button-home");

  console.log("isCallFlagEnabled_", isCallFlagEnabled_);

  const callURL = `/call?name=${encodeURIComponent("gf❤️")}`;

  if (isCallFlagEnabled) {
    toast("Event has been created", {
      description: ", it's your turn to call gf❤️ today!",
      action: {
        label: "Call",
        onClick: function () {
          window.location.href = callURL;
        },
      },
    });
  }

  return (
    <div className="flex flex-col ">
      <Header heading="Home" />
      <PageLayout className="space-y-8">
        {!isCallFlagEnabled && (
          <>
            <Alert className="mb-6 bg-[#FFF8E7] border-[#FFF8E7]">
              <InfoIcon className="h-5 w-5" />
              <AlertDescription>
                Hey Airam, it&apos;s your turn to call gf❤️ today!
              </AlertDescription>
            </Alert>

            <div className="flex flex-col gap-4">
              <Link href={callURL}>
                <Button
                  id="call-button-home"
                  className="w-full gap-2 "
                  variant="default"
                >
                  <Phone className="h-5 w-5" />
                  Call
                </Button>
              </Link>

              {/* <Link href="/scheduler">
                <Button
                  id="scheduler-button-home"
                  // onClick={() => posthog.capture("$schedule_call")}
                  className="w-full gap-2 text-black"
                  variant="secondary"
                >
                  <Calendar className="h-5 w-5" />
                  Schedule a call
                </Button>
              </Link> */}
            </div>
          </>
        )}

        <StatusList />
      </PageLayout>
    </div>
  );
}
