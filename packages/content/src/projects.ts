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
