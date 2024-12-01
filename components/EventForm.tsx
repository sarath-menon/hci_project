import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import posthog from "posthog-js";
import {
  usePostHog,
  useFeatureFlagEnabled,
  useFeatureFlagVariantKey,
} from "posthog-js/react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { eventTypes, timeSlots } from "@/lib/data";

interface EventFormProps {
  onSubmit: (data: EventFormData) => void;
  initialDate?: Date;
}

export interface EventFormData {
  eventTypeId: string;
  time: {
    start: string;
    end: string;
  };
}

function EventForm({ onSubmit, initialDate }: EventFormProps) {
  const [open, setOpen] = useState(false);
  const [startTime, setStartTime] = useState<null | number>(null);
  // const isVariantB = useFeatureFlagVariantKey("new-event-dialog");

  const isVariantB = false;

  const form = useForm<EventFormData>({
    defaultValues: {
      eventTypeId: eventTypes[0].id,
      time: {
        start: "",
        end: "",
      },
    },
  });

  function handleDrawerOpen(isOpen: boolean) {
    setOpen(isOpen);
    if (isOpen) {
      setStartTime(Date.now());
      posthog.capture("event_form_opened");
    }
  }

  function handleSubmit(data: EventFormData) {
    if (startTime) {
      const duration = Date.now() - startTime;
      posthog.capture("event_created", {
        duration_ms: duration,
        event_title: data.eventTypeId,
      });
    }
    onSubmit(data);
    setOpen(false);
    form.reset();
    setStartTime(null);
  }

  return (
    <Drawer open={open} onOpenChange={handleDrawerOpen}>
      <DrawerTrigger asChild>
        <Button variant="secondary" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Event
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Add New Event</DrawerTitle>
          </DrawerHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4 p-4"
            >
              <FormField
                control={form.control}
                name="eventTypeId"
                rules={{ required: true }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Type</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-[240px]">
                          <SelectValue placeholder="Select event type" />
                        </SelectTrigger>
                        <SelectContent>
                          {eventTypes.map(function renderEventType(type) {
                            return (
                              <SelectItem key={type.id} value={type.id}>
                                <span className="flex items-center gap-2">
                                  <span>{type.emoji}</span>
                                  <span>{type.label}</span>
                                </span>
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="time"
                rules={{ required: true }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time (1 hour slots)</FormLabel>
                    <FormControl>
                      {isVariantB ? (
                        <Select
                          value={`${field.value.start}-${field.value.end}`}
                          onValueChange={(value) => {
                            const selectedSlot = timeSlots.find(
                              (slot) => `${slot.start}-${slot.end}` === value
                            );
                            if (selectedSlot) {
                              field.onChange({
                                start: selectedSlot.start,
                                end: selectedSlot.end,
                              });
                            }
                          }}
                        >
                          <SelectTrigger className="w-[240px]">
                            <SelectValue placeholder="Select time slot" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map(function renderTimeSlot(slot) {
                              return (
                                <SelectItem
                                  key={slot.id}
                                  value={`${slot.start}-${slot.end}`}
                                >
                                  {slot.label}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      ) : (
                        <Input {...field} type="time" />
                      )}
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                id="create-event-button"
                type="submit"
                className={`w-full ${
                  isVariantB
                    ? "bg-primary hover:bg-primary/90 text-lg py-6"
                    : ""
                }`}
              >
                Create Event
              </Button>
            </form>
          </Form>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default EventForm;
