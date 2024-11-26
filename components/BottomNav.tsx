import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Phone, Calendar, BarChart } from "lucide-react";

export function BottomNav() {
  return (
    <nav className="border-t bg-green-500 p-4">
      <div className="flex justify-around items-center">
        <Link href="/">
          <Button
            variant="ghost"
            className="flex flex-col items-center gap-1 text-white hover:bg-green-600"
          >
            <Home className="h-5 w-5" />
            <span className="text-xs">Home</span>
          </Button>
        </Link>

        <Link href="/call">
          <Button
            variant="ghost"
            className="flex flex-col items-center gap-1 text-white hover:bg-green-600"
          >
            <Phone className="h-5 w-5" />
            <span className="text-xs">Call</span>
          </Button>
        </Link>

        <Link href="/scheduler">
          <Button
            variant="ghost"
            className="flex flex-col items-center gap-1 text-white hover:bg-green-600"
          >
            <Calendar className="h-5 w-5" />
            <span className="text-xs">Scheduler</span>
          </Button>
        </Link>

        <Link href="/stats">
          <Button
            variant="ghost"
            className="flex flex-col items-center gap-1 text-white hover:bg-green-600"
          >
            <BarChart className="h-5 w-5" />
            <span className="text-xs">Stats</span>
          </Button>
        </Link>
      </div>
    </nav>
  );
}
