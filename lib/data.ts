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

interface Event {
  id: string;
  title: string;
  time: string;
}

const sampleEvents: Event[] = [
  {
    id: '1',
    title: 'Virtual Movie Date',
    time: '19:30-22:30',
  },
  {
    id: '2',
    title: 'Video Call Dinner',
    time: '18:00-20:00',
  },
  {
    id: '3',
    title: 'Morning Coffee Chat',
    time: '10:00-11:00',
  },
  {
    id: '4',
    title: 'Gaming Session Together',
    time: '14:30-16:30',
  },
  {
    id: '5',
    title: 'Virtual Date Night',
    time: '20:00-22:00',
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

export { 
  contactsData as contacts, 
  sampleEvents, 
  monthlyCallRatios,
  getCallRatioForDateRange,
  type Contact, 
  type Event, 
  type MonthlyCallRatio 
};
