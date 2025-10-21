import React from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '../components/ui/table';
import useInventoryStore from '../stores/inventoryStore';
import AddItemDialog from '../components/AddItemDialog';

import { Button } from '../components/ui/button';
import { Edit } from 'lucide-react';

const InventoryPage = () => {
  const items = useInventoryStore((state) => state.items);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Inventar</h1>
        <AddItemDialog />
      </div>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Šifra</TableHead>
              <TableHead>Naziv</TableHead>
              <TableHead>Lokacija</TableHead>
              <TableHead>Rok trajanja</TableHead>
              <TableHead className="text-right">Količina</TableHead>
              <TableHead className="text-right">Min. zalihe</TableHead>
              <TableHead className="text-right">Akcije</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.location}</TableCell>
                <TableCell>{item.expiryDate ? new Date(item.expiryDate).toLocaleDateString('sr-RS') : '-'}</TableCell>
                <TableCell className={`text-right ${item.quantity < item.minStock ? 'text-red-500 font-bold' : ''}`}>
                  {item.quantity.toLocaleString('sr-RS')}
                </TableCell>
                <TableCell className="text-right">{item.minStock.toLocaleString('sr-RS')}</TableCell>
                <TableCell className="text-right">
                  <AddItemDialog
                    item={item}
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

export default InventoryPage;
