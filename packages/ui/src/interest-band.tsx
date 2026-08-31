import { toneBg, type Tone } from "./tones";
import { Heading } from "./heading";
import { Body } from "./body";
import { Media } from "./media";

export function InterestBand({
  label,
  desc,
  tone,
  imgSrc,
  imgLabel,
  direction,
}: {
  label: string;
  desc: string;
  tone: Tone;
  imgSrc: string | null;
  imgLabel: string;
  direction: "ltr" | "rtl";
}) {
  return (
    <div className={`${toneBg[tone]} flex min-h-[70vh] items-center`}>
      <div
        className="mx-auto grid w-full max-w-[1100px] grid-cols-1 items-center gap-16 px-[6vw] py-[60px] md:grid-cols-2"
        style={{ direction }}
      >
        <div style={{ direction: "ltr" }}>
          <Heading as="h3" className="mb-5 text-[clamp(28px,4vw,40px)]">
            {label}
          </Heading>
          <Body size="md" className="max-w-[440px]">
            {desc}
          </Body>
        </div>
        <div className="overflow-hidden rounded-lg" style={{ direction: "ltr" }}>
          <Media src={imgSrc} alt={label} fallbackLabel={imgLabel} aspectRatio="4/3" />
        </div>
      </div>
    </div>
  );
}
