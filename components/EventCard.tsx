import { Card, CardContent } from "@/components/ui/card";

interface EventCardProps {
  title: string;
  time: string;
}

function EventCard({ title, time }: EventCardProps) {
  return (
    <Card className="w-full mb-4 bg-gray-300/30 pl-4">
      <CardContent className="flex items-center p-4">
        <div className="flex items-center gap-4">
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
