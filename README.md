# Next.js tRPC

## tsconfig.json

```
"incremental": false,
"noUncheckedIndexedAccess": true
```

## Tailwind

```
yarn add -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

`tailwind.config.js`

```
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
```

`globals.css`

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

`index.tsx`

```
<div className="text-3xl font-bold underline">
    Hello.
</div>
```

## Prisma

https://www.prisma.io/docs/support/help-articles/nextjs-prisma-client-dev-practices

```
yarn add -D prisma
npx prisma init
```

`package.json`

```
  "scripts": {
    "gen": "prisma generate",
    "push": "prisma db push",
    "postinstall": "prisma generate"
  },
```

VSCode `settings.json`

```
"[prisma]": {
  "editor.defaultFormatter": "Prisma.prisma"
},
```

Sample `prisma/schema.prisma`

```
generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["referentialIntegrity"]
}

datasource db {
  provider             = "mysql"
  url                  = env("DATABASE_URL")
  referentialIntegrity = "prisma"
}

model Note {
  id        String   @id @default(cuid())
  createdAt DateTime @default(now())
  updatedAt DateTime
  title     String   @db.VarChar(255)
  content   String?  @db.VarChar(5000)
  published Boolean  @default(true)
  author    User?    @relation(fields: [authorId], references: [id])
  authorId  String?
}

model User {
  id        String   @id @default(cuid())
  createdAt DateTime @default(now())
  updatedAt DateTime
  email     String   @unique
  name      String?
  notes     Note[]
}
```

https://pris.ly/d/prisma-schema

Sync schema to db:

```
npx prisma db pull
or
npx prisma db push
then
npx prisma generate
```

Prisma studio:

```
npx prisma studio
```

`/db/client.ts`

```
import { PrismaClient } from "@prisma/client";

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
```

## tRPC

https://trpc.io/docs/nextjs

`_app.tsx`

```
import { withTRPC } from "@trpc/next";
import { AppType } from "next/dist/shared/lib/utils";
import "../styles/globals.css";
import { AppRouter } from "./api/trpc/[trpc]";

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

function getBaseUrl() {
  if (typeof window !== "undefined") {
    return "";
  }
  if (process.browser) return ""; // Browser should use current path
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url

  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = `${getBaseUrl()}/api/trpc`;

    return {
      url,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: true,
})(MyApp);
```

`getBaseUrl()` provides the absolute URL which is required by tRPC.

## superjson

`/api/trpc/[trpc].ts`

```
export const appRouter = trpc
  .router()
  .transformer(superjson)
  ...
```

`_app.tsx`

```
export default withTRPC<AppRouter>({
  ...
    return {
    url,
    transformer: superjson,
    ...
```

## react hook form

## NextAuth

https://github.com/nextauthjs/next-auth-typescript-example

Auth callback URL:

```
http://localhost:3000/api/auth/callback/github
```
