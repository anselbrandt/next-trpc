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
