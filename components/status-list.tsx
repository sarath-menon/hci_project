import Image from "next/image";
import { MoreVertical } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export interface StatusUpdate {
  id: string;
  type: "update" | "emoji" | "status";
  user: string;
  message: string;
  avatar?: string;
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
  },
  {
    id: "2",
    type: "emoji",
    user: "Zola",
    message: "Just got my grade for Analysis exam",
  },
  {
    id: "3",
    type: "emoji",
    user: "Kagiso",
    message: "Don't wanna wake up, too tired to start a new day",
  },
  {
    id: "4",
    type: "status",
    user: "Sisi",
    message: "At school",
  },
];

export function StatusList({
  className,
  ...props
}: { className?: string } & React.ComponentProps<"div">) {
  return (
    <ScrollArea
      className={cn("flex h-[50vh] flex-col  p-4 rounded-lg", className)}
    >
      {updates.map((update) => (
        <div
          key={update.id}
          className="flex items-start justify-between p-4 rounded-lg bg-blue-100/30 my-2 border border-blue-100"
        >
          <div className="flex gap-3">
            {update.avatar ? (
              <Image
                src={update.avatar}
                alt=""
                className="w-10 h-10 rounded-full object-cover"
                width={30}
                height={30}
              />
            ) : (
              <div className="w-10 h-10 rounded-full  flex items-center justify-center">
                {update.user.charAt(0)}
              </div>
            )}
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
          <button className="text-gray-400">
            <MoreVertical className="h-5 w-5" />
          </button>
        </div>
      ))}
    </ScrollArea>
  );
}
