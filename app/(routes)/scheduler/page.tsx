"use client";

import { Calendar } from "@/components/ui/calendar";
import { useState, useEffect } from "react";
import EventCard from "@/components/EventCard";
import { Header } from "@/components/Header";
import PageLayout from "@/components/page-layout";
import EventForm, { EventFormData } from "@/components/EventForm";
import { sampleEvents, type Event, eventTypes, persons } from "@/lib/data";
import { format } from "date-fns";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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
  const [selectedPerson, setSelectedPerson] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(
    function updateDisplayedEvents() {
      if (!date) return;
      let randomEvents = getRandomEvents(sampleEvents, date);

      // Filter events by selected person if one is selected
      if (selectedPerson) {
        randomEvents = randomEvents.filter(function filterByPerson(event) {
          return event.person.id === selectedPerson;
        });
      }

      setDisplayedEvents(randomEvents);
    },
    [date, selectedPerson]
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

    const selectedPerson = persons.find(function findPerson(person) {
      return person.id === data.personId;
    });

    if (!selectedEventType || !selectedPerson) return;

    const newEvent = {
      id: String(sampleEvents.length + 1),
      eventType: selectedEventType,
      person: selectedPerson,
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
          <div className="flex justify-between items-center mb-6 gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Filter events:</span>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[150px] justify-between"
                  >
                    {selectedPerson ? (
                      <div className="flex items-center gap-2">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{
                            backgroundColor: persons.find(
                              (p) => p.id === selectedPerson
                            )?.bgColor,
                          }}
                        />
                        {persons.find((p) => p.id === selectedPerson)?.name}
                      </div>
                    ) : (
                      "Select person..."
                    )}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search person..." />
                    <CommandList>
                      <CommandEmpty>No person found.</CommandEmpty>
                      <CommandGroup>
                        {persons.map(function renderPersonOption(person) {
                          return (
                            <CommandItem
                              key={person.id}
                              value={person.id}
                              onSelect={function handleSelect(currentValue) {
                                setSelectedPerson(
                                  currentValue === selectedPerson
                                    ? ""
                                    : currentValue
                                );
                                setOpen(false);
                              }}
                            >
                              <div className="flex items-center gap-2">
                                <div
                                  className="w-4 h-4 rounded-full"
                                  style={{ backgroundColor: person.bgColor }}
                                ></div>
                              </div>
                              <span>
                                {person.name}
                                <span className="text-muted-foreground ml-2">
                                  ({person.relation})
                                </span>
                              </span>
                              <Check
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  selectedPerson === person.id
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          );
                        })}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

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
                person={event.person.name}
                bgColor={event.person.bgColor}
              />
            );
          })}
        </div>
      </PageLayout>
    </div>
  );
}
