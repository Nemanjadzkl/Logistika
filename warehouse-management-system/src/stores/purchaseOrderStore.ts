import { create } from 'zustand';
import { Supplier } from './supplierStore';
import { Item } from './inventoryStore';

export interface PurchaseOrderItem {
  itemId: string;
  itemName: string; // Denormalizovano radi lakšeg prikaza
  quantity: number;
  price: number;
}

export interface PurchaseOrder {
  id: string;
  supplierId: string;
  supplierName: string; // Denormalizovano
  status: 'Nova' | 'Potvrđena' | 'Primljena' | 'Otkazana';
  items: PurchaseOrderItem[];
  createdAt: string;
}

interface PurchaseOrderState {
  purchaseOrders: PurchaseOrder[];
  addPurchaseOrder: (order: Omit<PurchaseOrder, 'id' | 'createdAt'>) => void;
}

const mockOrders: PurchaseOrder[] = [
  {
    id: 'PO-001',
    supplierId: 'SUP-001',
    supplierName: 'Grosvenor d.o.o.',
    status: 'Primljena',
    createdAt: new Date().toISOString(),
    items: [
      { itemId: 'ART-001', itemName: 'Laptop Dell XPS 15', quantity: 10, price: 150000 },
      { itemId: 'ART-002', itemName: 'Tastatura Logitech MX Keys', quantity: 20, price: 12000 },
    ],
  },
];

const usePurchaseOrderStore = create<PurchaseOrderState>((set) => ({
  purchaseOrders: mockOrders,
  addPurchaseOrder: (order) =>
    set((state) => ({
      purchaseOrders: [
        ...state.purchaseOrders,
        {
          ...order,
          id: `PO-${(state.purchaseOrders.length + 1).toString().padStart(3, '0')}`,
          createdAt: new Date().toISOString(),
        },
      ],
    })),
}));

export default usePurchaseOrderStore;
