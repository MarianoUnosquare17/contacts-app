import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "~/trpc/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
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

export default function ContactDialog() {
  const [open, setOpen] = useState(false);
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

  const onSubmit = (data: CreateContactInput) => {
    mutation.mutate(data);
  };

  return (
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
          <div className="flex justify-end space-x-2 p-4">
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
            <Button variant="outline">Submit</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
