"use client";

import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Film, Plus } from "lucide-react";
import EventCard from "@/components/EventCard";
import { Header } from "@/components/Header";
import PageLayout from "@/components/page-layout";
import EventForm, { EventFormData } from "@/components/EventForm";

export default function SchedulerPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState([
    {
      date: new Date(2024, 2, 29),
      title: "Movie Night",
      time: "19:30-22:30",
      icon: <Film className="h-5 w-5" />,
    },
  ]);

  function handleAddEvent(data: EventFormData) {
    setEvents([
      ...events,
      {
        date: new Date(data.date),
        title: data.title,
        time: data.time,
        icon: <Film className="h-5 w-5" />,
      },
    ]);
  }

  return (
    <div className="flex flex-col">
      <Header heading="Scheduler" />

      <PageLayout className="space-y-8">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="flex justify-center rounded-3xl  bg-blue-100/30 p-4"
        />

        <div>
          <div className="flex justify-center items-center mb-6">
            <EventForm onSubmit={handleAddEvent} />
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
