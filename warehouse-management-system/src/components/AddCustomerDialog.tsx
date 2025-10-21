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
import useCustomerStore, { Customer } from '../stores/customerStore';

const customerSchema = z.object({
  name: z.string().min(1, 'Naziv je obavezan'),
  pib: z.string().min(9, 'PIB mora imati 9 cifara').max(9, 'PIB mora imati 9 cifara'),
  address: z.string().min(1, 'Adresa je obavezna'),
  email: z.string().email('Neispravna email adresa'),
  phone: z.string().min(1, 'Telefon je obavezan'),
  creditLimit: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z.number().positive('Kreditni limit mora biti pozitivan broj')
  ),
});

type CustomerFormValues = z.infer<typeof customerSchema>;

interface AddCustomerDialogProps {
  customer?: Customer;
  trigger?: React.ReactNode;
}

const AddCustomerDialog: React.FC<AddCustomerDialogProps> = ({ customer, trigger }) => {
  const { addCustomer, updateCustomer } = useCustomerStore();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CustomerFormValues>({
    resolver: zodResolver(customerSchema),
    defaultValues: customer,
  });

  useEffect(() => {
    reset(customer);
  }, [customer, reset]);

  const onSubmit = (data: CustomerFormValues) => {
    if (customer) {
      updateCustomer({ ...customer, ...data });
    } else {
      addCustomer(data);
    }
    reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || <Button>Dodaj kupca</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{customer ? 'Izmeni kupca' : 'Dodaj novog kupca'}</DialogTitle>
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
              <Label htmlFor="creditLimit" className="text-right">Kreditni limit</Label>
              <Input id="creditLimit" type="number" {...register('creditLimit')} className="col-span-3" />
              {errors.creditLimit && <p className="col-span-4 text-red-500 text-xs">{errors.creditLimit.message}</p>}
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

export default AddCustomerDialog;
