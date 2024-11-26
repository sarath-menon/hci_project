import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { ChevronLeft } from "lucide-react";

export function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-green-500">
      <Button variant="ghost" size="icon" className=" hover:bg-green-600">
        <ChevronLeft className="h-5 w-5 " />
      </Button>
      <div className="w-10 h-10 rounded-full overflow-hidden">
        <Avatar>
          <AvatarImage src="/avatar.png" alt="Profile" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
