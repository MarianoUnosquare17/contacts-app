import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import type { Contact } from "@prisma/client";

//Mock data
const newId = 1;
const contacts: Contact[] = [
  {
    id: newId,
    firstName: "Mariano",
    lastName: "Estrada",
    email: "mariano.estrada@unosquare.com",
    phone: "12341243451",
    company: "Unosquare",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

//add zod validations
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

export const contactsRouter = createTRPCRouter({
  getContacts: publicProcedure.query(() => {
    return contacts;
  }),

  createContact: publicProcedure
    .input(newContactSchema)
    .mutation(({ input }) => {
      //Check for duplicate emails
      for (const contact of contacts) {
        if (contact.email === input.email) {
          throw new Error("This email is already in use");
        }
      }

      let newId = contacts.length > 0 ? Math.max(...contacts.map((contact) => contact.id)) + 1 : 1;

      const newContact = {
        id: newId++,
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email,
        //making sure optional fields can be empty
        phone: input.phone ?? null,
        company: input.company ?? null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      contacts.push(newContact);
      return newContact;
    }),
});
