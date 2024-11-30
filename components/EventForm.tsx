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

interface EventFormProps {
  onSubmit: (data: EventFormData) => void;
  initialDate?: Date;
}

export interface EventFormData {
  title: string;
  time: string;
  date: string;
}

function EventForm({ onSubmit, initialDate }: EventFormProps) {
  const [open, setOpen] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);

  const form = useForm<EventFormData>({
    defaultValues: {
      title: "",
      time: "",
      date: initialDate
        ? initialDate.toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],
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
        event_title: data.title,
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
                name="title"
                rules={{ required: true }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Title</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Movie Night" />
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
                    <FormLabel>Time</FormLabel>
                    <FormControl>
                      <Input {...field} type="time" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                rules={{ required: true }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input {...field} type="date" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button id="create-event-button" type="submit" className="w-full">
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
