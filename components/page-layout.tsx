import { cn } from "@/lib/utils";

export default function PageLayout({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("px-10 py-4 ", className)} {...props}>
      {children}
    </div>
  );
}
