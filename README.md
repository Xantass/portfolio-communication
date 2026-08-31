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
Pour un envoi fiable : vérifier un domaine dans Resend et remplacer `from` dans `apps/web/app/api/contact/route.ts`.

## Photos

Déposer les fichiers dans `apps/web/public/images/` puis renseigner les chemins dans `packages/content/src/images.ts` (aujourd'hui tous les src sont `null` → placeholders).
