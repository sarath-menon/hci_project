"use client";

import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Calendar as CalendarIcon, Film, Plus } from "lucide-react";
import EventCard from "@/components/EventCard";
import { Header } from "@/components/Header";
import PageLayout from "@/components/page-layout";

export default function SchedulerPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const events = [
    {
      date: new Date(2024, 2, 29),
      title: "Movie Night",
      time: "19:30-22:30",
      icon: <Film className="h-5 w-5" />,
    },
  ];

  return (
    <div className="flex flex-col ">
      <Header heading="Scheduler" />

      <PageLayout>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="flex justify-center rounded-md "
        />

        <div className="mt-16">
          <div className="flex justify-center items-center mb-6">
            <Button variant="secondary" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Event
            </Button>
          </div>

          {events.map((event, index) => (
            <EventCard
              key={index}
              title={event.title}
              time={event.time}
              icon={event.icon}
            />
          ))}
        </div>
      </PageLayout>
    </div>
  );
}
