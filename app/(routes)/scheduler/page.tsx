"use client";

import { Calendar } from "@/components/ui/calendar";
import { useState, useEffect } from "react";
import EventCard from "@/components/EventCard";
import { Header } from "@/components/Header";
import PageLayout from "@/components/page-layout";
import EventForm, { EventFormData } from "@/components/EventForm";
import { sampleEvents, type Event, eventTypes } from "@/lib/data";
import { format } from "date-fns";

function getRandomEvents(
  allEvents: Event[],
  selectedDate: Date,
  count: number = 2
): Event[] {
  const eventsForDate = allEvents.filter(function (event) {
    const eventDate = new Date(event.time.start);
    return (
      eventDate.getDate() === selectedDate.getDate() &&
      eventDate.getMonth() === selectedDate.getMonth() &&
      eventDate.getFullYear() === selectedDate.getFullYear()
    );
  });

  const shuffled = [...eventsForDate].sort(function () {
    return 0.5 - Math.random();
  });

  const selectedEvents = shuffled.slice(0, count);

  return selectedEvents.sort(function (a, b) {
    return new Date(a.time.start).getTime() - new Date(b.time.start).getTime();
  });
}

export default function SchedulerPage() {
  const [date, setDate] = useState<Date>(new Date());
  const [displayedEvents, setDisplayedEvents] = useState<Event[]>([]);

  useEffect(
    function updateDisplayedEvents() {
      console.log("date", date);
      if (!date) return;
      const randomEvents = getRandomEvents(sampleEvents, date);
      console.log("randomEvents", randomEvents);
      setDisplayedEvents(randomEvents);
    },
    [date]
  );

  function handleAddEvent(data: EventFormData) {
    const startDate = new Date(date);
    const [hours, minutes] = data.time.start.split(":");
    startDate.setHours(parseInt(hours), parseInt(minutes));

    const endDate = new Date(date);
    const [endHours, endMinutes] = data.time.end.split(":");
    endDate.setHours(parseInt(endHours), parseInt(endMinutes));

    const selectedEventType = eventTypes.find(function findEventType(type) {
      return type.id === data.eventTypeId;
    });

    if (!selectedEventType) return;

    const newEvent = {
      id: String(sampleEvents.length + 1),
      eventType: selectedEventType,
      time: {
        start: startDate.toISOString(),
        end: endDate.toISOString(),
      },
    };

    sampleEvents.push(newEvent);
    const randomEvents = getRandomEvents(sampleEvents, date);
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
            <EventForm onSubmit={handleAddEvent} />
          </div>

          {displayedEvents.length === 0 && (
            <p className="text-center text-gray-500">No events for this date</p>
          )}

          {displayedEvents.map(function renderEvent(event) {
            const startTime = format(new Date(event.time.start), "hh:mm a");
            const endTime = format(new Date(event.time.end), "hh:mm a");

            return (
              <EventCard
                key={event.id}
                title={`${event.eventType.emoji} ${event.eventType.label}`}
                time={`${startTime} - ${endTime}`}
              />
            );
          })}
        </div>
      </PageLayout>
    </div>
  );
}
