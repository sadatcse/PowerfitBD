import Image from "next/image";
import { Container } from "@/components/common/Container";
import { SectionTitle } from "@/components/title/SectionTitle";
import {
  StaggerGroup,
  StaggerItem,
} from "@/components/common/AnimationWrapper";
import { LEADERSHIP_MESSAGES } from "@/constants/site";
import { IMAGE_SIZES } from "@/utils/image";
import { LuQuote } from "react-icons/lu";

/** Executive Leadership Messages section (Managing Director & Director). */
export function LeadershipSection() {
  return (
    <section className="bg-ink-950 py-16 md:py-24 lg:py-[7.5rem]">
      <Container>
        <SectionTitle
          eyebrow="Executive Leadership"
          title="Messages From Our Leadership"
          description="Guiding Multi Gym Premium PowerFit with a commitment to excellence, discipline, and transformative fitness experience."
          align="center"
          withRule
          className="mx-auto"
        />

        <StaggerGroup className="mt-12 flex flex-col gap-12 lg:mt-16 lg:gap-16">
          {LEADERSHIP_MESSAGES.map((leader, index) => {
            const isEven = index % 2 === 0;
            return (
              <StaggerItem key={leader.id}>
                <article className="group grid items-center gap-8 border border-line bg-ink-900 p-6 md:p-10 lg:grid-cols-12 lg:gap-12">
                  {/* Photo Column */}
                  <div
                    className={`relative aspect-4/5 w-full overflow-hidden border border-line/80 lg:col-span-4 ${
                      isEven ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <Image
                      src={leader.image}
                      alt={leader.name}
                      fill
                      sizes={IMAGE_SIZES.third}
                      className="object-cover transition-transform duration-700 ease-(--ease-out-expo) group-hover:scale-105"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-linear-to-t from-ink-950/80 via-transparent to-transparent"
                    />
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                      <span className="bg-brand px-3 py-1 text-body-xs font-bold tracking-[0.15em] text-white uppercase">
                        {leader.badge}
                      </span>
                    </div>
                  </div>

                  {/* Message Column */}
                  <div
                    className={`flex flex-col gap-5 lg:col-span-8 ${
                      isEven ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    <div>
                      <span className="eyebrow text-brand">{leader.role}</span>
                      <h3 className="mt-1 text-display-2 text-white">{leader.name}</h3>
                    </div>

                    {/* Featured Quote */}
                    <div className="relative border-l-2 border-brand bg-ink-950 p-4 italic text-sand">
                      <LuQuote className="absolute top-2 right-3 size-6 text-brand/20" />
                      <p className="relative z-10 text-body-sm font-semibold text-white">
                        &ldquo;{leader.quote}&rdquo;
                      </p>
                    </div>

                    {/* Paragraphs */}
                    <div className="flex flex-col gap-3 text-body-sm text-sand">
                      {leader.paragraphs.map((para, i) => (
                        <p key={i} className="leading-relaxed">
                          {para}
                        </p>
                      ))}
                    </div>
                  </div>
                </article>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </Container>
    </section>
  );
}
