import { api } from "~/trpc/react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

export default function ContactTable() {
  const {
    data: contacts,
    isLoading,
    isError,
  } = api.contacts.getContacts.useQuery();

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
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
