# Character catalog (Next.js)

Frontend for the character catalog: GraphQL via **GraphQL Code Generator** + **TanStack React Query**, URL state with **nuqs**.

## Full stack (backend + this app)

This UI only talks to the **NestJS GraphQL API**. Run the **backend before** the frontend.

1. **Backend** (port **4000**): install dependencies, create **`.env`**, run **`npx prisma migrate deploy`**, **`npm run db:seed`**, then **`npm run start:dev`**. GraphQL must be up at **`http://localhost:4000/graphql`**.
   - **Same parent folder as this repo:** open [`../backend`](../backend) and follow [**`../backend/README.md`**](../backend/README.md).
   - **Only this repo cloned:** use your separate **backend / character API** repository and its README so the same endpoint is available locally.

2. **Frontend (steps below):** create **`.env.local`**, run **`npm run codegen`** when the API schema changes, then **`npm run dev`**.

Relative links to `../backend` work when both folders share a parent on your machine. If this GitHub repo is **only** the frontend, open your backend repository separately.

## Run locally

From **this** directory (after the API is running):

1. **Install**

   ```bash
   npm install
   ```

2. **Environment**

   Create **`.env.local`** (not committed; gitignored) with:

   ```env
   NEXT_PUBLIC_GRAPHQL_URL=http://localhost:4000/graphql
   ```

   For a deployed API, set this to your public GraphQL URL instead.

3. **Generated types** (after any GraphQL schema change on the backend)

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
