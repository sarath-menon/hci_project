"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Home, Phone, Calendar, BarChart, Contact } from "lucide-react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = {
  href: string;
  icon: LucideIcon;
  label: string;
};

const navItems: NavItem[] = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/contacts", icon: Contact, label: "Contact" },
  { href: "/scheduler", icon: Calendar, label: "Scheduler" },
  { href: "/stats", icon: BarChart, label: "Stats" },
];

function NavLink({ href, icon: Icon, label }: NavItem) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href}>
      <Button
        variant="ghost"
        className={cn(
          "flex flex-col items-center gap-1 text-white hover:bg-green-600",
          isActive && "text-green-900 font-semibold"
        )}
      >
        <Icon className="h-5 w-5" />
        <span className="text-xs">{label}</span>
      </Button>
    </Link>
  );
}

export function BottomNav() {
  return (
    <nav className="border-t bg-green-500 p-4">
      <div className="flex justify-around items-center">
        {navItems.map((item) => (
          <NavLink key={item.href} {...item} />
        ))}
      </div>
    </nav>
  );
}
