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
