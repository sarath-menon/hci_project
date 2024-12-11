import Image from "next/image";
import { MoreVertical } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useState } from "react";
// ... existing code ...
export interface StatusUpdate {
  id: string;
  type: "update" | "emoji" | "status";
  user: string;
  message: string;
  avatar?: string;
  mood: string;
  preferredCallTime: string;
  className?: string;
  props?: React.ComponentProps<"div">;
}

const updates: StatusUpdate[] = [
  {
    id: "1",
    type: "update",
    user: "Ma",
    message: "Having a nice and sunny day in the farm :)",
    avatar: "/avatar.png",
    mood: "😊 Happy",
    preferredCallTime: "9AM - 11AM",
  },
  {
    id: "2",
    type: "emoji",
    user: "Zola",
    message: "Just got my grade for Analysis exam",
    mood: "🤓 Excited",
    preferredCallTime: "3PM - 5PM",
  },
  {
    id: "3",
    type: "emoji",
    user: "Kagiso",
    message: "Don't wanna wake up, too tired to start a new day",
    mood: "😴 Tired",
    preferredCallTime: "2PM - 4PM",
  },
  {
    id: "4",
    type: "status",
    user: "Sisi",
    message: "At school, doing some work",
    mood: "📚 Busy",
    preferredCallTime: "6PM - 8PM",
  },
];

// Update the render section to display mood and preferred calling time
export function StatusList({
  className,
}: { className?: string } & React.ComponentProps<"div">) {
  const [showEmojiFor, setShowEmojiFor] = useState<string | null>(null);

  function handleAvatarClick(userId: string) {
    setShowEmojiFor(userId);
    setTimeout(function () {
      setShowEmojiFor(null);
    }, 2000);
  }

  return (
    <ScrollArea
      className={cn("flex h-[50vh] flex-col p-2 rounded-lg", className)}
    >
      {updates.map((update) => (
        <div
          key={update.id}
          className="flex flex-col p-4 rounded-lg bg-blue-100/30 my-2 border border-blue-100"
        >
          <div className="flex flex-col gap-3">
            <div className="flex items-center  ">
              <div className="flex items-center gap-2">
                <div
                  className="cursor-pointer"
                  onClick={function () {
                    handleAvatarClick(update.id);
                  }}
                >
                  {showEmojiFor === update.id ? (
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-lg">
                      {update.mood.split(" ")[0]}
                    </div>
                  ) : update.avatar ? (
                    <Image
                      src={update.avatar}
                      alt=""
                      className="w-10 h-10 rounded-full object-cover"
                      width={30}
                      height={30}
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                      {update.user.charAt(0)}
                    </div>
                  )}
                </div>
              </div>

              <div className="text-xs text-gray-500 text-right ml-auto">
                {update.preferredCallTime}
              </div>
            </div>

            <div>
              <div className="text-sm text-gray-600">
                {update.user} sent{" "}
                {update.type === "emoji"
                  ? "emoji of the day"
                  : "a " + update.type}
              </div>
              <div className="text-sm">{update.message}</div>
            </div>
          </div>
        </div>
      ))}
    </ScrollArea>
  );
}
