import React from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '../components/ui/table';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../components/ui/collapsible';
import usePurchaseOrderStore from '../stores/purchaseOrderStore';
import { Button } from '../components/ui/button';
import { ChevronDown } from 'lucide-react';
import AddPurchaseOrderDialog from '../components/AddPurchaseOrderDialog';

const PurchaseOrdersPage = () => {
  const purchaseOrders = usePurchaseOrderStore((state) => state.purchaseOrders);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Ulazne porudžbine</h1>
        <AddPurchaseOrderDialog />
      </div>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]"></TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Dobavljač</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Datum kreiranja</TableHead>
              <TableHead className="text-right">Ukupna vrednost</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {purchaseOrders.map((order) => (
              <Collapsible asChild key={order.id}>
                <>
                  <TableRow>
                    <TableCell>
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </CollapsibleTrigger>
                    </TableCell>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.supplierName}</TableCell>
                    <TableCell>{order.status}</TableCell>
                    <TableCell>{new Date(order.createdAt).toLocaleDateString('sr-RS')}</TableCell>
                    <TableCell className="text-right">
                      {order.items.reduce((acc, item) => acc + item.price * item.quantity, 0).toLocaleString('sr-RS')} RSD
                    </TableCell>
                  </TableRow>
                  <CollapsibleContent asChild>
                    <tr className="bg-gray-50">
                      <td colSpan={6} className="p-0">
                        <div className="p-4">
                          <h4 className="font-semibold mb-2">Stavke porudžbine:</h4>
                          <ul>
                            {order.items.map((item) => (
                              <li key={item.itemId} className="flex justify-between">
                                <span>{item.itemName}</span>
                                <span>{item.quantity} x {item.price.toLocaleString('sr-RS')} RSD</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </td>
                    </tr>
                  </CollapsibleContent>
                </>
              </Collapsible>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PurchaseOrdersPage;
