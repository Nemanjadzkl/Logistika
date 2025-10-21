import { create } from 'zustand';

interface Item {
  id: string;
  name: string;
  category: string;
  unit: 'kom' | 'kg' | 'l';
  quantity: number;
}

interface InventoryState {
  items: Item[];
  addItem: (item: Omit<Item, 'id'>) => void;
}

const mockItems: Item[] = [
  { id: 'ART-001', name: 'Laptop Dell XPS 15', category: 'Elektronika', unit: 'kom', quantity: 15 },
  { id: 'ART-002', name: 'Tastatura Logitech MX Keys', category: 'Elektronika', unit: 'kom', quantity: 45 },
  { id: 'ART-003', name: 'Šećer kristal 1kg', category: 'Hrana', unit: 'kg', quantity: 250 },
  { id: 'ART-004', name: 'Ulje suncokretovo 1l', category: 'Hrana', unit: 'l', quantity: 180 },
];

const useInventoryStore = create<InventoryState>((set) => ({
  items: mockItems,
  addItem: (item) =>
    set((state) => ({
      items: [
        ...state.items,
        { ...item, id: `ART-${(state.items.length + 1).toString().padStart(3, '0')}` },
      ],
    })),
}));

export default useInventoryStore;
