# Portfolio Emma Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Recréer le portfolio Emma du HTML legacy en site Next.js (5 routes), monorepo Turbo + pnpm, Tailwind, mini-composants, formulaire Resend, placeholders images.

**Architecture:** `apps/web` (App Router) consomme `@portfolio/ui` et `@portfolio/content`. Next transpile le TypeScript source des packages (pas de build UI séparé). Tokens Tailwind dans `@portfolio/config`. La nav vit dans le layout ; chaque route est une page.

**Tech Stack:** pnpm workspaces, Turbo 2, Next.js 15 App Router, React 19, TypeScript strict, Tailwind CSS 3.4, Resend, `next/font` (Cormorant Garamond + Manrope).

## Global Constraints

- Source de vérité visuelle : `legacy/Portfolio Emma - Standalone.html` — coller spacing/clamp du HTML, ne pas « nettoyer » le layout.
- Routes exactes : `/`, `/competences`, `/realisations`, `/interets`, `/contact`.
- Destinataire mail : `marques.alizee@hotmail.fr`. Expéditeur Resend de test : `beth.t@example.com`.
- Images : tous les `src` dans `images.ts` valent `null` jusqu’à dépôt des photos. `Media` n’appelle `next/image` que si `src` est une string.
- Instagram / LinkedIn : `href` = `#`.
- Aucun test automatisé : ne pas créer `*.test.*`, ne pas installer Vitest/Playwright, ne pas ajouter de script `test`.
- Pas de hex brut dans les composants : uniquement des classes Tailwind issues du preset.
- Hamburger uniquement sous `md` ; ne pas modifier le look desktop de la nav.
- Lien nav actif : couleur `accent` (écart volontaire vs HTML).
- `legacy/` reste hors bundle.
- Copy collé mot pour mot depuis le HTML (y compris l’emoji ✨ du message de succès).
- Vérification d’une tâche = `pnpm` typecheck/dev + comparaison visuelle, jamais une suite de tests.

---

## File map

Créer uniquement ces fichiers (plus lockfile généré). Une responsabilité par fichier.

```
.gitignore
package.json
pnpm-workspace.yaml
turbo.json
README.md
apps/web/.env.example
apps/web/package.json
apps/web/tsconfig.json
apps/web/next.config.ts
apps/web/postcss.config.mjs
apps/web/tailwind.config.ts
apps/web/.eslintrc.json
apps/web/app/globals.css
apps/web/app/layout.tsx
apps/web/app/page.tsx
apps/web/app/not-found.tsx
apps/web/app/competences/page.tsx
apps/web/app/realisations/page.tsx
apps/web/app/realisations/realisations-view.tsx
apps/web/app/interets/page.tsx
apps/web/app/contact/page.tsx
apps/web/app/contact/contact-form.tsx
apps/web/app/api/contact/route.ts
apps/web/lib/contact.ts
packages/config/package.json
packages/config/tsconfig/base.json
packages/config/tailwind.preset.js
packages/content/package.json
packages/content/tsconfig.json
packages/content/src/index.ts
packages/content/src/nav.ts
packages/content/src/home.ts
packages/content/src/skills.ts
packages/content/src/projects.ts
packages/content/src/interests.ts
packages/content/src/contact.ts
packages/content/src/social.ts
packages/content/src/images.ts
packages/ui/package.json
packages/ui/tsconfig.json
packages/ui/src/index.ts
packages/ui/src/cn.ts
packages/ui/src/tones.ts
packages/ui/src/button.tsx
packages/ui/src/eyebrow.tsx
packages/ui/src/heading.tsx
packages/ui/src/body.tsx
packages/ui/src/container.tsx
packages/ui/src/media.tsx
packages/ui/src/icon-link.tsx
packages/ui/src/nav-bar.tsx
packages/ui/src/tab.tsx
packages/ui/src/project-tile.tsx
packages/ui/src/project-modal.tsx
packages/ui/src/skill-band.tsx
packages/ui/src/interest-band.tsx
packages/ui/src/text-field.tsx
packages/ui/src/blob.tsx
```

Noms npm : `@portfolio/web`, `@portfolio/ui`, `@portfolio/content`, `@portfolio/config`.

Types produits par `@portfolio/content` (référence pour toutes les tâches) :

```ts
export type ImageSrc = string | null;
export type Tone =
  | 'blush'
  | 'tile'
  | 'sand'
  | 'stone'
  | 'wheat'
  | 'peach'
  | 'cream'
  | 'accent-soft';
export type NavHref = '/' | '/competences' | '/realisations' | '/interets' | '/contact';
export type NavItem = { href: NavHref; label: string; variant: 'ghost' | 'pill' };
export type Skill = { num: string; title: string; desc: string; tone: Tone };
export type ProjectCategory = 'Réseaux sociaux' | 'Print';
export type Project = { id: string; category: ProjectCategory; title: string; description: string };
export type Interest = {
  label: string;
  desc: string;
  tone: Tone;
  imgKey: 'photo' | 'dance' | 'lecture' | 'travel' | 'concert';
  direction: 'ltr' | 'rtl';
};
```

---

### Task 1: Scaffold monorepo + app Next + tokens Tailwind

**Files:**
- Create: `.gitignore`
- Create: `package.json`
- Create: `pnpm-workspace.yaml`
- Create: `turbo.json`
- Create: `packages/config/package.json`
- Create: `packages/config/tsconfig/base.json`
- Create: `packages/config/tailwind.preset.js`
- Create: `apps/web/package.json`
- Create: `apps/web/tsconfig.json`
- Create: `apps/web/next.config.ts`
- Create: `apps/web/postcss.config.mjs`
- Create: `apps/web/tailwind.config.ts`
- Create: `apps/web/app/globals.css`
- Create: `apps/web/app/layout.tsx`
- Create: `apps/web/app/page.tsx`

**Interfaces:**
- Consumes: rien
- Produces: workspace pnpm/turbo installable ; tokens Tailwind `bg`, `ink`, `ink-muted`, `ink-soft`, `accent`, `accent-soft`, `blush`, `olive`, `tile`, `sand`, `stone`, `wheat`, `peach`, `cream`, `contact`, `contact-line`, `overlay` ; app Next qui rend une page crème vide

- [ ] **Step 1: Fichiers racine**

`.gitignore` :

```
node_modules
.next
.turbo
dist
.env
.env.local
*.tsbuildinfo
.DS_Store
```

`pnpm-workspace.yaml` :

```yaml
packages:
  - "apps/*"
  - "packages/*"
```

`package.json` :

```json
{
  "name": "portfolio-communication",
  "private": true,
  "scripts": {
    "dev": "turbo dev",
    "build": "turbo build",
    "lint": "turbo lint"
  },
  "devDependencies": {
    "turbo": "^2.5.0",
    "typescript": "^5.8.0"
  },
  "packageManager": "pnpm@9.15.0"
}
```

`turbo.json` :

```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {
      "dependsOn": ["^lint"]
    }
  }
}
```

- [ ] **Step 2: Package config (TS + Tailwind preset)**

`packages/config/package.json` :

```json
{
  "name": "@portfolio/config",
  "version": "0.0.0",
  "private": true,
  "exports": {
    "./tailwind.preset": "./tailwind.preset.js",
    "./tsconfig/base.json": "./tsconfig/base.json"
  }
}
```

`packages/config/tsconfig/base.json` :

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true
  }
}
```

`packages/config/tailwind.preset.js` :

```js
/** @type {import('tailwindcss').Config} */
const preset = {
  theme: {
    extend: {
      colors: {
        bg: "#F5EFE6",
        ink: "#4A3B30",
        "ink-muted": "#6b584a",
        "ink-soft": "#5c4c3f",
        accent: "#C49D83",
        "accent-soft": "#BDA18A",
        blush: "#E8D5CC",
        olive: "#9E9F8D",
        tile: "#DACBB8",
        sand: "#EFE6D8",
        stone: "#D5CABC",
        wheat: "#E3D9C6",
        peach: "#FFDFD1",
        cream: "#F3E7DA",
        contact: "#4A3B30",
        "contact-line": "#8a7462",
        overlay: "rgba(74,59,48,0.85)",
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.3s ease",
      },
    },
  },
};

module.exports = preset;
```

- [ ] **Step 3: App Next minimale**

`apps/web/package.json` :

```json
{
  "name": "@portfolio/web",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^15.5.0",
    "react": "^19.1.0",
    "react-dom": "^19.1.0"
  },
  "devDependencies": {
    "@portfolio/config": "workspace:*",
    "@types/node": "^22.0.0",
    "@types/react": "^19.1.0",
    "@types/react-dom": "^19.1.0",
    "autoprefixer": "^10.4.0",
    "eslint": "^9.0.0",
    "eslint-config-next": "^15.5.0",
    "postcss": "^8.5.0",
    "tailwindcss": "^3.4.17",
    "typescript": "^5.8.0"
  }
}
```

`apps/web/tsconfig.json` :

```json
{
  "extends": "@portfolio/config/tsconfig/base.json",
  "compilerOptions": {
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

`apps/web/next.config.ts` :

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@portfolio/ui", "@portfolio/content"],
};

export default nextConfig;
```

`apps/web/postcss.config.mjs` :

```js
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;
```

`apps/web/tailwind.config.ts` :

```ts
import type { Config } from "tailwindcss";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const preset = require("@portfolio/config/tailwind.preset");

const config: Config = {
  presets: [preset],
  content: [
    "./app/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
};

export default config;
```

`apps/web/app/globals.css` :

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }
  body {
    @apply m-0 bg-bg font-sans text-ink;
  }
  ::selection {
    @apply bg-accent text-bg;
  }
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
  .animate-fadeUp {
    animation: none !important;
  }
}
```

`apps/web/app/layout.tsx` :

```tsx
import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "Emma — Portfolio",
  description: "Portfolio d'Emma, communication et création visuelle.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={`${cormorant.variable} ${manrope.variable}`}>{children}</body>
    </html>
  );
}
```

`apps/web/app/page.tsx` :

```tsx
export default function HomePage() {
  return <main className="min-h-dvh bg-bg" />;
}
```

`apps/web/.eslintrc.json` :

```json
{
  "extends": "next/core-web-vitals"
}
```

- [ ] **Step 4: Installer et vérifier**

Run: `pnpm install` à la racine, puis `pnpm --filter @portfolio/web dev`

Expected: serveur sur `http://localhost:3000`, page fond `#F5EFE6`, aucune erreur de module `@portfolio/config`.

- [ ] **Step 5: Commit**

```bash
git add .gitignore package.json pnpm-workspace.yaml turbo.json pnpm-lock.yaml packages/config apps/web
git commit -m "Scaffold du monorepo Next.js, Turbo, pnpm et tokens Tailwind."
```

Ne pas ajouter `legacy/` ni `.env.local`.

---

### Task 2: Package content (copy HTML typé)

**Files:**
- Create: `packages/content/package.json`
- Create: `packages/content/tsconfig.json`
- Create: `packages/content/src/nav.ts`
- Create: `packages/content/src/home.ts`
- Create: `packages/content/src/skills.ts`
- Create: `packages/content/src/projects.ts`
- Create: `packages/content/src/interests.ts`
- Create: `packages/content/src/contact.ts`
- Create: `packages/content/src/social.ts`
- Create: `packages/content/src/images.ts`
- Create: `packages/content/src/index.ts`

**Interfaces:**
- Consumes: type `Tone` défini ci-dessus
- Produces: exports nommés `nav`, `home`, `skills`, `projects`, `interests`, `contact`, `social`, `images` + types listés dans File map

- [ ] **Step 1: Manifest package**

`packages/content/package.json` :

```json
{
  "name": "@portfolio/content",
  "version": "0.0.0",
  "private": true,
  "exports": {
    ".": "./src/index.ts"
  }
}
```

`packages/content/tsconfig.json` :

```json
{
  "extends": "@portfolio/config/tsconfig/base.json",
  "include": ["src"]
}
```

Ajouter `"@portfolio/config": "workspace:*"` en `devDependencies` de ce package.

- [ ] **Step 2: Modules de données**

`packages/content/src/nav.ts` :

```ts
export type NavHref = "/" | "/competences" | "/realisations" | "/interets" | "/contact";
export type NavItem = { href: NavHref; label: string; variant: "ghost" | "pill" };

export const nav = {
  brand: "Emma",
  items: [
    { href: "/", label: "Accueil", variant: "ghost" },
    { href: "/competences", label: "Mes compétences", variant: "ghost" },
    { href: "/realisations", label: "Mes réalisations", variant: "ghost" },
    { href: "/interets", label: "Centres d'intérêt", variant: "ghost" },
    { href: "/contact", label: "Contact", variant: "pill" },
  ] satisfies NavItem[],
};
```

`packages/content/src/home.ts` :

```ts
export const home = {
  welcome: "Bienvenue sur mon portfolio",
  eyebrow: "Qui suis-je ?",
  heading: "Je suis Emma, passionnée de communication et de création visuelle.",
  bio: "Entre montage vidéo, gestion de réseaux sociaux et développement éditorial, j'aime donner une voix et une image cohérente aux marques que j'accompagne. Curieuse et créative, je puise mon inspiration dans la danse, la photographie, les voyages et les concerts — des univers qui nourrissent chacun de mes projets.",
  cta: "Voir mes réalisations →",
  ctaHref: "/realisations" as const,
  portraitLabel: "Ta photo de portrait",
};
```

`packages/content/src/skills.ts` :

```ts
import type { Tone } from "./images";

export type Skill = { num: string; title: string; desc: string; tone: Tone };

export const skills: Skill[] = [
  {
    num: "01",
    title: "Montage vidéo",
    desc: "Du dérushage à l'export final, je construis des vidéos rythmées, sous-titrées et pensées pour chaque format — reels, capsules, contenus événementiels — avec une attention particulière au son et au rythme.",
    tone: "blush",
  },
  {
    num: "02",
    title: "Communication externe & interne",
    desc: "Je construis des messages clairs et cohérents, que ce soit pour porter la voix d'une marque à l'extérieur ou renforcer la cohésion et l'information au sein d'une équipe.",
    tone: "tile",
  },
  {
    num: "03",
    title: "Gestion de réseaux sociaux & identité visuelle",
    desc: "De la ligne graphique au calendrier de publication, je pilote une présence sociale cohérente : chartes adaptées à chaque plateforme, contenus planifiés, ton de marque respecté.",
    tone: "sand",
  },
  {
    num: "04",
    title: "Développement éditorial",
    desc: "Je définis une ligne rédactionnelle claire et je la décline en contenus — articles, légendes, newsletters — pour donner à chaque marque une voix reconnaissable.",
    tone: "stone",
  },
  {
    num: "05",
    title: "Retouche photo",
    desc: "Colorimétrie, cadrage, cohérence visuelle : je retouche chaque image pour qu'elle s'intègre parfaitement dans l'univers graphique du projet.",
    tone: "wheat",
  },
];
```

`packages/content/src/projects.ts` :

```ts
export type ProjectCategory = "Réseaux sociaux" | "Print";
export type Project = {
  id: string;
  category: ProjectCategory;
  title: string;
  description: string;
};

export const projects: Project[] = [
  { id: "soc0", category: "Réseaux sociaux", title: "Campagne teaser — lancement produit", description: "Série de 5 visuels Instagram pour annoncer le lancement d'une nouvelle gamme, avec une charte cohérente et un teasing en trois temps." },
  { id: "soc1", category: "Réseaux sociaux", title: "Reel — coulisses d'un shooting", description: "Montage dynamique d'un reel behind-the-scenes, rythmé au beat pour maximiser la rétention." },
  { id: "soc2", category: "Réseaux sociaux", title: "Calendrier éditorial mensuel", description: "Planification et création de 20 posts pour une marque lifestyle, avec identité visuelle harmonisée." },
  { id: "soc3", category: "Réseaux sociaux", title: "Story highlights — refonte identité", description: "Création de covers et templates de stories pour unifier l'image de marque sur Instagram." },
  { id: "soc4", category: "Réseaux sociaux", title: "Carrousel — étude de cas client", description: "Carrousel pédagogique présentant un projet client, pensé pour l'engagement et le partage." },
  { id: "soc5", category: "Réseaux sociaux", title: "Vidéo verticale — événement live", description: "Captation et montage rapide d'un événement, publié en moins de 24h sur les réseaux." },
  { id: "soc6", category: "Réseaux sociaux", title: "Collaboration influenceur", description: "Coordination de contenu avec une créatrice, direction artistique et validation des visuels." },
  { id: "soc7", category: "Réseaux sociaux", title: "Campagne UGC repost", description: "Curation et retouche de contenus générés par la communauté pour le feed de marque." },
  { id: "soc8", category: "Réseaux sociaux", title: "Reel tutoriel produit", description: "Format éducatif court expliquant l'usage d'un produit, sous-titré et animé." },
  { id: "soc9", category: "Réseaux sociaux", title: "Lancement newsletter sociale", description: "Teasing multi-format annonçant une nouvelle newsletter, décliné sur trois réseaux." },
  { id: "prt0", category: "Print", title: "Affiche événement culturel", description: "Création graphique d'une affiche pour un festival, déclinée en formats A3 et réseaux." },
  { id: "prt1", category: "Print", title: "Brochure institutionnelle", description: "Mise en page d'une brochure 12 pages présentant les activités d'une structure." },
  { id: "prt2", category: "Print", title: "Flyer promotionnel", description: "Flyer recto-verso pour une offre commerciale, dans la charte graphique de la marque." },
  { id: "prt3", category: "Print", title: "Rapport annuel", description: "Direction artistique et mise en page d'un rapport d'activité, infographies incluses." },
  { id: "prt4", category: "Print", title: "Packaging édition limitée", description: "Conception d'un packaging pour une collaboration ponctuelle, cohérent avec l'univers de marque." },
  { id: "prt5", category: "Print", title: "Carte de visite & papeterie", description: "Déclinaison de l'identité visuelle sur les supports de papeterie d'entreprise." },
  { id: "prt6", category: "Print", title: "Catalogue produits", description: "Mise en page d'un catalogue saisonnier, hiérarchisation visuelle des collections." },
  { id: "prt7", category: "Print", title: "Signalétique intérieure", description: "Création de supports de signalétique pour un espace d'accueil." },
  { id: "prt8", category: "Print", title: "Programme de soirée", description: "Livret imprimé pour une soirée de gala, mise en page élégante et sobre." },
  { id: "prt9", category: "Print", title: "Kit presse", description: "Dossier de presse complet incluant visuels, textes et fiches produits." },
];
```

`packages/content/src/images.ts` :

```ts
export type ImageSrc = string | null;
export type Tone =
  | "blush"
  | "tile"
  | "sand"
  | "stone"
  | "wheat"
  | "peach"
  | "cream"
  | "accent-soft";

export const images = {
  portrait: null as ImageSrc,
  realisationsHero: null as ImageSrc,
  interetsHero: null as ImageSrc,
  projects: {
    soc0: null, soc1: null, soc2: null, soc3: null, soc4: null,
    soc5: null, soc6: null, soc7: null, soc8: null, soc9: null,
    prt0: null, prt1: null, prt2: null, prt3: null, prt4: null,
    prt5: null, prt6: null, prt7: null, prt8: null, prt9: null,
  } as Record<string, ImageSrc>,
  interests: {
    photo: null,
    dance: null,
    lecture: null,
    travel: null,
    concert: null,
  } as Record<"photo" | "dance" | "lecture" | "travel" | "concert", ImageSrc>,
};
```

Corriger `skills.ts` : importer `Tone` depuis `./images` (déjà fait). Ne pas dupliquer le type `Tone` ailleurs.

`packages/content/src/interests.ts` :

```ts
import type { Tone } from "./images";

export type Interest = {
  label: string;
  desc: string;
  tone: Tone;
  imgKey: "photo" | "dance" | "lecture" | "travel" | "concert";
  direction: "ltr" | "rtl";
};

export const interests: Interest[] = [
  {
    label: "La photographie",
    desc: "Un œil pour la lumière, le cadrage et la composition — des réflexes que je retrouve directement dans mes retouches photo et mes visuels de marque. Chaque cliché est pour moi une occasion de raconter quelque chose en une image.",
    tone: "blush",
    imgKey: "photo",
    direction: "ltr",
  },
  {
    label: "La danse",
    desc: "Le sens du rythme, de la précision du geste et de la mise en scène — des réflexes de danseuse qui infusent jusque dans le tempo d'un montage ou la construction d'un contenu visuel.",
    tone: "accent-soft",
    imgKey: "dance",
    direction: "rtl",
  },
  {
    label: "La lecture",
    desc: "Une source constante de vocabulaire, de style et d'inspiration narrative, qui nourrit directement ma façon d'écrire et de construire une ligne éditoriale.",
    tone: "peach",
    imgKey: "lecture",
    direction: "ltr",
  },
  {
    label: "Les voyages",
    desc: "Découvrir de nouvelles cultures, lumières et façons de vivre est une source constante d'inspiration visuelle — chaque voyage nourrit ma créativité et enrichit mon regard.",
    tone: "stone",
    imgKey: "travel",
    direction: "rtl",
  },
  {
    label: "Les concerts",
    desc: "L'énergie du live, l'intensité d'une mise en scène et l'attention portée aux moindres détails scéniques sont pour moi une véritable source d'inspiration pour mes contenus événementiels.",
    tone: "cream",
    imgKey: "concert",
    direction: "ltr",
  },
];
```

`packages/content/src/contact.ts` :

```ts
export const contact = {
  eyebrow: "04 — Contact",
  heading: "Travaillons ensemble",
  namePlaceholder: "Ton nom",
  emailPlaceholder: "Ton email",
  messagePlaceholder: "Ton message",
  submit: "Envoyer",
  submitting: "Envoi…",
  success: "Merci pour ton message — je reviens vite vers toi ✨",
  error: "L'envoi a échoué. Réessaie dans un instant.",
  fieldError: "Ce champ est requis.",
  emailInvalid: "Entre un email valide.",
  displayEmail: "contact@emma.fr",
  mailto: "mailto:contact@emma.fr",
};
```

`packages/content/src/social.ts` :

```ts
export const social = {
  instagram: { href: "#", label: "Instagram" },
  linkedin: { href: "#", label: "LinkedIn" },
};
```

`packages/content/src/index.ts` :

```ts
export { nav, type NavHref, type NavItem } from "./nav";
export { home } from "./home";
export { skills, type Skill } from "./skills";
export { projects, type Project, type ProjectCategory } from "./projects";
export { interests, type Interest } from "./interests";
export { contact } from "./contact";
export { social } from "./social";
export { images, type ImageSrc, type Tone } from "./images";
```

- [ ] **Step 3: Brancher le workspace**

Ajouter dans `apps/web/package.json` dependencies : `"@portfolio/content": "workspace:*"`.

Run: `pnpm install`

Expected: `@portfolio/content` lié, pas d’erreur.

- [ ] **Step 4: Commit**

```bash
git add packages/content apps/web/package.json pnpm-lock.yaml
git commit -m "Ajouter le contenu typé du portfolio, copié du HTML legacy."
```

---

### Task 3: Mini-composants primitifs UI

**Files:**
- Create: `packages/ui/package.json`
- Create: `packages/ui/tsconfig.json`
- Create: `packages/ui/src/cn.ts`
- Create: `packages/ui/src/tones.ts`
- Create: `packages/ui/src/button.tsx`
- Create: `packages/ui/src/eyebrow.tsx`
- Create: `packages/ui/src/heading.tsx`
- Create: `packages/ui/src/body.tsx`
- Create: `packages/ui/src/container.tsx`
- Create: `packages/ui/src/media.tsx`
- Create: `packages/ui/src/icon-link.tsx`
- Create: `packages/ui/src/text-field.tsx`
- Create: `packages/ui/src/blob.tsx`
- Create: `packages/ui/src/tab.tsx`
- Create: `packages/ui/src/index.ts`
- Modify: `apps/web/package.json` (deps `@portfolio/ui`, `clsx`, `tailwind-merge` via ui)

**Interfaces:**
- Consumes: `Tone` depuis `@portfolio/content` (ui ne dépend pas de content — `tones.ts` duplique les clés `Tone` en union locale identique : `blush | tile | sand | stone | wheat | peach | cream | accent-soft`)
- Produces:
  - `cn(...inputs: ClassValue[]): string`
  - `toneBg: Record<Tone, string>`
  - `Button({ variant: 'pill' | 'ghost' | 'underline' | 'outline', href?: string, type?: 'button' | 'submit', disabled?: boolean, className?: string, children, onClick? })`
  - `Eyebrow({ children, className? })`
  - `Heading({ as: 'h1' | 'h2' | 'h3', children, className? })`
  - `Body({ size: 'sm' | 'md', italic?: boolean, children, className? })`
  - `Container({ width: 'page' | 'wide' | 'narrow', children, className? })`
  - `Media({ src: string | null, alt: string, fallbackLabel: string, aspectRatio: string, className? })`
  - `IconLink({ network: 'instagram' | 'linkedin', href: string })`
  - `TextField({ as: 'input' | 'textarea', id: string, name: string, label: string, placeholder: string, type?: string, required?: boolean, error?: string, rows?: number })`
  - `Blob({ tone: 'blush' | 'olive', position: 'accueil-top' | 'accueil-bottom' })`
  - `Tab({ active: boolean, children, onClick })`

Pour éviter une dépendance ui → content, `tones.ts` redéclare l’union `Tone` avec les **mêmes littéraux** que `packages/content/src/images.ts`.

- [ ] **Step 1: Package ui**

`packages/ui/package.json` :

```json
{
  "name": "@portfolio/ui",
  "version": "0.0.0",
  "private": true,
  "exports": { ".": "./src/index.ts" },
  "dependencies": {
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.6.0"
  },
  "peerDependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@portfolio/config": "workspace:*",
    "@types/react": "^19.1.0",
    "typescript": "^5.8.0"
  }
}
```

`packages/ui/tsconfig.json` : extends `@portfolio/config/tsconfig/base.json`, include `src`.

Ajouter `"@portfolio/ui": "workspace:*"` dans `apps/web` dependencies.

- [ ] **Step 2: Utilitaires**

`packages/ui/src/cn.ts` :

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

`packages/ui/src/tones.ts` :

```ts
export type Tone =
  | "blush"
  | "tile"
  | "sand"
  | "stone"
  | "wheat"
  | "peach"
  | "cream"
  | "accent-soft";

export const toneBg: Record<Tone, string> = {
  blush: "bg-blush",
  tile: "bg-tile",
  sand: "bg-sand",
  stone: "bg-stone",
  wheat: "bg-wheat",
  peach: "bg-peach",
  cream: "bg-cream",
  "accent-soft": "bg-accent-soft",
};
```

- [ ] **Step 3: Primitives (coller les styles du HTML)**

`packages/ui/src/button.tsx` :

```tsx
import Link from "next/link";
import { cn } from "./cn";

const variants = {
  pill: "inline-flex items-center rounded-full bg-accent px-[22px] py-[10px] text-[14px] font-semibold text-bg hover:bg-accent-soft",
  ghost: "inline-flex items-center border-0 bg-transparent p-0 text-[15px] font-medium text-ink hover:text-accent",
  underline:
    "inline-flex items-center gap-[10px] border-0 border-b-2 border-accent bg-transparent pb-[6px] text-[14px] font-semibold text-ink hover:text-accent",
  outline:
    "inline-flex items-center rounded-full border border-accent-soft bg-transparent px-6 py-[10px] text-[14px] font-semibold text-ink hover:bg-blush",
} as const;

type ButtonProps = {
  variant: keyof typeof variants;
  href?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
};

export function Button({ variant, href, type = "button", disabled, className, children, onClick }: ButtonProps) {
  const cls = cn(variants[variant], "cursor-pointer font-sans transition-colors", disabled && "cursor-not-allowed opacity-50", className);
  if (href) {
    return (
      <Link href={href} className={cls} onClick={onClick}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} disabled={disabled} className={cls} onClick={onClick}>
      {children}
    </button>
  );
}
```

`packages/ui/src/eyebrow.tsx` :

```tsx
import { cn } from "./cn";

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("m-0 mb-3 text-[13px] font-semibold uppercase tracking-[3px] text-accent-soft", className)}>
      {children}
    </p>
  );
}
```

`packages/ui/src/heading.tsx` :

```tsx
import { cn } from "./cn";

const sizes = {
  h1: "font-serif text-[clamp(26px,3.6vw,38px)] font-semibold text-ink",
  h2: "font-serif text-[clamp(36px,5vw,56px)] font-semibold text-ink",
  h3: "font-serif text-[clamp(28px,4vw,42px)] font-semibold text-ink",
} as const;

export function Heading({
  as: Tag,
  children,
  className,
}: {
  as: "h1" | "h2" | "h3";
  children: React.ReactNode;
  className?: string;
}) {
  return <Tag className={cn(sizes[Tag], "m-0", className)}>{children}</Tag>;
}
```

`packages/ui/src/body.tsx` :

```tsx
import { cn } from "./cn";

export function Body({
  size = "md",
  italic,
  children,
  className,
}: {
  size?: "sm" | "md";
  italic?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "m-0 font-sans text-ink-muted",
        size === "sm" && "text-[13px] leading-[1.4]",
        size === "md" && "text-[16px] leading-[1.85] text-ink-soft",
        italic && "font-serif italic text-[17px] leading-[1.7] text-ink-muted",
        className,
      )}
    >
      {children}
    </p>
  );
}
```

`packages/ui/src/container.tsx` :

```tsx
import { cn } from "./cn";

const widths = {
  page: "max-w-[1100px]",
  wide: "max-w-[1200px]",
  narrow: "max-w-[900px]",
} as const;

export function Container({
  width,
  children,
  className,
}: {
  width: keyof typeof widths;
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("mx-auto w-full px-[6vw]", widths[width], className)}>{children}</div>;
}
```

`packages/ui/src/media.tsx` :

```tsx
import Image from "next/image";
import { cn } from "./cn";

export function Media({
  src,
  alt,
  fallbackLabel,
  aspectRatio,
  className,
}: {
  src: string | null;
  alt: string;
  fallbackLabel: string;
  aspectRatio: string;
  className?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-bg", className)} style={{ aspectRatio }}>
      {src ? (
        <Image src={src} alt={alt} fill className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center px-4 text-center">
          <span className="font-sans text-sm font-medium text-ink-muted">{fallbackLabel}</span>
        </div>
      )}
    </div>
  );
}
```

`packages/ui/src/icon-link.tsx` :

```tsx
export function IconLink({ network, href }: { network: "instagram" | "linkedin"; href: string }) {
  return (
    <a href={href} aria-label={network === "instagram" ? "Instagram" : "LinkedIn"} className="inline-flex text-ink hover:text-accent">
      {network === "instagram" ? (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
          <circle cx="12" cy="12" r="4.2" />
          <circle cx="17.2" cy="6.8" r="1" />
        </svg>
      ) : (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4.98 3.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM3 9h4v12H3zM9.5 9h3.8v1.7h.05c.53-1 1.83-2 3.76-2 4.02 0 4.9 2.5 4.9 5.8V21h-4v-5.6c0-1.34-.02-3.07-1.9-3.07-1.9 0-2.2 1.45-2.2 2.97V21h-4z" />
        </svg>
      )}
    </a>
  );
}
```

`packages/ui/src/text-field.tsx` :

```tsx
export function TextField({
  as,
  id,
  name,
  label,
  placeholder,
  type = "text",
  required,
  error,
  rows = 4,
}: {
  as: "input" | "textarea";
  id: string;
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
  error?: string;
  rows?: number;
}) {
  const fieldClass =
    "w-full bg-transparent border-0 border-b border-contact-line text-[17px] text-bg font-sans outline-none py-[10px] px-[2px] placeholder:text-bg/50";
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      {as === "textarea" ? (
        <textarea id={id} name={name} placeholder={placeholder} required={required} rows={rows} className={`${fieldClass} resize-none`} />
      ) : (
        <input id={id} name={name} type={type} placeholder={placeholder} required={required} className={fieldClass} />
      )}
      {error ? (
        <p className="text-[13px] text-blush" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
```

`packages/ui/src/blob.tsx` :

```tsx
import { cn } from "./cn";

export function Blob({ tone, position }: { tone: "blush" | "olive"; position: "accueil-top" | "accueil-bottom" }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute z-0 rounded-full",
        tone === "blush" && "bg-blush opacity-60 blur-[2px]",
        tone === "olive" && "bg-olive opacity-20",
        position === "accueil-top" && "right-[-8%] top-[-10%] h-[420px] w-[420px]",
        position === "accueil-bottom" && "bottom-[-12%] left-[-10%] h-[360px] w-[360px]",
      )}
    />
  );
}
```

`packages/ui/src/tab.tsx` :

```tsx
import { cn } from "./cn";

export function Tab({ active, children, onClick }: { active: boolean; children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "cursor-pointer rounded-full px-6 py-[10px] font-sans text-[14px] font-semibold",
        active ? "border-0 bg-accent text-bg" : "border border-accent-soft bg-transparent text-ink",
      )}
    >
      {children}
    </button>
  );
}
```

- [ ] **Step 4: Barrel**

`packages/ui/src/index.ts` — réexporter tous les symboles de cette tâche (`cn` n’a pas besoin d’être public). N’exporter pas encore NavBar / Project* / SkillBand / InterestBand (tâche suivante).

- [ ] **Step 5: Installer et vérifier**

Run: `pnpm install` puis `pnpm --filter @portfolio/web build`

Expected: build Next OK (page vide).

- [ ] **Step 6: Commit**

```bash
git add packages/ui apps/web/package.json pnpm-lock.yaml
git commit -m "Ajouter les mini-composants UI primitifs du design system."
```

---

### Task 4: NavBar (desktop + hamburger) + layout

**Files:**
- Create: `packages/ui/src/nav-bar.tsx`
- Modify: `packages/ui/src/index.ts` (export `NavBar`)
- Modify: `apps/web/app/layout.tsx` (insérer `NavBar`)
- Modify: `apps/web/app/globals.css` (classe `no-scrollbar` pour plus tard)

**Interfaces:**
- Consumes: `Button` ; props `NavBar({ brand: string, items: { href: string; label: string; variant: 'ghost' | 'pill' }[] })`
- Produces: `NavBar` client component, scroll > 40px → fond `bg-bg/90` + `backdrop-blur-[10px]`, sinon transparent ; hamburger `< md`

- [ ] **Step 1: Implémenter NavBar**

`packages/ui/src/nav-bar.tsx` — `"use client"`. State : `scrolled`, `open`.

Comportement :
- `useEffect` scroll : `setScrolled(window.scrollY > 40)`
- Desktop (`hidden md:flex gap-9 items-center`) : items via `Button` ghost ou pill, `href` = item.href. Si `usePathname() === item.href`, ajouter `className="text-accent"` sur les ghost.
- Logo : `Link` vers `/` avec `font-serif text-[26px] font-semibold tracking-[0.5px] text-ink`
- Barre : `fixed inset-x-0 top-0 z-[100] flex items-center justify-between px-[5vw] py-[22px] transition-colors` + fond conditionnel
- Mobile : bouton hamburger `md:hidden` aria-label « Menu », `aria-expanded={open}`. Panneau `fixed inset-0 z-[110] bg-bg flex flex-col items-center justify-center gap-8` avec les 5 liens + bouton fermer. Overlay = le panneau lui-même.
- `Escape` ferme. Au `open === true`, `document.body.style.overflow = 'hidden'`, restore au close/unmount.
- Focus : au open, focus le premier lien ; au close, focus le bouton hamburger. Piège Tab : si focus sort du panneau, le ramener au premier/dernier lien du panneau.

Ne pas afficher le hamburger à `md` et plus. Ne pas changer gap/padding desktop (`gap-9` = 36px).

- [ ] **Step 2: Brancher le layout**

```tsx
import { NavBar } from "@portfolio/ui";
import { nav } from "@portfolio/content";

// dans body :
<div className="relative w-full overflow-x-hidden">
  <NavBar brand={nav.brand} items={nav.items} />
  {children}
</div>
```

- [ ] **Step 3: Vérifier**

Run: `pnpm --filter @portfolio/web dev`

Expected desktop ≥768px : logo Emma à gauche, 4 liens + pill Contact à droite, fond transparent puis crème flou au scroll. Mobile : hamburger, panneau plein écran, Escape ferme. Lien de la page courante en `accent`.

- [ ] **Step 4: Commit**

```bash
git add packages/ui/src/nav-bar.tsx packages/ui/src/index.ts apps/web/app/layout.tsx apps/web/app/globals.css
git commit -m "Ajouter la navigation fixe desktop et le menu hamburger mobile."
```

---

### Task 5: Composants de page (bandes, tuiles, modal)

**Files:**
- Create: `packages/ui/src/skill-band.tsx`
- Create: `packages/ui/src/interest-band.tsx`
- Create: `packages/ui/src/project-tile.tsx`
- Create: `packages/ui/src/project-modal.tsx`
- Modify: `packages/ui/src/index.ts`
- Modify: `apps/web/app/globals.css` (ajouter `.no-scrollbar { scrollbar-width: none; } .no-scrollbar::-webkit-scrollbar { display: none; }`)

**Interfaces:**
- Consumes: `Heading`, `Body`, `Media`, `Button`, `toneBg`, `Eyebrow`
- Produces:
  - `SkillBand({ num, title, desc, tone, index: number })` — index impair → `justify-end text-right`
  - `InterestBand({ label, desc, tone, imgSrc, imgLabel, direction: 'ltr' | 'rtl' })`
  - `ProjectTile({ title, src, fallbackLabel, onClick })`
  - `ProjectModal({ project: { title, category, description, src, fallbackLabel } | null, onClose })`

- [ ] **Step 1: SkillBand**

```tsx
import { cn } from "./cn";
import { toneBg, type Tone } from "./tones";
import { Heading } from "./heading";
import { Body } from "./body";

export function SkillBand({
  num,
  title,
  desc,
  tone,
  index,
}: {
  num: string;
  title: string;
  desc: string;
  tone: Tone;
  index: number;
}) {
  const end = index % 2 === 1;
  return (
    <div className={cn(toneBg[tone], "flex min-h-[46vh] items-center", end ? "justify-end text-right" : "justify-start text-left")}>
      <div className="max-w-[680px] px-[6vw] py-[60px]">
        <span className="font-serif text-[20px] font-semibold text-ink opacity-50">{num}</span>
        <Heading as="h3" className="mb-5 mt-3.5">
          {title}
        </Heading>
        <Body size="md">{desc}</Body>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: InterestBand**

```tsx
import { toneBg, type Tone } from "./tones";
import { Heading } from "./heading";
import { Body } from "./body";
import { Media } from "./media";

export function InterestBand({
  label,
  desc,
  tone,
  imgSrc,
  imgLabel,
  direction,
}: {
  label: string;
  desc: string;
  tone: Tone;
  imgSrc: string | null;
  imgLabel: string;
  direction: "ltr" | "rtl";
}) {
  return (
    <div className={`${toneBg[tone]} flex min-h-[70vh] items-center`}>
      <div
        className="mx-auto grid w-full max-w-[1100px] grid-cols-1 items-center gap-16 px-[6vw] py-[60px] md:grid-cols-2"
        style={{ direction }}
      >
        <div style={{ direction: "ltr" }}>
          <Heading as="h3" className="mb-5 text-[clamp(28px,4vw,40px)]">
            {label}
          </Heading>
          <Body size="md" className="max-w-[440px]">
            {desc}
          </Body>
        </div>
        <div className="overflow-hidden rounded-lg" style={{ direction: "ltr" }}>
          <Media src={imgSrc} alt={label} fallbackLabel={imgLabel} aspectRatio="4/3" />
        </div>
      </div>
    </div>
  );
}
```

Sur mobile, garder 1 colonne (le HTML n’avait pas de breakpoint ; c’est le minimum pour que la grille 2 col. ne casse pas). Desktop = 2 colonnes comme le HTML.

- [ ] **Step 3: ProjectTile**

```tsx
import { Media } from "./media";

export function ProjectTile({
  title,
  src,
  fallbackLabel,
  onClick,
}: {
  title: string;
  src: string | null;
  fallbackLabel: string;
  onClick: () => void;
}) {
  return (
    <button type="button" onClick={onClick} className="group relative aspect-square cursor-pointer overflow-hidden bg-tile">
      <Media src={src} alt={title} fallbackLabel={fallbackLabel} aspectRatio="1/1" className="h-full w-full" />
      <div className="absolute inset-0 flex items-center justify-center bg-ink/55 p-4 text-center opacity-0 transition-opacity duration-250 group-hover:opacity-100">
        <span className="text-[15px] font-semibold text-bg">{title}</span>
      </div>
    </button>
  );
}
```

`duration-250` n’existe pas en Tailwind 3 : utiliser `duration-[250ms]`.

- [ ] **Step 4: ProjectModal** (`"use client"`)

Si `project === null`, `return null`.

Overlay : `fixed inset-0 z-[200] flex items-center justify-center bg-overlay p-[5vw] animate-fadeUp` — `onClick={onClose}`.

Carte : `onClick={(e) => e.stopPropagation()}` + `no-scrollbar max-h-[88vh] w-full max-w-[1000px] overflow-auto rounded grid grid-cols-1 bg-bg md:grid-cols-[1.2fr_1fr]`.

Colonne image : `Media` aspect `1/1`.

Colonne texte : `px-12 py-14 flex flex-col min-h-full` (padding HTML `56px 48px`). Eyebrow category `text-[12px] font-bold tracking-[2px] uppercase text-accent-soft mb-[18px]`. Titre h3 `text-[36px]`. Body `text-[18px] leading-[1.85] flex-1`. Bouton `Button variant="outline"` « Fermer ».

`useEffect` : si project, listener `keydown` Escape → `onClose`. Cleanup. `overflow: hidden` sur body tant que ouvert.

- [ ] **Step 5: Vérifier**

Importer temporairement `SkillBand` dans `page.tsx` avec `skills[0]` puis retirer avant commit si ça pollue l’accueil — préférable : `pnpm --filter @portfolio/web build` doit passer sans page encore branchée. Si TypeScript se plaint d’exports inutilisés, le barrel suffit.

Run: `pnpm --filter @portfolio/web build`

Expected: compile.

- [ ] **Step 6: Commit**

```bash
git add packages/ui apps/web/app/globals.css
git commit -m "Ajouter les bandes compétences/intérêts, tuiles et modal projet."
```

---

### Task 6: Page Accueil

**Files:**
- Modify: `apps/web/app/page.tsx`

**Interfaces:**
- Consumes: `home`, `images`, `social` ; `Blob`, `Heading`, `Eyebrow`, `Body`, `Button`, `Media`, `IconLink`, `Container`

- [ ] **Step 1: Remplacer `page.tsx`**

Structure HTML :
- `section#accueil` : `relative flex h-dvh items-center justify-center overflow-hidden box-border px-[6vw] pb-5 pt-[70px]`
- deux `Blob`
- wrapping `relative z-[1] w-full max-w-[1100px]`
- `Heading as="h1"` welcome, `text-center mb-7`
- grille `grid grid-cols-1 md:grid-cols-[0.85fr_1.15fr] items-center`
- portrait wrapper : `overflow-hidden rounded-[6px] w-[190px] h-[314px] max-h-[28vh]` + `Media` aspect `4/5` `src={images.portrait}` `fallbackLabel={home.portraitLabel}`
- colonne texte : Eyebrow `text-[11px] mb-2`, Heading h1 `text-[clamp(20px,2.8vw,30px)] leading-[1.15] mb-2.5`, Body sm `mb-2.5`, Button underline `href={home.ctaHref}`, rangée IconLink `mt-3 flex gap-4`

Deux h1 comme le HTML (welcome + heading). Ne pas fusionner.

- [ ] **Step 2: Vérifier**

Run: `pnpm --filter @portfolio/web dev` → ouvrir `/`

Expected: blobs, titre centré, placeholder portrait 4:5, bio, CTA, icônes. Comparer à `legacy/Portfolio Emma - Standalone.html` (vue Accueil).

- [ ] **Step 3: Commit**

```bash
git add apps/web/app/page.tsx
git commit -m "Recréer la page d'accueil à l'identique du HTML."
```

---

### Task 7: Page Compétences

**Files:**
- Create: `apps/web/app/competences/page.tsx`

**Interfaces:**
- Consumes: `skills` ; `Eyebrow`, `Heading`, `Container`, `SkillBand`

- [ ] **Step 1: Page**

```tsx
import { skills } from "@portfolio/content";
import { Container, Eyebrow, Heading, SkillBand } from "@portfolio/ui";

export default function CompetencesPage() {
  return (
    <section id="competences" className="pt-[120px]">
      <Container width="page" className="pb-10 pt-[60px]">
        <Eyebrow className="text-[14px]">01 — Savoir-faire</Eyebrow>
        <Heading as="h2">Mes compétences</Heading>
      </Container>
      {skills.map((skill, index) => (
        <SkillBand key={skill.num} {...skill} index={index} />
      ))}
    </section>
  );
}
```

- [ ] **Step 2: Vérifier**

Run: `/competences`

Expected: 5 bandes couleurs HTML, alignement L/R/L/R/L, nav « Mes compétences » en accent.

- [ ] **Step 3: Commit**

```bash
git add apps/web/app/competences/page.tsx
git commit -m "Recréer la page compétences en bandes alternées."
```

---

### Task 8: Page Réalisations + modal

**Files:**
- Create: `apps/web/app/realisations/realisations-view.tsx`
- Create: `apps/web/app/realisations/page.tsx`

**Interfaces:**
- Consumes: `projects`, `images` ; `Eyebrow`, `Heading`, `Body`, `Media`, `Tab`, `ProjectTile`, `ProjectModal`
- Produces: client view avec `tab: 'social' | 'print'` et `selectedId: string | null`

- [ ] **Step 1: Vue client**

`"use client"`. State `tab` défaut `'social'`, `selectedId` défaut `null`.

Filtre : `projects.filter((p) => tab === 'social' ? p.category === 'Réseaux sociaux' : p.category === 'Print')`.

Hero : `grid h-dvh box-border grid-cols-1 md:grid-cols-[1.1fr_0.9fr] items-center gap-16 bg-sand px-[6vw] pb-10 pt-[100px]`. Eyebrow `02 — Portfolio`. Heading h2 `text-[clamp(38px,6vw,68px)] mb-[22px]`. Body italic max-w `[480px]`. Media hero `images.realisationsHero`, label `Visuel de mise en avant`, aspect `4/5`, wrapper `max-h-[70vh] overflow-hidden rounded-[6px]`.

Sous le hero : `Container width="wide"` `py-[100px]`. Rangée tabs `flex gap-3.5 mb-12` : Tab « Réseaux sociaux » / « Print ».

Grille : `grid grid-cols-2 md:grid-cols-4 gap-1.5` (6px). Pour chaque projet visible : `ProjectTile` `src={images.projects[p.id]}` `fallbackLabel={`${p.category} — ${p.title}`}` `onClick={() => setSelectedId(p.id)}`.

`ProjectModal` : `project` = find par id ou null ; passer `src` et `fallbackLabel` dérivés comme ci-dessus ; `onClose={() => setSelectedId(null)}`.

- [ ] **Step 2: `page.tsx` serveur**

```tsx
import { RealisationsView } from "./realisations-view";

export default function RealisationsPage() {
  return <RealisationsView />;
}
```

- [ ] **Step 3: Vérifier**

Run: `/realisations`

Expected: hero sand, 10 tuiles social, switch Print → 10 autres, clic ouvre modal, overlay / Fermer / Escape ferment. Hover overlay titre.

- [ ] **Step 4: Commit**

```bash
git add apps/web/app/realisations
git commit -m "Recréer la page réalisations avec onglets et modal projet."
```

---

### Task 9: Page Intérêts

**Files:**
- Create: `apps/web/app/interets/page.tsx`

**Interfaces:**
- Consumes: `interests`, `images` ; `Eyebrow`, `Heading`, `Body`, `Media`, `InterestBand`

- [ ] **Step 1: Page**

Hero : `grid h-dvh box-border grid-cols-1 md:grid-cols-[0.9fr_1.1fr] items-center gap-16 px-[6vw] pb-10 pt-[100px]`. Media à gauche (`images.interetsHero`, « Visuel de mise en avant », 4/5, `max-h-[70vh] rounded-[6px]`). Droite : Eyebrow `03 — Inspirations`, Heading « Mes centres d'intérêt » clamp `38px/6vw/68px`, Body italic.

Puis `interests.map` → `InterestBand` avec `imgSrc={images.interests[item.imgKey]}` `imgLabel={item.label}`.

- [ ] **Step 2: Vérifier**

Run: `/interets`

Expected: hero inversé vs réalisations, 5 bandes, direction ltr/rtl qui inverse image/texte en desktop.

- [ ] **Step 3: Commit**

```bash
git add apps/web/app/interets/page.tsx
git commit -m "Recréer la page centres d'intérêt."
```

---

### Task 10: Contact + API Resend

**Files:**
- Create: `apps/web/lib/contact.ts`
- Create: `apps/web/app/api/contact/route.ts`
- Create: `apps/web/app/contact/contact-form.tsx`
- Create: `apps/web/app/contact/page.tsx`
- Create: `apps/web/.env.example`
- Modify: `.gitignore` (déjà `.env.local`)
- Modify: `apps/web/package.json` (dependency `resend`)
- Modify: `README.md` (créer s’il n’existe que le stub racine)

**Interfaces:**
- Consumes: `contact`, `social` ; `Eyebrow`, `Heading`, `TextField`, `Button`
- Produces:
  - `parseContactPayload(input: unknown): { ok: true, name: string, email: string, message: string } | { ok: false, errors: { name?: string, email?: string, message?: string } }`
  - `POST /api/contact` JSON `{ name, email, message }` → 200 `{ ok: true }` | 400 `{ ok: false, errors }` | 500 `{ ok: false }`

- [ ] **Step 1: Validation partagée**

`apps/web/lib/contact.ts` :

```ts
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type ContactFields = { name: string; email: string; message: string };
export type ContactErrors = Partial<ContactFields>;

export function parseContactPayload(input: unknown) {
  const errors: ContactErrors = {};
  if (!input || typeof input !== "object") {
    return { ok: false as const, errors: { name: "Ce champ est requis.", email: "Ce champ est requis.", message: "Ce champ est requis." } };
  }
  const rec = input as Record<string, unknown>;
  const name = typeof rec.name === "string" ? rec.name.trim() : "";
  const email = typeof rec.email === "string" ? rec.email.trim() : "";
  const message = typeof rec.message === "string" ? rec.message.trim() : "";
  if (!name) errors.name = "Ce champ est requis.";
  if (!email) errors.email = "Ce champ est requis.";
  else if (!EMAIL.test(email)) errors.email = "Entre un email valide.";
  if (!message) errors.message = "Ce champ est requis.";
  if (Object.keys(errors).length) return { ok: false as const, errors };
  return { ok: true as const, name, email, message };
}
```

- [ ] **Step 2: Route API**

`apps/web/app/api/contact/route.ts` :

```ts
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { parseContactPayload } from "@/lib/contact";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const parsed = parseContactPayload(body);
  if (!parsed.ok) {
    return NextResponse.json({ ok: false, errors: parsed.errors }, { status: 400 });
  }
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
  const resend = new Resend(key);
  const { error } = await resend.emails.send({
    from: "Portfolio Emma <beth.t@example.com>",
    to: "marques.alizee@hotmail.fr",
    replyTo: parsed.email,
    subject: `Portfolio — message de ${parsed.name}`,
    text: parsed.message,
  });
  if (error) {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
```

`apps/web/.env.example` :

```
RESEND_API_KEY=re_xxxxxxxx
```

`pnpm --filter @portfolio/web add resend`

- [ ] **Step 3: Formulaire client + page**

`contact-form.tsx` `"use client"`. State : `errors`, `formError`, `submitting`, `sent`.

Champs contrôlés ou FormData au submit. Empêcher le submit natif. POST `/api/contact` JSON. 200 → `setSent(true)`. 400 avec `errors` → les afficher via `TextField error=`. 500 / réseau → `formError = contact.error`, conserver les valeurs.

Bouton `Button variant="pill"` `type="submit"` disabled si submitting, children `contact.submitting` ou `contact.submit`. Classe pill contact HTML : `bg-accent text-ink hover:bg-blush mt-3 self-start px-8 py-3.5 text-[15px]` (le HTML contact pill est `color:#4A3B30` pas `text-bg`). Passer `className="bg-accent text-ink hover:bg-blush px-8 py-[14px] text-[15px]"` pour écraser le pill nav.

Si `sent` : `<p className="font-serif italic text-[20px] text-blush">{contact.success}</p>`.

`page.tsx` : `section#contact min-h-dvh bg-contact text-bg px-[6vw] pb-[100px] pt-[160px]`. `Container width="narrow"`. Eyebrow `text-accent` (HTML contact eyebrow `#C49D83`). Heading `text-bg`. Formulaire. Footer `mt-16 flex gap-7 border-t border-ink-soft pt-8` liens Instagram, LinkedIn, mailto — `text-[14px] font-medium text-blush no-underline hover:text-accent`.

- [ ] **Step 4: README**

Remplacer `README.md` racine :

```md
# Portfolio Emma

Monorepo pnpm + Turbo. Site Next.js dans `apps/web`.

## Démarrage

pnpm install
cp apps/web/.env.example apps/web/.env.local
# coller RESEND_API_KEY (https://resend.com)
pnpm dev

## Mail

Les messages du formulaire partent vers marques.alizee@hotmail.fr via Resend.
Tant qu'aucun domaine n'est vérifié, l'expéditeur est beth.t@example.com (peut atterrir en spam).
Pour un envoi fiable : vérifier un domaine dans Resend et remplacer \`from\` dans \`apps/web/app/api/contact/route.ts\`.

## Photos

Déposer les fichiers dans \`apps/web/public/images/\` puis renseigner les chemins dans \`packages/content/src/images.ts\` (aujourd'hui tous les src sont \`null\` → placeholders).
```

- [ ] **Step 5: Vérifier**

Run: `/contact` — submit vide → erreurs sous champs. Submit valide sans clé → message d’échec, champs conservés. Avec clé : mail reçu + phrase de succès.

- [ ] **Step 6: Commit**

```bash
git add apps/web/lib/contact.ts apps/web/app/api/contact apps/web/app/contact apps/web/.env.example apps/web/package.json pnpm-lock.yaml README.md
git commit -m "Ajouter la page contact et l'envoi Resend."
```

Ne jamais committer `.env.local`.

---

### Task 11: 404 + passe visuelle

**Files:**
- Create: `apps/web/app/not-found.tsx`

**Interfaces:**
- Consumes: `Button`, `Heading`, `Body`

- [ ] **Step 1: 404**

```tsx
import { Button, Heading, Body } from "@portfolio/ui";

export default function NotFound() {
  return (
    <section className="flex min-h-dvh flex-col items-center justify-center bg-bg px-[6vw] text-center">
      <Heading as="h1">Page introuvable</Heading>
      <Body className="mt-4" size="md">
        Cette page n'existe pas.
      </Body>
      <Button variant="pill" href="/" className="mt-8">
        Retour à l'accueil
      </Button>
    </section>
  );
}
```

- [ ] **Step 2: Passe visuelle obligatoire**

Run: `pnpm --filter @portfolio/web build` puis `pnpm --filter @portfolio/web dev`.

Ouvrir le HTML legacy à côté. Vérifier dans le navigateur :

1. `/` desktop — blobs, double titre, portrait placeholder, CTA, icônes
2. `/competences` — 5 bandes L/R
3. `/realisations` — hero, tabs, grille 4 col, modal
4. `/interets` — hero, 5 bandes direction
5. `/contact` — fond ink, form, footer liens
6. `/does-not-exist` — 404
7. Viewport ~375px — hamburger, pas de nav desktop, pas de scroll horizontal
8. Nav : scroll blur, lien actif accent, Contact pill

Corriger les écarts de spacing/typo dans les composants concernés (pas de « amélioration » de layout).

- [ ] **Step 3: Commit**

```bash
git add apps/web/app/not-found.tsx
git commit -m "Ajouter la 404 et caler le rendu sur le HTML legacy."
```

Si des fichiers UI/pages ont bougé pendant la passe, les inclure dans le même commit.

---

## Self-review (plan vs spec)

| Spec | Tâche |
|---|---|
| Monorepo apps/web + ui + content + config | 1, 2, 3 |
| 5 routes | 6–10 |
| Tokens / polices / selection | 1 |
| Mini-composants listés | 3, 4, 5 |
| images.ts src null | 2 |
| Media sans next/image si null | 3 |
| Hamburger + Escape + focus | 4 |
| Modal Escape + overlay | 5, 8 |
| Resend → marques.alizee@hotmail.fr | 10 |
| États form (envoi, erreurs, succès) | 10 |
| 404 | 11 |
| Pas de tests | toutes (aucun *.test.*) |
| README domaine Resend | 10 |
| Lien actif accent | 4 |
| Copy HTML | 2 |

Écarts assumés (déjà dans la spec) : hamburger, Escape, lien actif, labels sr-only, grille intérêts 1 col. mobile.
