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
