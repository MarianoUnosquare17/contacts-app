"use client";
import { Button } from "~/components/ui/button";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { api } from "~/trpc/react";

export default function Home() {

  //fetch data
  const {
    data: contacts,
    isLoading,
    isError,
  } = api.contacts.getContacts.useQuery();

  console.log(contacts);

  if (isLoading) {
    return <div className="container mx-auto">Loading...</div>;
  }

  if (isError) {
    return <div className="container mx-auto">Error loading contacts</div>;
  }

  return (
    <div className="container mx-auto">
      <h1 className="my-10 text-xl font-bold">Contact List App</h1>
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-30">
            <TableHead>Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Company</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            contacts?.length === 0 && (
              <TableRow>
                <TableHead colSpan={5} className="text-center">
                  No contacts found
                </TableHead>
              </TableRow>
            )
          }
          {contacts?.map((contact) => {
            return (
              <TableRow key={contact.id}>
                <TableHead>{contact.firstName}</TableHead>
                <TableHead>{contact.lastName}</TableHead>
                <TableHead>{contact.email}</TableHead>
                <TableHead>{contact.phone}</TableHead>
                <TableHead>{contact.company}</TableHead>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Button>Add a contact</Button>
    </div>
  );
}
