import { create } from 'zustand';

export interface Item {
  id: string;
  name: string;
  category: string;
  unit: 'kom' | 'kg' | 'l';
  quantity: number;
  minStock: number;
  maxStock: number;
  location: string;
  expiryDate?: string; // Opciono, jer nemaju svi artikli rok trajanja
  batch?: string; // Opciono
}

interface InventoryState {
  items: Item[];
  addItem: (item: Omit<Item, 'id'>) => void;
  updateItem: (item: Item) => void;
}

const mockItems: Item[] = [
  { id: 'ART-001', name: 'Laptop Dell XPS 15', category: 'Elektronika', unit: 'kom', quantity: 15, minStock: 5, maxStock: 20, location: 'A1-01', batch: 'BATCH-2023-01' },
  { id: 'ART-002', name: 'Tastatura Logitech MX Keys', category: 'Elektronika', unit: 'kom', quantity: 45, minStock: 20, maxStock: 100, location: 'A1-02' },
  { id: 'ART-003', name: 'Mleko 1l', category: 'Hrana', unit: 'kom', quantity: 250, minStock: 100, maxStock: 500, location: 'B2-05', expiryDate: '2025-12-31', batch: 'BATCH-2023-02' },
  { id: 'ART-004', name: 'Ulje suncokretovo 1l', category: 'Hrana', unit: 'l', quantity: 180, minStock: 50, maxStock: 300, location: 'B2-06', expiryDate: '2026-06-30' },
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
  updateItem: (updatedItem) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      ),
    })),
}));

export default useInventoryStore;
