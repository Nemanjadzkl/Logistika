import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '../components/ui/dialog';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import usePurchaseOrderStore from '../stores/purchaseOrderStore';
import useSupplierStore from '../stores/supplierStore';
import useInventoryStore from '../stores/inventoryStore';
import { Trash } from 'lucide-react';

const purchaseOrderItemSchema = z.object({
  itemId: z.string().min(1, 'Artikal je obavezan'),
  quantity: z.preprocess((a) => parseInt(z.string().parse(a), 10), z.number().positive('Količina mora biti pozitivan broj')),
  price: z.preprocess((a) => parseInt(z.string().parse(a), 10), z.number().positive('Cena mora biti pozitivan broj')),
});

const purchaseOrderSchema = z.object({
  supplierId: z.string().min(1, 'Dobavljač je obavezan'),
  items: z.array(purchaseOrderItemSchema).min(1, 'Mora postojati bar jedna stavka'),
});

type PurchaseOrderFormValues = z.infer<typeof purchaseOrderSchema>;

const AddPurchaseOrderDialog = () => {
  const { addPurchaseOrder } = usePurchaseOrderStore();
  const suppliers = useSupplierStore((state) => state.suppliers);
  const items = useInventoryStore((state) => state.items);
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<PurchaseOrderFormValues>({
    resolver: zodResolver(purchaseOrderSchema),
    defaultValues: {
      items: [{ itemId: '', quantity: 1, price: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const onSubmit = (data: PurchaseOrderFormValues) => {
    const selectedSupplier = suppliers.find(s => s.id === data.supplierId);
    if (!selectedSupplier) return;

    const orderItems = data.items.map(item => {
        const selectedItem = items.find(i => i.id === item.itemId);
        return {
            ...item,
            itemName: selectedItem?.name || 'Nepoznat artikal'
        }
    })

    addPurchaseOrder({
      supplierId: data.supplierId,
      supplierName: selectedSupplier.name,
      status: 'Nova',
      items: orderItems,
    });
    reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Kreiraj porudžbinu</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Nova ulazna porudžbina</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="supplierId">Dobavljač</Label>
              <select {...register('supplierId')} className="w-full mt-1 border rounded-md p-2">
                <option value="">Izaberite dobavljača</option>
                {suppliers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
              {errors.supplierId && <p className="text-red-500 text-xs">{errors.supplierId.message}</p>}
            </div>

            <h3 className="font-semibold mt-4">Stavke</h3>
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-2">
                <select {...register(`items.${index}.itemId`)} className="flex-1 border rounded-md p-2">
                  <option value="">Izaberite artikal</option>
                  {items.map(i => <option key={i.id} value={i.id}>{i.name}</option>)}
                </select>
                <Input type="number" {...register(`items.${index}.quantity`)} placeholder="Količina" className="w-24" />
                <Input type="number" {...register(`items.${index}.price`)} placeholder="Cena" className="w-24" />
                <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)}><Trash className="h-4 w-4" /></Button>
              </div>
            ))}
             {errors.items && <p className="text-red-500 text-xs">{errors.items.message}</p>}

            <Button type="button" variant="outline" onClick={() => append({ itemId: '', quantity: 1, price: 0 })}>Dodaj stavku</Button>
          </div>
          <DialogFooter>
            <Button type="submit">Sačuvaj porudžbinu</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPurchaseOrderDialog;
