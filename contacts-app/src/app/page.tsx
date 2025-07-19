"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "~/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import z from "zod";


type CreateContactInput = z.infer<typeof newContactSchema>;

const newContactSchema = z.object({
  firstName: z.string().min(1, "Name is a required field"),
  lastName: z.string().min(1, "Last Name is a required field"),
  email: z
    .string()
    .email("Please add a valid email address")
    .min(1, "Email is a required field"),
  phone: z.string().optional(),
  company: z.string().optional(),
});

export default function Home() {

  const [open, setOpen] = useState(false)

  //fetch data
  const {
    data: contacts,
    isLoading,
    isError,
  } = api.contacts.getContacts.useQuery();

  const utils = api.useContext();

  const mutation = api.contacts.createContact.useMutation({
    onSuccess: () => {
      utils.contacts.getContacts.invalidate();
      setOpen(false);
    },
  });

  //form logic
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateContactInput>({
    resolver: zodResolver(newContactSchema),
  });

  const onSubmit =(data: CreateContactInput)=>{
    mutation.mutate(data)
  }

  if (isLoading) {
    return <div className="container mx-auto">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="container mx-auto text-red-500">
        Error loading contacts
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <h1 className="my-10 text-xl font-bold">Contact List App</h1>
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead>Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Company</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contacts?.length === 0 && (
            <TableRow>
              <TableHead colSpan={5} className="text-center">
                No contacts found
              </TableHead>
            </TableRow>
          )}
          {contacts?.map((contact) => {
            return (
              <TableRow key={contact.id}>
                <TableCell>{contact.firstName}</TableCell>
                <TableCell>{contact.lastName}</TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell>{contact.phone}</TableCell>
                <TableCell>{contact.company}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="mt-4">
            Add a contact
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>New contact</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="p-4">
              <Label className="mb-3">Name</Label>
              <Input id="firstName" {...register("firstName")} />
            </div>
            <div className="p-4">
              <Label className="mb-3">Last Name</Label>
              <Input id="lastName" {...register("lastName")} />
            </div>
            <div className="p-4">
              <Label className="mb-3">Email</Label>
              <Input id="email" {...register("email")} />
            </div>
            <div className="p-4">
              <Label className="mb-3">Phone</Label>
              <Input id="phone" {...register("phone")} />
            </div>
            <div className="p-4">
              <Label className="mb-3">Company</Label>
              <Input id="company" {...register("company")} />
            </div>
            <div className="flex justify-end p-4 space-x-2">
              <DialogClose asChild>
                <Button variant="outline">Close</Button>
              </DialogClose>
              <Button variant="outline">Submit</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
