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

export { contactsData as contacts, type Contact };
