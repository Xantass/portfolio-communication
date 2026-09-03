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
