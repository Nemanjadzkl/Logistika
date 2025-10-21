import { create } from 'zustand';

export interface Customer {
  id: string;
  name: string;
  pib: string;
  address: string;
  email: string;
  phone: string;
  creditLimit: number;
}

interface CustomerState {
  customers: Customer[];
  addCustomer: (customer: Omit<Customer, 'id'>) => void;
  updateCustomer: (customer: Customer) => void;
}

const mockCustomers: Customer[] = [
  { id: 'CUS-001', name: 'Maxi d.o.o.', pib: '112233445', address: 'Bulevar Umetnosti 4, Beograd', email: 'info@maxi.rs', phone: '0800-123-123', creditLimit: 500000 },
  { id: 'CUS-002', name: 'Idea d.o.o.', pib: '554433221', address: 'Autoput za Novi Sad 100, Beograd', email: 'kontakt@idea.rs', phone: '0800-456-456', creditLimit: 750000 },
];

const useCustomerStore = create<CustomerState>((set) => ({
  customers: mockCustomers,
  addCustomer: (customer) =>
    set((state) => ({
      customers: [
        ...state.customers,
        { ...customer, id: `CUS-${(state.customers.length + 1).toString().padStart(3, '0')}` },
      ],
    })),
  updateCustomer: (updatedCustomer) =>
    set((state) => ({
      customers: state.customers.map((customer) =>
        customer.id === updatedCustomer.id ? updatedCustomer : customer
      ),
    })),
}));

export default useCustomerStore;
