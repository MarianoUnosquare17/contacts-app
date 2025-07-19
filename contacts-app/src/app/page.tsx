"use client";
import ContactDialog from "~/components/ContactDialog";
import ContactTable from "~/components/ContactTable";

export default function Home() {
  return (
    <div className="container mx-auto">
      <h1 className="my-10 text-xl font-bold">Contact List App</h1>
      <ContactTable />
      <ContactDialog />
    </div>
  );
}
