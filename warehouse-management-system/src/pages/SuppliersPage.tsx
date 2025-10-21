import React from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '../components/ui/table';
import useSupplierStore from '../stores/supplierStore';
// Import AddSupplierDialog komponente koju ćemo kreirati u sledećem koraku
import AddSupplierDialog from '../components/AddSupplierDialog';
import { Button } from '../components/ui/button';
import { Edit } from 'lucide-react';

const SuppliersPage = () => {
  const suppliers = useSupplierStore((state) => state.suppliers);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dobavljači</h1>
        <AddSupplierDialog />
      </div>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Šifra</TableHead>
              <TableHead>Naziv</TableHead>
              <TableHead>PIB</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Telefon</TableHead>
              <TableHead className="text-right">Akcije</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {suppliers.map((supplier) => (
              <TableRow key={supplier.id}>
                <TableCell className="font-medium">{supplier.id}</TableCell>
                <TableCell>{supplier.name}</TableCell>
                <TableCell>{supplier.pib}</TableCell>
                <TableCell>{supplier.email}</TableCell>
                <TableCell>{supplier.phone}</TableCell>
                <TableCell className="text-right">
                  <AddSupplierDialog
                    supplier={supplier}
                    trigger={
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SuppliersPage;
