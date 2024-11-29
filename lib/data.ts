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

export { contactsData as contacts, sampleEvents, type Contact, type Event };
