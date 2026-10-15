import { Marquee } from "@/components/common/Marquee";
import { SERVICES_LIST } from "@/constants/site";

const TAGLINES = [
  "Strength",
  "Discipline",
  "Ladies Floor",
  "Steam & Sauna",
  "Expert Trainers",
  "4K Soundproof",
  "Free InBody",
] as const;

/** Two crossing, tilted ticker bands between the hero and the services. */
export function HomeMarquee() {
  return (
    <section
      aria-label="Highlights"
      className="relative z-10 overflow-hidden bg-ink-950 py-12"
    >
      <div className="-rotate-2 bg-linear-to-r from-brand via-brand-bright to-brand py-4 shadow-[0_20px_60px_-15px_rgb(255_45_45/0.6)]">
        <Marquee
          items={TAGLINES}
          className="font-display text-[2rem] tracking-[0.05em] text-white uppercase sm:text-[2.75rem]"
          separator={<span className="text-gold">✦</span>}
        />
      </div>
      <div className="-mt-5 rotate-2 sm:mt-[-3.25rem] border-y border-white/10 bg-ink-900/90 py-3 backdrop-blur-md">
        <Marquee
          reverse
          items={SERVICES_LIST.map((s) => s.title)}
          className="font-display text-[1.5rem] tracking-[0.06em] text-white/50 uppercase"
          separator={<span className="text-brand-bright">●</span>}
        />
      </div>
    </section>
  );
}
