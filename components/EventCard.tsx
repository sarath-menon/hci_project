import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface EventCardProps {
  title: string;
  time: string;
  icon: React.ReactNode;
}

function EventCard({ title, time, icon }: EventCardProps) {
  return (
    <Card className="w-full mb-4">
      <CardContent className="flex items-center p-4">
        <div className="flex items-center gap-4">
          {icon}
          <div>
            <p className="text-sm text-muted-foreground">{time}</p>
            <h3 className="font-semibold">{title}</h3>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default EventCard;
