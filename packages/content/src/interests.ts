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
