"use client";

import { Calendar } from "@/components/ui/calendar";
import { useState, useEffect } from "react";
import { Film } from "lucide-react";
import EventCard from "@/components/EventCard";
import { Header } from "@/components/Header";
import PageLayout from "@/components/page-layout";
import EventForm, { EventFormData } from "@/components/EventForm";
import { sampleEvents, type Event } from "@/lib/data";

function getRandomEvents(allEvents: Event[], count: number = 2): Event[] {
  const shuffled = [...allEvents].sort(function () {
    return 0.5 - Math.random();
  });
  return shuffled.slice(0, count);
}

export default function SchedulerPage() {
  const [date, setDate] = useState<Date>(new Date());
  const [displayedEvents, setDisplayedEvents] = useState<Event[]>([]);

  useEffect(
    function updateDisplayedEvents() {
      if (!date) return;
      const randomEvents = getRandomEvents(sampleEvents);
      setDisplayedEvents(randomEvents);
    },
    [date]
  );

  function handleAddEvent(data: EventFormData) {
    const newEvent = {
      id: String(sampleEvents.length + 1),
      title: data.title,
      time: data.time,
    };

    sampleEvents.push(newEvent);
    const randomEvents = getRandomEvents(sampleEvents);
    setDisplayedEvents(randomEvents);
  }

  return (
    <div className="flex flex-col">
      <Header heading="Scheduler" />

      <PageLayout className="space-y-8">
        <Calendar
          mode="single"
          selected={date}
          onSelect={function handleSelect(newDate: Date | undefined) {
            if (newDate) setDate(newDate);
          }}
          disabled={function disablePastDates(date: Date) {
            return date < new Date();
          }}
          className="flex justify-center rounded-3xl bg-blue-100/30 p-4"
        />

        <div>
          <div className="flex justify-center items-center mb-6">
            <EventForm onSubmit={handleAddEvent} initialDate={date} />
          </div>

          {displayedEvents.length === 0 && (
            <p className="text-center text-gray-500">No events for this date</p>
          )}

          {displayedEvents.map(function renderEvent(event) {
            return (
              <EventCard
                key={event.id}
                title={event.title}
                time={event.time}
                icon={<Film className="h-5 w-5" />}
              />
            );
          })}
        </div>
      </PageLayout>
    </div>
  );
}
