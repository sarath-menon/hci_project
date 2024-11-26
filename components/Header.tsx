"use client";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface HeaderProps {
  heading: string;
}

export function Header({ heading }: HeaderProps) {
  const router = useRouter();

  function handleBack() {
    router.back();
  }

  return (
    <header className="min-w-screen flex justify-between items-center p-4 bg-green-500">
      <Button
        variant="ghost"
        size="icon"
        className="hover:bg-green-600"
        onClick={handleBack}
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>

      <span className="text-white text-lg font-semibold">{heading}</span>

      <div className="w-10 h-10 rounded-full overflow-hidden">
        <Link href="/profile">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatar.png" alt="Profile" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </header>
  );
}
