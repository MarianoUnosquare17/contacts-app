# Contacts app

##  Introduction
This is a simple app to showcase the usage of the t3 stack (Nextjs, Prisma, tPRC, Tailwind, Typescript, Zod).
The main features of the application are to showcase a list of contacts stored locally, add new contacts and delete a contact. 
Some extra features like editing an existing contact were pending.

## Prerequisites
Node.js 18.x or higher
Git and GitHub account

## Installation
Clone the repository:

```git clone https://github.com/MarianoUnosquare17/contacts-app.git```
```cd contacts-app```

Install dependencies:
```npm install```

Apply migrations:
```npx prisma migrate dev --name init```

Run the application:
```npm run dev```

Open http://localhost:3000 in your browser.

## Usage

Create Contacts: Click the button to open a modal, fill in the form, and submit to add a contact.
Delete Contacts: Click the "Delete" button next to a contact to remove it.

## Deployment

Push the code to GitHub:

git add .
git commit -m "Commit"
git push origin main

## Dependencies

@tanstack/react-query: Data fetching.
prisma: Database ORM.
zod: Validation.
shadcn/ui: UI components.

## Final notes and thoughts
Despite this being my first time using this tech stack, I found this as a great oportunity to gain some experience from it. I would have loved to implement some extra features like the ability for the user to edit a contact as well as polishing my code a bit more.
Tried to deploy it to vercel but wasnt really able to.
