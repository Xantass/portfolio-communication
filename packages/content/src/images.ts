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
  portrait: "/images/portrait.png" as ImageSrc,
  realisationsHero: "/images/realisations-hero.jpg" as ImageSrc,
  interetsHero: "/images/interests/travel.jpeg" as ImageSrc,
  interests: {
    photo: "/images/interets-hero.jpeg",
    dance: "/images/interests/dance.jpeg",
    lecture: "/images/interests/lecture.jpeg",
    travel: "/images/interests/photo.jpeg",
    concert: "/images/interests/concert.jpeg",
  } as Record<"photo" | "dance" | "lecture" | "travel" | "concert", ImageSrc>,
};
