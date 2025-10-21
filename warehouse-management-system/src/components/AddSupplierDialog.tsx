import React, { useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '../components/ui/dialog';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import useSupplierStore, { Supplier } from '../stores/supplierStore';

const supplierSchema = z.object({
  name: z.string().min(1, 'Naziv je obavezan'),
  pib: z.string().min(9, 'PIB mora imati 9 cifara').max(9, 'PIB mora imati 9 cifara'),
  address: z.string().min(1, 'Adresa je obavezna'),
  email: z.string().email('Neispravna email adresa'),
  phone: z.string().min(1, 'Telefon je obavezan'),
  paymentTerms: z.string().min(1, 'Uslovi plaćanja su obavezni'),
});

type SupplierFormValues = z.infer<typeof supplierSchema>;

interface AddSupplierDialogProps {
  supplier?: Supplier; // Opcioni prop za mod izmene
  trigger?: React.ReactNode;
}

const AddSupplierDialog: React.FC<AddSupplierDialogProps> = ({ supplier, trigger }) => {
  const { addSupplier, updateSupplier } = useSupplierStore();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SupplierFormValues>({
    resolver: zodResolver(supplierSchema),
    defaultValues: supplier,
  });

  useEffect(() => {
    reset(supplier);
  }, [supplier, reset]);

  const onSubmit = (data: SupplierFormValues) => {
    if (supplier) {
      updateSupplier({ ...supplier, ...data });
    } else {
      addSupplier(data);
    }
    reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || <Button>Dodaj dobavljača</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{supplier ? 'Izmeni dobavljača' : 'Dodaj novog dobavljača'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            {/* Sva polja forme... */}
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Naziv</Label>
              <Input id="name" {...register('name')} className="col-span-3" />
              {errors.name && <p className="col-span-4 text-red-500 text-xs">{errors.name.message}</p>}
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="pib" className="text-right">PIB</Label>
              <Input id="pib" {...register('pib')} className="col-span-3" />
              {errors.pib && <p className="col-span-4 text-red-500 text-xs">{errors.pib.message}</p>}
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address" className="text-right">Adresa</Label>
              <Input id="address" {...register('address')} className="col-span-3" />
              {errors.address && <p className="col-span-4 text-red-500 text-xs">{errors.address.message}</p>}
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">Email</Label>
              <Input id="email" {...register('email')} className="col-span-3" />
              {errors.email && <p className="col-span-4 text-red-500 text-xs">{errors.email.message}</p>}
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">Telefon</Label>
              <Input id="phone" {...register('phone')} className="col-span-3" />
              {errors.phone && <p className="col-span-4 text-red-500 text-xs">{errors.phone.message}</p>}
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="paymentTerms" className="text-right">Uslovi plaćanja</Label>
              <Input id="paymentTerms" {...register('paymentTerms')} className="col-span-3" />
              {errors.paymentTerms && <p className="col-span-4 text-red-500 text-xs">{errors.paymentTerms.message}</p>}
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

export default AddSupplierDialog;
