import { cn } from "./cn";
import { toneBg, type Tone } from "./tones";
import { Heading } from "./heading";
import { Body } from "./body";

export function SkillBand({
  num,
  title,
  desc,
  tone,
  index,
}: {
  num: string;
  title: string;
  desc: string;
  tone: Tone;
  index: number;
}) {
  const end = index % 2 === 1;
  return (
    <div className={cn(toneBg[tone], "flex min-h-[46vh] items-center", end ? "justify-end text-right" : "justify-start text-left")}>
      <div className="max-w-[680px] px-[6vw] py-[60px]">
        <span className="font-serif text-[20px] font-semibold text-ink opacity-50">{num}</span>
        <Heading as="h3" className="mb-5 mt-3.5">
          {title}
        </Heading>
        <Body size="md">{desc}</Body>
      </div>
    </div>
  );
}
