This is a TypeScript project bootstrapped with `create-typescript-app`.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:4000/hello](http://localhost:4000/hello) with your browser to make sure the server is running.

You can start editing the application, and the server will refresh automatically.

## Using Prisma

[Connect to your database](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/connect-your-database-typescript-postgres) and start editing your data model in `prisma/schema.prisma`.

When you have edited your `schema.prisma` file to your liking, run the initial migration:

```bash
npx prisma migrate dev --name init
```

Then you can get started [querying your database](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/querying-the-database-typescript-postgres).

Read [Prisma's documentation](https://www.prisma.io/docs/concepts/overview/what-is-prisma) for more information.