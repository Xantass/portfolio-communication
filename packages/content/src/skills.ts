import type { Tone } from "./images";

export type Skill = { num: string; title: string; desc: string; tone: Tone };

export const skills: Skill[] = [
  {
    num: "01",
    title: "Montage vidéo",
    desc: "Passionnée de montage vidéo depuis plusieurs années, je maîtrise des logiciels tels que Premiere Pro, CapCut, Final Cut Pro et d'autres pour créer des contenus dynamiques et adaptés aux différents formats (réseaux sociaux, présentations, projets personnels).",
    tone: "blush",
  },
  {
    num: "02",
    title: "Communication et stratégie",
    desc: "Formée à la communication interne et externe à travers mes expériences en stages et alternances, je conçois des stratégies de communication adaptées aux enjeux et objectifs d'une organisation.",
    tone: "tile",
  },
  {
    num: "03",
    title: "Gestion de réseaux sociaux & identité visuelle",
    desc: "Actuellement en charge de la communication externe d'Intermarché de Chartres les 3 Ponts, je pilote le rythme éditorial et l'organisation des publications sur les réseaux sociaux, tout en veillant à la cohérence de l'identité visuelle de la marque.",
    tone: "sand",
  },
  {
    num: "04",
    title: "Développement éditorial",
    desc: "Je conçois des lignes éditoriales et des calendriers de contenu adaptés aux cibles et aux canaux, en m'appuyant sur une analyse fine des attentes des audiences pour développer une communication cohérente et engageante.",
    tone: "stone",
  },
  {
    num: "05",
    title: "Retouche photo",
    desc: "En parallèle de ma pratique du montage vidéo, je m'exerce également à la retouche photo à titre personnel, ce qui m'aide à affiner mon regard sur l'image et la composition visuelle.",
    tone: "wheat",
  },
];
