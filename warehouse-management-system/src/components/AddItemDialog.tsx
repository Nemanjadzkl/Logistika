import React from 'react';
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
import useInventoryStore from '../stores/inventoryStore';

const itemSchema = z.object({
  name: z.string().min(1, 'Naziv je obavezan'),
  category: z.string().min(1, 'Kategorija je obavezna'),
  unit: z.enum(['kom', 'kg', 'l']),
  quantity: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z.number().positive('Količina mora biti pozitivan broj')
  ),
});

type ItemFormValues = z.infer<typeof itemSchema>;

const AddItemDialog = () => {
  const addItem = useInventoryStore((state) => state.addItem);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ItemFormValues>({
    resolver: zodResolver(itemSchema),
  });

  const onSubmit = (data: ItemFormValues) => {
    addItem(data);
    reset();
    // Ovde bi trebalo zatvoriti dijalog, ali shadcn/ui to ne podržava direktno sa `DialogClose` unutar forme.
    // Za sada, korisnik mora ručno da zatvori dijalog.
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Dodaj artikal</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Dodaj novi artikal</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Naziv
              </Label>
              <Input id="name" {...register('name')} className="col-span-3" />
              {errors.name && <p className="col-span-4 text-red-500 text-xs">{errors.name.message}</p>}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Kategorija
              </Label>
              <Input id="category" {...register('category')} className="col-span-3" />
               {errors.category && <p className="col-span-4 text-red-500 text-xs">{errors.category.message}</p>}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="unit" className="text-right">
                Jedinica mere
              </Label>
              <select id="unit" {...register('unit')} className="col-span-3 border rounded-md p-2">
                <option value="kom">kom</option>
                <option value="kg">kg</option>
                <option value="l">l</option>
              </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantity" className="text-right">
                Količina
              </Label>
              <Input id="quantity" type="number" {...register('quantity')} className="col-span-3" />
              {errors.quantity && <p className="col-span-4 text-red-500 text-xs">{errors.quantity.message}</p>}
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Otkaži
              </Button>
            </DialogClose>
            <Button type="submit">Sačuvaj</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddItemDialog;
