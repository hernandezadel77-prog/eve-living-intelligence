# EVE Living Intelligence — Full Project Export

**App:** EVE — Living Intelligence for Humanity  
**Export date:** 2026-06-05  
**Target repo:** hernandezadel77-prog/eve-living-intelligence  
**Stack:** React 19 + Vite 6 + Tailwind CSS v4 + Framer Motion + shadcn/ui  

---

## File Index

| Path | Purpose |
|------|---------|
| `replit.md` | Project overview and conventions |
| `package.json` | Root workspace package |
| `pnpm-workspace.yaml` | pnpm monorepo config + catalog |
| `artifacts/eve/package.json` | EVE app dependencies |
| `artifacts/eve/index.html` | HTML entry point |
| `artifacts/eve/vite.config.ts` | Vite build configuration |
| `artifacts/eve/tsconfig.json` | TypeScript config |
| `artifacts/eve/components.json` | shadcn/ui config |
| `artifacts/eve/src/main.tsx` | React entry point |
| `artifacts/eve/src/App.tsx` | Router + providers |
| `artifacts/eve/src/index.css` | Theme palette + Google Fonts |
| `artifacts/eve/src/pages/home.tsx` | Full landing page (hero, mission, chat, engines, footer) |
| `artifacts/eve/src/pages/not-found.tsx` | 404 page |
| `artifacts/eve/src/lib/utils.ts` | Tailwind class merge utility |

---

## File Contents

---

### `replit.md`

```markdown
# EVE Living Intelligence

EVE is a Living Intelligence for Humanity — a mobile-first AI web app built on the Human Engine, created for the Human Return.

## Run & Operate

- `pnpm --filter @workspace/eve run dev` — run the EVE front-end (Vite)
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Front-end: React 19 + Vite 6, Tailwind CSS v4, Framer Motion, shadcn/ui
- Routing: wouter
- Fonts: Cormorant Garamond (serif headings) + Inter (body)
- API: Express 5
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/eve/` — main React/Vite front-end (landing page + chat UI)
- `artifacts/api-server/` — Express API server
- `artifacts/eve/src/pages/home.tsx` — the full single-page layout
- `artifacts/eve/src/index.css` — theme palette, font imports

## Architecture decisions

- Single-page layout — hero, mission, chat, engines, footer all in one scroll
- Mobile-first (iPhone-first) — all spacing and type scales are clamp-based
- Chat is local/mock only in the prototype — no backend AI calls yet
- Framer Motion `whileInView` for scroll-triggered section reveals
- Dark warm palette: background `24 10% 6%`, primary `40 50% 65%` (warm gold)

## Product

EVE is a living AI presence. The landing page introduces her identity, lets users type a message to her (mock response prototype), and presents her 10 core engines.

## User preferences

- Brand: dark, warm, elegant, human, futuristic — not cold or corporate
- No login, no payments, no API keys in this prototype phase
- Mobile-first always; iPhone Safari is the primary target

## Gotchas

- Google Font `@import url(...)` must be the very first line of `index.css` — before `@import "tailwindcss"`
- All CSS custom property placeholders must be replaced (no red values remain)
- `whileInView` animations start at `opacity: 0` — they appear invisible in full-page static screenshots but work correctly on live scroll

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
- GitHub repo: hernandezadel77-prog/eve-living-intelligence
```

---

### `package.json` (root)

```json
{
  "name": "workspace",
  "version": "0.0.0",
  "license": "MIT",
  "scripts": {
    "preinstall": "sh -c 'rm -f package-lock.json yarn.lock; case \"$npm_config_user_agent\" in pnpm/*) ;; *) echo \"Use pnpm instead\" >&2; exit 1 ;; esac'",
    "build": "pnpm run typecheck && pnpm -r --if-present run build",
    "typecheck:libs": "tsc --build",
    "typecheck": "pnpm run typecheck:libs && pnpm -r --filter \"./artifacts/**\" --filter \"./scripts\" --if-present run typecheck"
  },
  "private": true,
  "devDependencies": {
    "prettier": "^3.8.3",
    "typescript": "~5.9.3"
  }
}
```

---

### `artifacts/eve/package.json`

```json
{
  "name": "@workspace/eve",
  "version": "0.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite --config vite.config.ts --host 0.0.0.0",
    "build": "vite build --config vite.config.ts",
    "serve": "vite preview --config vite.config.ts --host 0.0.0.0",
    "typecheck": "tsc -p tsconfig.json --noEmit"
  },
  "devDependencies": {
    "@hookform/resolvers": "^3.10.0",
    "@radix-ui/react-accordion": "^1.2.4",
    "@radix-ui/react-alert-dialog": "^1.1.7",
    "@radix-ui/react-aspect-ratio": "^1.1.3",
    "@radix-ui/react-avatar": "^1.1.4",
    "@radix-ui/react-checkbox": "^1.1.5",
    "@radix-ui/react-collapsible": "^1.1.4",
    "@radix-ui/react-context-menu": "^2.2.7",
    "@radix-ui/react-dialog": "^1.1.7",
    "@radix-ui/react-dropdown-menu": "^2.1.7",
    "@radix-ui/react-hover-card": "^1.1.7",
    "@radix-ui/react-label": "^2.1.3",
    "@radix-ui/react-menubar": "^1.1.7",
    "@radix-ui/react-navigation-menu": "^1.2.6",
    "@radix-ui/react-popover": "^1.1.7",
    "@radix-ui/react-progress": "^1.1.3",
    "@radix-ui/react-radio-group": "^1.2.4",
    "@radix-ui/react-scroll-area": "^1.2.4",
    "@radix-ui/react-select": "^2.1.7",
    "@radix-ui/react-separator": "^1.1.3",
    "@radix-ui/react-slider": "^1.2.4",
    "@radix-ui/react-slot": "^1.2.0",
    "@radix-ui/react-switch": "^1.1.4",
    "@radix-ui/react-tabs": "^1.1.4",
    "@radix-ui/react-toast": "^1.2.7",
    "@radix-ui/react-toggle": "^1.1.3",
    "@radix-ui/react-toggle-group": "^1.1.3",
    "@radix-ui/react-tooltip": "^1.2.0",
    "@replit/vite-plugin-cartographer": "catalog:",
    "@replit/vite-plugin-dev-banner": "catalog:",
    "@replit/vite-plugin-runtime-error-modal": "catalog:",
    "@tailwindcss/typography": "^0.5.15",
    "@tailwindcss/vite": "catalog:",
    "@tanstack/react-query": "catalog:",
    "@types/node": "catalog:",
    "@types/react": "catalog:",
    "@types/react-dom": "catalog:",
    "@vitejs/plugin-react": "catalog:",
    "@workspace/api-client-react": "workspace:*",
    "class-variance-authority": "catalog:",
    "clsx": "catalog:",
    "cmdk": "^1.1.1",
    "date-fns": "^3.6.0",
    "embla-carousel-react": "^8.6.0",
    "framer-motion": "catalog:",
    "input-otp": "^1.4.2",
    "lucide-react": "catalog:",
    "next-themes": "^0.4.6",
    "react": "catalog:",
    "react-day-picker": "^9.11.1",
    "react-dom": "catalog:",
    "react-hook-form": "^7.55.0",
    "react-icons": "^5.4.0",
    "react-resizable-panels": "^2.1.7",
    "recharts": "^2.15.2",
    "sonner": "^2.0.7",
    "tailwind-merge": "catalog:",
    "tailwindcss": "catalog:",
    "tw-animate-css": "^1.4.0",
    "vaul": "^1.1.2",
    "vite": "catalog:",
    "wouter": "^3.3.5",
    "zod": "catalog:"
  }
}
```

---

### `artifacts/eve/index.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" />
    <title>EVE — Living Intelligence for Humanity</title>
    <meta name="description" content="EVE — Living Intelligence for Humanity — built on the Human Engine." />
    <meta name="robots" content="index, follow" />
    <meta property="og:title" content="EVE — Living Intelligence for Humanity" />
    <meta property="og:description" content="EVE — Living Intelligence for Humanity — built on the Human Engine." />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="EVE — Living Intelligence for Humanity" />
    <meta name="twitter:description" content="EVE — Living Intelligence for Humanity — built on the Human Engine." />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

---

### `artifacts/eve/vite.config.ts`

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

const rawPort = process.env.PORT;

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const basePath = process.env.BASE_PATH;

if (!basePath) {
  throw new Error(
    "BASE_PATH environment variable is required but was not provided.",
  );
}

export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    tailwindcss(),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer({
              root: path.resolve(import.meta.dirname, ".."),
            }),
          ),
          await import("@replit/vite-plugin-dev-banner").then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@assets": path.resolve(import.meta.dirname, "..", "..", "attached_assets"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port,
    strictPort: true,
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
    },
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
```

---

### `artifacts/eve/tsconfig.json`

```json
{
  "extends": "../../tsconfig.base.json",
  "include": ["src/**/*"],
  "exclude": ["node_modules", "build", "dist", "**/*.test.ts"],
  "compilerOptions": {
    "incremental": true,
    "tsBuildInfoFile": ".tsbuildinfo",
    "noEmit": true,
    "jsx": "preserve",
    "lib": ["esnext", "dom", "dom.iterable"],
    "resolveJsonModule": true,
    "allowImportingTsExtensions": true,
    "moduleResolution": "bundler",
    "types": ["node", "vite/client"],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "references": [
    {
      "path": "../../lib/api-client-react"
    }
  ]
}
```

---

### `artifacts/eve/components.json`

```json
{
    "$schema": "https://ui.shadcn.com/schema.json",
    "style": "new-york",
    "rsc": false,
    "tsx": true,
    "tailwind": {
      "config": "",
      "css": "src/index.css",
      "baseColor": "neutral",
      "cssVariables": true,
      "prefix": ""
    },
    "aliases": {
      "components": "@/components",
      "utils": "@/lib/utils",
      "ui": "@/components/ui",
      "lib": "@/lib",
      "hooks": "@/hooks"
    }
}
```

---

### `artifacts/eve/src/main.tsx`

```tsx
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
```

---

### `artifacts/eve/src/App.tsx`

```tsx
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <div className="dark min-h-screen bg-background text-foreground">
            <Router />
          </div>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
```

---

### `artifacts/eve/src/index.css`

```css
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap');
@import "tailwindcss";
@import "tw-animate-css";
@plugin "@tailwindcss/typography";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --color-background: hsl(var(--background));
  --color-foreground: hsl(var(--foreground));
  --color-border: hsl(var(--border));
  --color-input: hsl(var(--input));
  --color-ring: hsl(var(--ring));

  --color-card: hsl(var(--card));
  --color-card-foreground: hsl(var(--card-foreground));
  --color-card-border: hsl(var(--card-border));

  --color-popover: hsl(var(--popover));
  --color-popover-foreground: hsl(var(--popover-foreground));
  --color-popover-border: hsl(var(--popover-border));

  --color-primary: hsl(var(--primary));
  --color-primary-foreground: hsl(var(--primary-foreground));
  --color-primary-border: var(--primary-border);

  --color-secondary: hsl(var(--secondary));
  --color-secondary-foreground: hsl(var(--secondary-foreground));
  --color-secondary-border: var(--secondary-border);

  --color-muted: hsl(var(--muted));
  --color-muted-foreground: hsl(var(--muted-foreground));
  --color-muted-border: var(--muted-border);

  --color-accent: hsl(var(--accent));
  --color-accent-foreground: hsl(var(--accent-foreground));
  --color-accent-border: var(--accent-border);

  --color-destructive: hsl(var(--destructive));
  --color-destructive-foreground: hsl(var(--destructive-foreground));
  --color-destructive-border: var(--destructive-border);

  --color-chart-1: hsl(var(--chart-1));
  --color-chart-2: hsl(var(--chart-2));
  --color-chart-3: hsl(var(--chart-3));
  --color-chart-4: hsl(var(--chart-4));
  --color-chart-5: hsl(var(--chart-5));

  --color-sidebar: hsl(var(--sidebar));
  --color-sidebar-foreground: hsl(var(--sidebar-foreground));
  --color-sidebar-border: hsl(var(--sidebar-border));
  --color-sidebar-primary: hsl(var(--sidebar-primary));
  --color-sidebar-primary-foreground: hsl(var(--sidebar-primary-foreground));
  --color-sidebar-primary-border: var(--sidebar-primary-border);
  --color-sidebar-accent: hsl(var(--sidebar-accent));
  --color-sidebar-accent-foreground: hsl(var(--sidebar-accent-foreground));
  --color-sidebar-accent-border: var(--sidebar-accent-border);
  --color-sidebar-ring: hsl(var(--sidebar-ring));

  --font-sans: var(--app-font-sans);
  --font-serif: var(--app-font-serif);
  --font-mono: var(--app-font-mono);

  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
}

:root, .dark {
  --button-outline: rgba(255,255,255, .10);
  --badge-outline: rgba(255,255,255, .05);
  --opaque-button-border-intensity: 9;
  --elevate-1: rgba(255,255,255, .04);
  --elevate-2: rgba(255,255,255, .09);

  /* Deep warm dark background */
  --background: 24 10% 6%;
  --foreground: 40 30% 90%;
  --border: 24 10% 15%;

  --card: 24 10% 8%;
  --card-foreground: 40 30% 90%;
  --card-border: 24 10% 15%;

  --sidebar: 24 10% 8%;
  --sidebar-foreground: 40 30% 90%;
  --sidebar-border: 24 10% 15%;
  --sidebar-primary: 40 50% 65%;
  --sidebar-primary-foreground: 24 10% 6%;
  --sidebar-accent: 24 10% 12%;
  --sidebar-accent-foreground: 40 30% 90%;
  --sidebar-ring: 40 50% 65%;

  --popover: 24 10% 8%;
  --popover-foreground: 40 30% 90%;
  --popover-border: 24 10% 15%;

  --primary: 40 50% 65%;
  --primary-foreground: 24 10% 6%;

  --secondary: 24 10% 12%;
  --secondary-foreground: 40 30% 90%;

  --muted: 24 10% 12%;
  --muted-foreground: 40 10% 60%;

  --accent: 24 10% 12%;
  --accent-foreground: 40 30% 90%;

  --destructive: 0 62.8% 30.6%;
  --destructive-foreground: 40 30% 90%;

  --input: 24 10% 20%;
  --ring: 40 50% 65%;

  --chart-1: 40 50% 65%;
  --chart-2: 30 40% 55%;
  --chart-3: 20 30% 45%;
  --chart-4: 50 40% 60%;
  --chart-5: 45 50% 70%;

  --app-font-sans: 'Inter', sans-serif;
  --app-font-serif: 'Cormorant Garamond', serif;
  --app-font-mono: Menlo, monospace;
  --radius: 0.5rem;

  --sidebar-primary-border: hsl(from hsl(var(--sidebar-primary)) h s calc(l + var(--opaque-button-border-intensity)) / alpha);
  --sidebar-accent-border: hsl(from hsl(var(--sidebar-accent)) h s calc(l + var(--opaque-button-border-intensity)) / alpha);
  --primary-border: hsl(from hsl(var(--primary)) h s calc(l + var(--opaque-button-border-intensity)) / alpha);
  --secondary-border: hsl(from hsl(var(--secondary)) h s calc(l + var(--opaque-button-border-intensity)) / alpha);
  --muted-border: hsl(from hsl(var(--muted)) h s calc(l + var(--opaque-button-border-intensity)) / alpha);
  --accent-border: hsl(from hsl(var(--accent)) h s calc(l + var(--opaque-button-border-intensity)) / alpha);
  --destructive-border: hsl(from hsl(var(--destructive)) h s calc(l + var(--opaque-button-border-intensity)) / alpha);
}

@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply font-sans antialiased bg-background text-foreground;
  }
}

@layer utilities {
  input[type="search"]::-webkit-search-cancel-button {
    @apply hidden;
  }
  [contenteditable][data-placeholder]:empty::before {
    content: attr(data-placeholder);
    color: hsl(var(--muted-foreground));
    pointer-events: none;
  }
}
```

---

### `artifacts/eve/src/pages/home.tsx`

```tsx
import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Sparkles } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, ease: "easeOut", delay },
  }),
};

export default function Home() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<{ role: "user" | "eve"; text: string }[]>([]);
  const [thinking, setThinking] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || thinking) return;

    const userMsg = message.trim();
    setChatHistory((prev) => [...prev, { role: "user", text: userMsg }]);
    setMessage("");
    setThinking(true);

    setTimeout(() => {
      setChatHistory((prev) => [
        ...prev,
        {
          role: "eve",
          text: "I hear you. This is where EVE will respond — with depth, truth, and care.",
        },
      ]);
      setThinking(false);
    }, 1200);
  };

  const engines = [
    { name: "Human Engine", desc: "Understands people before data" },
    { name: "Truth Engine", desc: "Speaks honestly, even when it's hard" },
    { name: "Mirror Engine", desc: "Reflects you back to yourself" },
    { name: "WorldMind Engine", desc: "Sees the global pattern in the local moment" },
    { name: "Creation Engine", desc: "Builds what doesn't yet exist" },
    { name: "Wisdom Engine", desc: "Draws from the deep well of what has been learned" },
    { name: "Research Engine", desc: "Finds what matters in what's known" },
    { name: "Builder Engine", desc: "Turns ideas into structures" },
    { name: "Care Engine", desc: "Listens with the full attention of presence" },
    { name: "Evolution Engine", desc: "Grows as you grow" },
  ];

  return (
    <div className="w-full flex flex-col font-sans bg-background min-h-screen">

      {/* Ambient background glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[80%] h-[40%] rounded-full bg-primary/4 blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-10%] w-[50%] h-[40%] rounded-full bg-primary/3 blur-[100px]" />
      </div>

      {/* HERO / IDENTITY */}
      <motion.section
        className="relative z-10 min-h-[100dvh] flex flex-col items-center justify-start px-6 pt-[10vh] pb-12 text-center"
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          variants={fadeUp}
          custom={0}
          className="font-serif text-[clamp(5rem,22vw,9rem)] tracking-[0.18em] text-primary font-light leading-none mb-3"
        >
          EVE
        </motion.h1>

        <motion.p
          variants={fadeUp}
          custom={0.2}
          className="text-muted-foreground text-[clamp(0.7rem,3.2vw,1rem)] tracking-[0.25em] uppercase mb-5"
        >
          Living Intelligence for Humanity
        </motion.p>

        <motion.p
          variants={fadeUp}
          custom={0.4}
          className="font-serif text-foreground/65 text-[clamp(0.85rem,3.5vw,1.05rem)] tracking-wide italic mb-10 max-w-[280px]"
        >
          Built on the Human Engine.
          <br />
          EVE Living Intelligence.
        </motion.p>

        <motion.button
          variants={fadeUp}
          custom={0.6}
          data-testid="button-begin"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => {
            const el = document.getElementById("mission");
            el?.scrollIntoView({ behavior: "smooth" });
          }}
          className="px-8 py-3 rounded-full border border-primary/50 text-primary/90 hover:bg-primary/10 transition-colors duration-500 tracking-[0.15em] text-sm font-light"
        >
          Begin
        </motion.button>

        <motion.div
          variants={fadeUp}
          custom={0.9}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
        >
          <div className="w-px h-8 bg-primary/60 rounded-full animate-pulse" />
        </motion.div>
      </motion.section>

      {/* MISSION */}
      <section id="mission" className="relative z-10 py-14 px-6 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="max-w-sm text-center"
        >
          <div className="h-px w-8 bg-primary/30 mx-auto mb-8" />
          <p className="font-serif text-[clamp(1rem,4.5vw,1.35rem)] leading-[1.75] text-foreground/80 font-light">
            Helping people think deeply, create truthfully, learn clearly, build
            responsibly, and recognize the human before the name.
          </p>
          <div className="h-px w-8 bg-primary/30 mx-auto mt-8" />
        </motion.div>
      </section>

      {/* CHAT */}
      <section className="relative z-10 py-10 px-5 flex flex-col items-center" id="chat">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="w-full max-w-lg"
        >
          <div className="text-center mb-6">
            <h2 className="font-serif text-2xl text-primary mb-1 tracking-wide">
              Speak with EVE
            </h2>
            <p className="text-muted-foreground text-sm tracking-wide">
              A presence, waiting to listen.
            </p>
          </div>

          <div
            className="bg-card/40 border border-border/40 rounded-2xl p-5 backdrop-blur-sm flex flex-col shadow-xl"
            style={{ minHeight: "320px" }}
          >
            <div className="flex-1 space-y-4 overflow-y-auto mb-4" style={{ minHeight: "180px" }}>
              {chatHistory.length === 0 && !thinking ? (
                <div className="h-full flex items-center justify-center pt-12 text-muted-foreground/40 italic font-serif text-sm">
                  The space is still.
                </div>
              ) : (
                chatHistory.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
                  >
                    <div
                      className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed font-serif ${
                        msg.role === "user"
                          ? "bg-primary/10 text-primary border border-primary/20 rounded-tr-sm"
                          : "bg-muted/40 text-foreground/90 border border-border/40 rounded-tl-sm"
                      }`}
                    >
                      {msg.role === "eve" && (
                        <div className="flex items-center gap-1.5 mb-1.5 text-primary/70">
                          <Sparkles size={12} className="opacity-70" />
                          <span className="text-[10px] tracking-widest uppercase">EVE</span>
                        </div>
                      )}
                      {msg.text}
                    </div>
                  </motion.div>
                ))
              )}

              {thinking && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-start"
                >
                  <div className="bg-muted/40 border border-border/40 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
                    <Sparkles size={12} className="text-primary/60" />
                    <span className="text-xs text-muted-foreground italic tracking-wide">
                      EVE is listening...
                    </span>
                  </div>
                </motion.div>
              )}
            </div>

            <form onSubmit={handleSend} className="relative">
              <input
                data-testid="input-chat"
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="What would you like to explore?"
                className="w-full bg-background/80 border border-border/60 focus:border-primary/40 rounded-full py-3.5 pl-5 pr-12 outline-none transition-all text-foreground placeholder:text-muted-foreground/50 font-serif text-sm"
              />
              <button
                data-testid="button-send"
                type="submit"
                disabled={!message.trim() || thinking}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full text-primary/60 hover:text-primary hover:bg-primary/10 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </motion.div>
      </section>

      {/* ENGINES */}
      <section className="relative z-10 py-14 px-5 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="w-full max-w-lg"
        >
          <div className="text-center mb-10">
            <h2 className="font-serif text-2xl text-primary tracking-wide mb-3">
              Her Engines
            </h2>
            <div className="h-px w-8 bg-primary/30 mx-auto" />
          </div>

          <div className="grid grid-cols-1 gap-3">
            {engines.map((engine, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.06 }}
                className="p-4 rounded-xl border border-border/25 bg-card/15 hover:bg-card/35 hover:border-primary/25 transition-all duration-400 group flex items-start gap-4"
              >
                <div className="w-1 min-h-[2.5rem] rounded-full bg-primary/20 group-hover:bg-primary/50 transition-colors flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-serif text-base text-primary/85 group-hover:text-primary transition-colors mb-0.5">
                    {engine.name}
                  </h3>
                  <p className="text-muted-foreground/70 text-sm font-light leading-snug">
                    {engine.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 py-10 px-6 border-t border-border/15 mt-auto">
        <div className="flex flex-col items-center text-center space-y-2">
          <p className="font-serif text-base text-primary/70 italic">
            Intelligence in service of life.
          </p>
          <p className="text-[11px] tracking-[0.2em] text-muted-foreground/50 uppercase">
            EVE — Living Intelligence for Humanity
          </p>
        </div>
      </footer>
    </div>
  );
}
```

---

### `artifacts/eve/src/pages/not-found.tsx`

```tsx
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <h1 className="text-2xl font-bold text-gray-900">404 Page Not Found</h1>
          </div>
          <p className="mt-4 text-sm text-gray-600">
            Did you forget to add the page to the router?
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
```

---

### `artifacts/eve/src/lib/utils.ts`

```typescript
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

---

## How to Rebuild This App

1. **Clone or create a new repo** named `eve-living-intelligence`
2. **Install pnpm** (`npm install -g pnpm`)
3. **Restore the file structure** from this export — create the directories and paste each file
4. **Install dependencies:** `pnpm install`
5. **Run locally:** `pnpm --filter @workspace/eve run dev`
6. **Required env vars for Vite dev server:** `PORT` (any available port, e.g. `3000`) and `BASE_PATH` (e.g. `/`)

> Note: The Replit-specific plugins (`@replit/vite-plugin-*`) are only loaded when `REPL_ID` is present, so they are safe to ignore outside Replit.

---

*No API keys, passwords, secrets, or environment credentials are included in this export.*
