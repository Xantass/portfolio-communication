# Portfolio Emma — Design

Date : 2026-08-31  
Source : `legacy/Portfolio Emma - Standalone.html`  
Statut : validé en conversation, hors tests automatisés (demande explicite)

## Objectif

Recréer le portfolio d’Emma (communication / création visuelle) en **Next.js + Tailwind**, dans un **monorepo Turbo + pnpm**. Le design et la structure visuelle du HTML legacy sont la source de vérité. Les cinq vues deviennent cinq routes. Les composants sont des mini-unités réutilisables. Aucune suite de tests automatisés.

## Hors scope

- CMS, i18n, dark mode
- URLs Instagram / LinkedIn réelles (restent `#` jusqu’à fourniture)
- Photos réelles (fournies dans un second temps)
- Tests unitaires, E2E, visuels automatisés
- Refonte graphique, nouveau contenu, pages extra (mentions légales, blog)

## Décisions figées

| Sujet | Choix |
|---|---|
| Navigation | Routes Next.js : `/`, `/competences`, `/realisations`, `/interets`, `/contact` |
| Images | Dossier `public/images/` + `next/image` ; placeholder si fichier absent |
| Contact | Envoi réel via **Resend** vers `marques.alizee@hotmail.fr` |
| Mobile | Menu hamburger (desktop inchangé) |
| Architecture | `apps/web` + `packages/ui` + `packages/content` + `packages/config` |
| Tests | Aucun |

Le dossier `legacy/` reste en référence visuelle, non bundlé dans l’app.

## Architecture

```
apps/web                 Next.js App Router : pages, layout, API contact, assets
packages/ui              Mini-composants visuels (une responsabilité chacun)
packages/content         Données typées (copy, projets, compétences, intérêts)
packages/config          Tailwind, TypeScript, ESLint partagés
```

Outils racine : `pnpm-workspace.yaml`, `turbo.json`, `package.json` (scripts `dev`, `build`, `lint`).

Stack cible :

- Next.js (App Router, TypeScript)
- Tailwind CSS (tokens extraits du HTML, pas de hex brut dans les composants)
- Polices via `next/font` : **Cormorant Garamond** (titres) et **Manrope** (corps)
- Resend pour l’email

### Routes

| URL | Vue HTML équivalente |
|---|---|
| `/` | Accueil |
| `/competences` | Mes compétences |
| `/realisations` | Mes réalisations |
| `/interets` | Centres d’intérêt |
| `/contact` | Contact |

Le `layout` racine porte la nav fixe. Seul le contenu de page change. Pas de SPA `page` state comme dans le HTML.

## Design visuel (source de vérité)

Extraire les tokens du HTML, ne pas les réinventer.

| Token | Valeur | Usage |
|---|---|---|
| `bg` | `#F5EFE6` | Fond de page |
| `ink` | `#4A3B30` | Texte principal, logo |
| `ink-muted` | `#6b584a` / `#5c4c3f` | Corps secondaire |
| `accent` | `#C49D83` | CTA, hover, onglet actif, sélection |
| `accent-soft` | `#BDA18A` | Eyebrows, hover CTA, bordures tabs |
| `blush` | `#E8D5CC` | Blob accueil, skill 01, intérêt photo |
| `olive` | `#9E9F8D` | Blob accueil (opacity 0.2) |
| `band-*` | `#E8D5CC`, `#DACBB8`, `#EFE6D8`, `#D5CABC`, `#E3D9C6`, `#FFDFD1`, `#F3E7DA` | Bandes compétences / intérêts |
| `contact-bg` | `#4A3B30` | Page contact |
| `contact-line` | `#8a7462` | Soulignement des champs |
| `overlay` | `rgba(74,59,48,0.85)` | Overlay modal |
| `tile` | `#DACBB8` | Fond vignette projet vide |

Nav : `padding 22px 5vw`, z-index 100, `backdrop-filter: blur(10px)`, fond `transparent` puis `rgba(245,239,230,0.9)` après 40px de scroll.

Sélection texte : fond `#C49D83`, couleur `#F5EFE6`.

Animation `fadeUp` (opacity + translateY 24px, 0.3s) uniquement pour l’ouverture de la modal. Respecter `prefers-reduced-motion` (afficher sans animation).

## Composants (`packages/ui`)

Chaque fichier a une responsabilité. Les pages composent ; elles ne dupliquent pas les styles inline du HTML.

| Composant | Responsabilité | Props essentielles |
|---|---|---|
| `Button` | Actions. Variantes : `pill`, `ghost`, `underline`, `outline` | `variant`, `href?`, `onClick?`, `disabled?` |
| `Eyebrow` | Label uppercase letter-spacing terracotta | `children` |
| `Heading` | Titres Cormorant | `as`: h1–h3, `children` |
| `Body` | Texte Manrope | `size`: `sm` \| `md`, `italic?` |
| `Container` | Gutters `6vw` + max-width | `width`: `page` (1100) \| `wide` (1200) \| `narrow` (900) |
| `Media` | Image Next ou placeholder crème | `src`, `alt`, `fallbackLabel`, `aspectRatio` |
| `IconLink` | Instagram / LinkedIn SVG du HTML | `network`, `href` |
| `NavBar` | Barre fixe + hamburger `< md` | liens depuis `content` |
| `Tab` | Onglet filtre réalisations | `active`, `onClick` |
| `ProjectTile` | Vignette 1:1, overlay titre au hover | projet |
| `ProjectModal` | Overlay détail projet | projet \| null, `onClose` |
| `SkillBand` | Bande pleine largeur, alignement pair/impair | skill + index |
| `InterestBand` | Grille 2 col., `direction` ltr/rtl | interest |
| `TextField` | Input / textarea souligné | `as`, `error?` |
| `Blob` | Cercle décoratif accueil | `tone`: `blush` \| `olive`, `position` |

`NavBar` : desktop identique au HTML (liens ghost + CTA pill Contact). Sous breakpoint `md` : bouton hamburger, panneau plein écran ou tiroir, mêmes tokens. `Escape` + overlay ferment le menu ; focus piégé tant qu’il est ouvert. Lien actif : couleur accent (seul écart volontaire vs HTML, qui n’avait pas d’état actif de route).

`ProjectModal` : clic overlay, bouton Fermer, et `Escape` ferment. Clic intérieur : `stopPropagation`.

`Media` : si `src` est `null` / `undefined`, rendre le placeholder (fond crème, libellé centré, même aspect-ratio). Ne pas appeler `next/image` sans src. On ne détecte pas magiquement les fichiers absents dans `public/` : tant que les photos ne sont pas fournies, `images.ts` laisse les `src` à `null`. Quand une photo est déposée, on renseigne le chemin correspondant dans `images.ts`.

## Contenu (`packages/content`)

Copy recopié du HTML, typé. Pas de CMS.

Modules :

- `nav.ts` — items + label logo « Emma »
- `home.ts` — titres, bio, CTA
- `skills.ts` — 5 compétences (num, title, desc, bg, alignement)
- `projects.ts` — 10 social + 10 print (id `soc0`–`soc9`, `prt0`–`prt9`, category, title, description)
- `interests.ts` — 5 intérêts (label, desc, bg, imgId, direction)
- `contact.ts` — titres, placeholders champs, message succès, email affiché `contact@emma.fr`
- `social.ts` — href Instagram / LinkedIn = `#` jusqu’à fourniture
- `images.ts` — chemins attendus (voir ci-dessous)

Les pages importent ces modules. Aucun texte métier hardcodé dans `packages/ui`.

## Images

Convention, fichiers à déposer plus tard dans `apps/web/public/images/` :

| Clé | Chemin |
|---|---|
| Portrait accueil | `images/portrait.jpg` |
| Hero réalisations | `images/realisations-hero.jpg` |
| Hero intérêts | `images/interets-hero.jpg` |
| Projets | `images/projects/soc0.jpg` … `soc9.jpg`, `prt0.jpg` … `prt9.jpg` |
| Intérêts bandes | `images/interests/photo.jpg`, `dance.jpg`, `lecture.jpg`, `travel.jpg`, `concert.jpg` |

Jusqu’à dépôt : tous les `src` dans `images.ts` valent `null` → placeholders. Après dépôt, on pointe chaque clé vers le chemin réel (jpg/webp/png). Extension non imposée, seule la clé compte.

## Pages — structure visuelle

Reprendre le HTML section par section, sans réordonner ni ajouter de blocs.

**Accueil (`/`)** — viewport ~100vh, blobs, titre centré « Bienvenue sur mon portfolio », grille portrait 4:5 + bloc « Qui suis-je ? », CTA underline vers `/realisations`, icônes sociales.

**Compétences (`/competences`)** — header « 01 — Savoir-faire » + h2, puis 5 `SkillBand` (min-height 46vh, justify/text alternés).

**Réalisations (`/realisations`)** — hero 100vh split texte / image (`#EFE6D8`), puis tabs Social/Print, grille 4 colonnes gap 6px, clic → modal. State client pour tab + `selectedId`. Pas d’URL par projet.

**Intérêts (`/interets`)** — hero split image / texte, puis 5 `InterestBand` (min-height 70vh, direction ltr/rtl).

**Contact (`/contact`)** — fond `#4A3B30`, texte crème, formulaire max-width 560px, footer liens Instagram / LinkedIn / `mailto:contact@emma.fr`.

**404** — même fond / typo, lien vers `/`.

## Flux contact

1. Client POST JSON `{ name, email, message }` vers `POST /api/contact`.
2. Validation serveur : trois champs non vides, email au format valide.
3. Resend envoie vers `marques.alizee@hotmail.fr` (nom, email reply-to, corps du message).
4. Succès HTTP 200 → le formulaire est remplacé par : « Merci pour ton message — je reviens vite vers toi ✨ »
5. `RESEND_API_KEY` dans `apps/web/.env.local` (gitignoré). Exemple dans `.env.example`.

États UI :

- Envoi : bouton disabled, libellé « Envoi… »
- Erreur champ : message sous le champ
- Erreur réseau / Resend / clé absente : message sous le formulaire, saisie conservée, nouvel essai possible
- Pas de toast

Expéditeur Resend : utiliser le domaine de test Resend (`beth.t@example.com`) tant qu’aucun domaine n’est vérifié. Documenter le passage à un domaine custom dans le README.

## Erreurs (reste de l’app)

- Image manquante → placeholder, jamais une page blanche
- Route inconnue → 404 branded
- Modal / hamburger : Escape obligatoire

## Tests

Aucun fichier de test, aucun script `test`, pas de Vitest/Playwright. La vérification se fait en lançant `pnpm dev` et en comparant visuellement chaque route au HTML legacy (desktop + mobile hamburger).

`lint` TypeScript/ESLint reste un script Turbo de qualité de code, ce n’est pas une suite de tests.

## Qualité de code

- TypeScript strict
- Mini-composants : une responsabilité, props explicites, pas de styles magiques dupliqués
- Accessibilité minimale alignée sur le HTML + ajouts listés : labels de champs visibles (placeholders du HTML conservés **et** `aria-label` ou `<label>` sr-only pour ne pas changer le look), `aria-label` sur icônes, focus visible, `prefers-reduced-motion`

## Risques

- Le HTML est un bundle Claude (`x-dc` / `image-slot`) : le recréer pixel-près demande de coller les spacing/clamp du HTML, pas de « nettoyer » le layout.
- Nav desktop-only dans le source : le hamburger est un ajout ; ne pas modifier le desktop.
- Resend sans domaine vérifié : les mails peuvent arriver en spam jusqu’à configuration du compte.
- `next/image` sans fichier : `Media` n’est appelé avec un `src` que lorsque le chemin est renseigné dans `images.ts`.
)