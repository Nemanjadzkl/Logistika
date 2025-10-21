import React, { useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import useInventoryStore, { Item } from '../stores/inventoryStore';

const itemSchema = z.object({
  name: z.string().min(1, 'Naziv je obavezan'),
  category: z.string().min(1, 'Kategorija je obavezna'),
  unit: z.enum(['kom', 'kg', 'l']),
  quantity: z.preprocess((a) => parseInt(z.string().parse(a), 10), z.number().positive('Količina mora biti pozitivan broj')),
  minStock: z.preprocess((a) => parseInt(z.string().parse(a), 10), z.number().min(0, 'Minimalne zalihe ne mogu biti negativne')),
  maxStock: z.preprocess((a) => parseInt(z.string().parse(a), 10), z.number().positive('Maksimalne zalihe moraju biti pozitivne')),
  location: z.string().min(1, 'Lokacija je obavezna'),
  expiryDate: z.string().optional(),
  batch: z.string().optional(),
});

type ItemFormValues = z.infer<typeof itemSchema>;

interface AddItemDialogProps {
  item?: Item;
  trigger?: React.ReactNode;
}

const AddItemDialog: React.FC<AddItemDialogProps> = ({ item, trigger }) => {
  const { addItem, updateItem } = useInventoryStore();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ItemFormValues>({
    resolver: zodResolver(itemSchema),
    defaultValues: item,
  });

  useEffect(() => {
    reset(item);
  }, [item, reset]);

  const onSubmit = (data: ItemFormValues) => {
    if (item) {
      updateItem({ ...item, ...data });
    } else {
      addItem(data);
    }
    reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || <Button>Dodaj artikal</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{item ? 'Izmeni artikal' : 'Dodaj novi artikal'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            {/* Sva polja forme... */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Naziv</Label>
              <Input id="name" {...register('name')} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">Kategorija</Label>
              <Input id="category" {...register('category')} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="unit" className="text-right">Jedinica mere</Label>
              <select id="unit" {...register('unit')} className="col-span-3 border rounded-md p-2">
                <option value="kom">kom</option>
                <option value="kg">kg</option>
                <option value="l">l</option>
              </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantity" className="text-right">Količina</Label>
              <Input id="quantity" type="number" {...register('quantity')} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="minStock" className="text-right">Min. zalihe</Label>
              <Input id="minStock" type="number" {...register('minStock')} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="maxStock" className="text-right">Max. zalihe</Label>
              <Input id="maxStock" type="number" {...register('maxStock')} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">Lokacija</Label>
              <Input id="location" {...register('location')} className="col-span-3" />
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="expiryDate" className="text-right">Rok trajanja</Label>
              <Input id="expiryDate" type="date" {...register('expiryDate')} className="col-span-3" />
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="batch" className="text-right">Batch</Label>
              <Input id="batch" {...register('batch')} className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">Otkaži</Button>
            </DialogClose>
            <Button type="submit">Sačuvaj</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddItemDialog;
