export type NavHref = "/" | "/competences" | "/realisations" | "/interets" | "/contact";
export type NavItem = { href: NavHref; label: string; variant: "ghost" | "pill" };

export const nav = {
  brand: "Alizée",
  items: [
    { href: "/", label: "Accueil", variant: "ghost" },
    { href: "/competences", label: "Mes compétences", variant: "ghost" },
    { href: "/realisations", label: "Mes réalisations", variant: "ghost" },
    { href: "/interets", label: "Centres d'intérêt", variant: "ghost" },
    { href: "/contact", label: "Contact", variant: "pill" },
  ] satisfies NavItem[],
};
