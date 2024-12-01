import { 
  Film, 
  Popcorn, 
  Coffee, 
  Gamepad, 
  Heart 
} from "lucide-react";

interface Contact {
  id: string;
  name: string;
  initial: string;
  category: 'family' | 'friends';
}

const contactsData: Contact[] = [
  { id: '1', name: 'Mom Smith', initial: 'M', category: 'family' },
  { id: '2', name: 'Dad Smith', initial: 'D', category: 'family' },
  { id: '3', name: 'Sarah Smith', initial: 'S', category: 'family' },
  { id: '4', name: 'Zola Thompson', initial: 'Z', category: 'friends' },
  { id: '5', name: 'Kagiso Ndlovu', initial: 'K', category: 'friends' },
  { id: '6', name: 'Lindiwe Dube', initial: 'L', category: 'friends' },
  { id: '7', name: 'Tom Wilson', initial: 'T', category: 'friends' },
  { id: '8', name: 'James Cooper', initial: 'J', category: 'friends' },
  { id: '9', name: 'Emma Johnson', initial: 'E', category: 'friends' }
];

export type EventType = {
  id: string;
  label: string;
  emoji: string;
  icon: typeof Film | typeof Popcorn | typeof Coffee | typeof Gamepad | typeof Heart;
};

export const eventTypes: EventType[] = [
  {
    id: 'movie',
    label: 'Movie Night',
    emoji: '🎬',
    icon: Film
  },
  {
    id: 'dinner',
    label: 'Virtual Dinner',
    emoji: '🍽️',
    icon: Popcorn
  },
  {
    id: 'coffee',
    label: 'Coffee Chat',
    emoji: '☕',
    icon: Coffee
  },
  {
    id: 'gaming',
    label: 'Gaming Session',
    emoji: '🎮',
    icon: Gamepad
  },
  {
    id: 'date',
    label: 'Virtual Date',
    emoji: '❤️',
    icon: Heart
  }
];

interface Event {
  id: string;
  eventType: EventType;
  time: {
    start: string;
    end: string;
  };
}

const sampleEvents: Event[] = [
  {
    id: '1',
    eventType: eventTypes[0],
    time: {
      start: '2024-03-20T19:30:00Z',
      end: '2024-03-20T22:30:00Z'
    }
  },
  {
    id: '2',
    eventType: eventTypes[1],
    time: {
      start: '2024-03-20T18:00:00Z',
      end: '2024-03-20T20:00:00Z'
    }
  },
  {
    id: '3',
    eventType: eventTypes[2],
    time: {
      start: '2024-03-20T10:00:00Z',
      end: '2024-03-20T11:00:00Z'
    }
  },
  {
    id: '4',
    eventType: eventTypes[3],
    time: {
      start: '2024-03-20T14:30:00Z',
      end: '2024-03-20T16:30:00Z'
    }
  },
  {
    id: '5',
    eventType: eventTypes[4],
    time: {
      start: '2024-03-20T20:00:00Z',
      end: '2024-03-20T22:00:00Z'
    }
  },
  {
    id: '6',
    eventType: eventTypes[0],
    time: {
      start: '2024-03-21T15:00:00Z',
      end: '2024-03-21T19:00:00Z'
    }
  },
  {
    id: '7',
    eventType: eventTypes[2],
    time: {
      start: '2024-03-21T09:00:00Z',
      end: '2024-03-21T10:30:00Z'
    }
  },
  {
    id: '8',
    eventType: eventTypes[3],
    time: {
      start: '2024-03-21T20:00:00Z',
      end: '2024-03-21T23:00:00Z'
    }
  }
];

interface MonthlyCallRatio {
  month: string;
  gf: number;
  airam: number;
}

const monthlyCallRatios: MonthlyCallRatio[] = [
  { month: "January", gf: 48, airam: 32 },
  { month: "February", gf: 55, airam: 45 },
  { month: "March", gf: 42, airam: 38 },
  { month: "April", gf: 51, airam: 29 },
  { month: "May", gf: 37, airam: 43 },
  { month: "June", gf: 59, airam: 31 },
  { month: "July", gf: 44, airam: 36 },
  { month: "August", gf: 53, airam: 47 },
  { month: "September", gf: 41, airam: 39 },
  { month: "October", gf: 46, airam: 34 },
];

function getCallRatioForDateRange(startDate: Date, endDate: Date): { gf: number; airam: number } {
  const start = startDate.getMonth();
  const end = endDate.getMonth();
  
  const monthRange = end >= start 
    ? monthlyCallRatios.slice(start, end + 1)
    : monthlyCallRatios;
  
  if (monthRange.length === 0) {
    return { gf: 0, airam: 0 };
  }

  const totalGf = monthRange.reduce((sum, month) => sum + month.gf, 0);
  const totalAiram = monthRange.reduce((sum, month) => sum + month.airam, 0);
  
  return { gf: totalGf, airam: totalAiram };
}

export interface TimeSlot {
  id: string;
  label: string;
  start: string;
  end: string;
}

export const timeSlots: TimeSlot[] = [
  { 
    id: '1', 
    label: '9:00 AM - 10:00 AM', 
    start: '09:00',
    end: '10:00'
  },
  { 
    id: '2', 
    label: '10:00 AM - 11:00 AM', 
    start: '10:00',
    end: '11:00'
  },
  { 
    id: '3', 
    label: '11:00 AM - 12:00 PM', 
    start: '11:00',
    end: '12:00'
  },
  { 
    id: '4', 
    label: '12:00 PM - 1:00 PM', 
    start: '12:00',
    end: '13:00'
  },
  { 
    id: '5', 
    label: '1:00 PM - 2:00 PM', 
    start: '13:00',
    end: '14:00'
  },
  { 
    id: '6', 
    label: '2:00 PM - 3:00 PM', 
    start: '14:00',
    end: '15:00'
  },
  { 
    id: '7', 
    label: '3:00 PM - 4:00 PM', 
    start: '15:00',
    end: '16:00'
  },
  { 
    id: '8', 
    label: '4:00 PM - 5:00 PM', 
    start: '16:00',
    end: '17:00'
  },
  { 
    id: '9', 
    label: '5:00 PM - 6:00 PM', 
    start: '17:00',
    end: '18:00'
  },
  { 
    id: '10', 
    label: '6:00 PM - 7:00 PM', 
    start: '18:00',
    end: '19:00'
  },
  { 
    id: '11', 
    label: '7:00 PM - 8:00 PM', 
    start: '19:00',
    end: '20:00'
  },
  { 
    id: '12', 
    label: '8:00 PM - 9:00 PM', 
    start: '20:00',
    end: '21:00'
  }
];

export { 
  contactsData as contacts, 
  sampleEvents, 
  monthlyCallRatios,
  getCallRatioForDateRange,
  timeSlots,
  type Contact, 
  type Event, 
  type MonthlyCallRatio 
};
