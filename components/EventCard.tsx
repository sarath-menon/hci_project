import { Card, CardContent } from "@/components/ui/card";

interface EventCardProps {
  title: string;
  time: string;
  person: string;
  bgColor: string;
}

function EventCard({ title, time, person, bgColor }: EventCardProps) {
  return (
    <Card className="w-full mb-4">
      <CardContent
        className={`flex items-center p-4 ${bgColor} bg-opacity-20 hover:bg-opacity-30 transition-colors`}
      >
        <div className="flex items-center gap-4">
          <div className={`w-3 h-3 rounded-full ${bgColor}`} />
          <div>
            <p className="text-sm text-muted-foreground">{time}</p>
            <h3 className="font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground">with {person}</p>
          </div>
        </div>

        <div
          className="ml-auto h-6 w-6 rounded-full"
          style={{ backgroundColor: bgColor }}
        />
      </CardContent>
    </Card>
  );
}

export default EventCard;
