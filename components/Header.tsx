"use client";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { ChevronLeft, Flag } from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useFeatureFlagVariantKey } from "posthog-js/react";

interface HeaderProps {
  heading: string;
}

export function Header({ heading }: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const eventDialogVariant = useFeatureFlagVariantKey("new-event-dialog");
  const callButtonVariant = useFeatureFlagVariantKey("call-button-home");

  function handleBack() {
    router.back();
  }

  return (
    <header className="min-w-screen flex justify-between items-center p-4 bg-green-500">
      {pathname !== "/home" && (
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-green-600"
          onClick={handleBack}
        >
          {pathname !== "/" ? <ChevronLeft className="h-5 w-5" /> : null}
        </Button>
      )}

      <span className="text-white text-lg font-semibold">{heading}</span>

      <div className="flex items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-green-600 text-white"
            >
              <Flag className="h-5 w-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-72 p-4">
            <div className="space-y-4">
              <div className="border-b pb-2">
                <p className="text-sm text-muted-foreground">
                  Current active feature flag variants
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium">new-event-dialog</p>
                    <p className="text-xs text-muted-foreground">
                      Dialog variant configuration
                    </p>
                  </div>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                    {eventDialogVariant || "default"}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium">call-button-home</p>
                    <p className="text-xs text-muted-foreground">
                      Call button visibility
                    </p>
                  </div>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                    {callButtonVariant || "default"}
                  </span>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <div className="w-10 h-10 rounded-full overflow-hidden">
          <Link href="/profile">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/avatar.png" alt="Profile" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </div>
    </header>
  );
}
