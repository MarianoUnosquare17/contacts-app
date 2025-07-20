import { api } from "~/trpc/react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Button } from "./ui/button";
import { de } from "zod/v4/locales";

export default function ContactTable() {
  const utils = api.useContext();

  const {
    data: contacts,
    isLoading,
    isError,
  } = api.contacts.getContacts.useQuery();

  //todo: Add network delay

  const deleteContact = api.contacts.deleteContact.useMutation({
    onSuccess: () => {
      utils.contacts.getContacts.invalidate();
    },
  });

  const handleDelete = (id: number) => {
    deleteContact.mutate({ id });
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center text-3xl font-bold">
        Loading...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-screen items-center justify-center text-3xl font-bold text-red-500">
        Error loading contacts
      </div>
    );
  }

  return (
    <div>
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
              <TableHead
                colSpan={5}
                className="text-bg mx-2 text-center font-bold"
              >
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
                <TableCell>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(contact.id)}
                    disabled={deleteContact.isPending}
                  >
                    {deleteContact.isPending ? 'Deleting' : 'Delete'}
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
