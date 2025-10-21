import { create } from 'zustand';

export interface Supplier {
  id: string;
  name: string;
  pib: string;
  address: string;
  email: string;
  phone: string;
  paymentTerms: string;
}

interface SupplierState {
  suppliers: Supplier[];
  addSupplier: (supplier: Omit<Supplier, 'id'>) => void;
  updateSupplier: (supplier: Supplier) => void;
}

const mockSuppliers: Supplier[] = [
  { id: 'SUP-001', name: 'Grosvenor d.o.o.', pib: '123456789', address: 'Bulevar Oslobođenja 10, Beograd', email: 'kontakt@grosvenor.rs', phone: '011-123-456', paymentTerms: '60 dana' },
  { id: 'SUP-002', name: 'Nelt Co d.o.o.', pib: '987654321', address: 'Autoput za Zagreb 11, Beograd', email: 'office@nelt.com', phone: '011-987-654', paymentTerms: 'Plaćanje po prijemu' },
];

const useSupplierStore = create<SupplierState>((set) => ({
  suppliers: mockSuppliers,
  addSupplier: (supplier) =>
    set((state) => ({
      suppliers: [
        ...state.suppliers,
        { ...supplier, id: `SUP-${(state.suppliers.length + 1).toString().padStart(3, '0')}` },
      ],
    })),
  updateSupplier: (updatedSupplier) =>
    set((state) => ({
      suppliers: state.suppliers.map((supplier) =>
        supplier.id === updatedSupplier.id ? updatedSupplier : supplier
      ),
    })),
}));

export default useSupplierStore;
