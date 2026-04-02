# Character catalog (Next.js)

Frontend for the character catalog: GraphQL via **GraphQL Code Generator** + **TanStack React Query**, URL state with **nuqs**.

## Run locally

Start the [backend](../backend/README.md) first (GraphQL on port **4000**).

From this directory:

1. **Install**

   ```bash
   npm install
   ```

2. **Environment**

   Copy `.env.example` to `.env.local`:

   ```env
   NEXT_PUBLIC_GRAPHQL_URL=http://localhost:4000/graphql
   ```

3. **Generated types** (after any GraphQL schema change)

   ```bash
   npm run codegen
   ```

4. **App**

   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000).

**Production build:** `npm run build` then `npm start`.

## Scripts

| Command | Purpose |
|--------|---------|
| `npm run dev` | Next.js dev server |
| `npm run codegen` | Regenerate `src/generated/graphql.ts` from `graphql/schema.graphql` and `src/graphql/*.graphql` |
| `npm run build` / `npm start` | Production build and serve |

## Stack

Next.js (App Router), GraphQL Code Generator, React Query, nuqs.
