export type ProjectCategory = "Réseaux sociaux" | "Print";
export type Project = {
  id: string;
  category: ProjectCategory;
  title: string;
  description: string;
  src: string;
  pdf?: string;
};

export const projects: Project[] = [
  {
    id: "soc-horaires",
    category: "Réseaux sociaux",
    title: "14 juillet — horaires Intermarché",
    description: "Visuel de communication interne et réseaux pour annoncer les horaires exceptionnels des Intermarché Mainvilliers et Chartres Les 3 Ponts, le jour de la fête nationale.",
    src: "/images/projects/social/horaires.png",
  },
  {
    id: "soc-delices",
    category: "Réseaux sociaux",
    title: "Délices & Planches — identité visuelle",
    description: "Création graphique pour Délices & Planches : un visuel de marque pensé pour le feed, dans une charte chaleureuse et gourmande.",
    src: "/images/projects/social/delices-planches.png",
  },
  {
    id: "soc-ecoupon",
    category: "Réseaux sociaux",
    title: "E-coupon",
    description: "Visuel promotionnel pour un e-coupon, conçu pour être lu en un coup d’œil sur mobile et déclinable en story.",
    src: "/images/projects/social/e-coupon.png",
  },
  {
    id: "soc-saviez",
    category: "Réseaux sociaux",
    title: "Le saviez-vous ? — conservation des tomates",
    description: "Infographie pédagogique Intermarché : un conseil produit mis en scène pour l’engagement du feed, avec photo et encadré lisible.",
    src: "/images/projects/social/le-saviez-vous.png",
  },
  {
    id: "soc-plateau",
    category: "Réseaux sociaux",
    title: "Plateau fruits de mer",
    description: "Mise en avant produit pour un plateau de fruits de mer — lumière, cadrage et hiérarchie visuelle pensés pour le scroll.",
    src: "/images/projects/social/plateau-fruits-de-mer.png",
  },
  {
    id: "soc-publication",
    category: "Réseaux sociaux",
    title: "Publication Délices & Planches",
    description: "Post de publication pour Délices & Planches, aligné sur l’identité de la marque et le rythme du calendrier éditorial.",
    src: "/images/projects/social/publication-dp.png",
  },
  {
    id: "soc-promotions",
    category: "Réseaux sociaux",
    title: "Reel — promotions",
    description: "Montage vertical d’un reel promotions : rythme, texte à l’écran et format pensé pour la rétention en stories et reels.",
    src: "/images/projects/social/promotions.mp4",
  },
  {
    id: "soc-noel",
    category: "Réseaux sociaux",
    title: "Reel de Noël",
    description: "Reel saisonnier de Noël — montage dynamique pour porter l’ambiance des fêtes sur les réseaux.",
    src: "/images/projects/social/reel-noel.mp4",
  },
  {
    id: "soc-resolutions",
    category: "Réseaux sociaux",
    title: "Reel — résolutions",
    description: "Reel de début d’année autour des résolutions, pensé pour le format vertical et le ton de marque.",
    src: "/images/projects/social/resolutions.mp4",
  },
  {
    id: "prt-voeux",
    category: "Print",
    title: "Carte de vœux",
    description: "Création d’une carte de vœux imprimée — composition, typographie et déclinaison pour le format papier.",
    src: "/images/projects/print/previews/bonne-annee.png",
    pdf: "/images/projects/print/bonne-annee.pdf",
  },
  {
    id: "prt-maryland",
    category: "Print",
    title: "Menu de Noël — Le Maryland",
    description: "Affiche / menu de Noël pour le restaurant Le Maryland : illustration, hiérarchie des plats et atmosphère festive.",
    src: "/images/projects/print/previews/affiche-maryland.png",
    pdf: "/images/projects/print/affiche-maryland.pdf",
  },
  {
    id: "prt-newsletter",
    category: "Print",
    title: "Newsletter août 2026",
    description: "Mise en page d’une newsletter print — rythme de lecture, visuels et informations du mois d’août.",
    src: "/images/projects/print/previews/newsletter-aout-2026.png",
    pdf: "/images/projects/print/newsletter-aout-2026.pdf",
  },
  {
    id: "prt-olac",
    category: "Print",
    title: "Brochure O’Lac — Guinguette de Luisant",
    description: "Brochure trois volets pour O’Lac : ton convivial, mise en page des activités et univers graphique teal / orange.",
    src: "/images/projects/print/previews/proposition.png",
    pdf: "/images/projects/print/proposition.pdf",
  },
  {
    id: "prt-flyer",
    category: "Print",
    title: "Flyer Délices & Planches",
    description: "Flyer print Délices & Planches, déclinaison de l’identité visuelle sur un support à emporter.",
    src: "/images/projects/print/previews/flyer-delices-planches.png",
    pdf: "/images/projects/print/flyer-delices-planches.pdf",
  },
  {
    id: "prt-drive",
    category: "Print",
    title: "Code promo drive",
    description: "Support print pour une opération code promo drive — offre lisible, charte respectée, impact immédiat.",
    src: "/images/projects/print/previews/code-promo-drive.png",
    pdf: "/images/projects/print/code-promo-drive.pdf",
  },
  {
    id: "prt-publireportage",
    category: "Print",
    title: "Publireportage",
    description: "Publireportage : direction artistique et mise en page d’un contenu éditorial imprimé.",
    src: "/images/projects/print/publireportage.jpg",
  },
  {
    id: "prt-sparkling",
    category: "Print",
    title: "Flyer Sparkling Communication",
    description: "Flyer d’identité — ligne graphique noir, blanc et or, services et contacts mis en scène.",
    src: "/images/projects/print/previews/document-1.png",
    pdf: "/images/projects/print/document-1.pdf",
  },
];
