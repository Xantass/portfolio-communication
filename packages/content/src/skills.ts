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
