import Image from "next/image";
import { LuQuote } from "react-icons/lu";
import { Container } from "@/components/common/Container";
import {
  AnimationWrapper,
  StaggerGroup,
  StaggerItem,
} from "@/components/common/AnimationWrapper";
import { GlowBackdrop } from "@/components/common/GlowBackdrop";
import { TiltCard, TiltLayer } from "@/components/three/TiltCard";
import { Accent, SectionTitle } from "@/components/title/SectionTitle";
import { LEADERSHIP_MESSAGES } from "@/constants/site";
import { IMAGE_SIZES } from "@/utils/image";
import { cn } from "@/utils/cn";

/** Executive Leadership Messages (Managing Director & Director). */
export function LeadershipSection() {
  return (
    <section className="relative isolate overflow-hidden bg-ink-900 py-20 md:py-28 lg:py-36">
      <GlowBackdrop className="-z-10" grid variant="center" />
      <Container flush>
        <AnimationWrapper>
          <SectionTitle
            eyebrow="Executive Leadership"
            title={
              <>
                Messages From <Accent>Our Leadership</Accent>
              </>
            }
            description="Guiding Multi Gym Premium PowerFit with a commitment to excellence, discipline, and a transformative fitness experience."
            align="center"
            className="mx-auto"
          />
        </AnimationWrapper>

        <StaggerGroup className="mt-14 flex flex-col gap-10 lg:mt-20 lg:gap-14">
          {LEADERSHIP_MESSAGES.map((leader, index) => {
            const reversed = index % 2 === 1;
            return (
              <StaggerItem key={leader.id}>
                <article className="glass relative grid items-center gap-10 overflow-hidden rounded-[2rem] p-6 md:p-10 lg:grid-cols-12 lg:gap-14 lg:p-12">
                  <div
                    aria-hidden
                    className={cn(
                      "absolute top-0 size-96 rounded-full bg-brand/15 blur-[100px]",
                      reversed ? "-right-32" : "-left-32",
                    )}
                  />

                  {/* Portrait */}
                  <div className={cn("relative lg:col-span-4", reversed && "lg:order-2")}>
                    <TiltCard max={12} className="rounded-[1.5rem]">
                      <div className="preserve-3d relative aspect-4/5 w-full">
                        <div className="absolute inset-0 overflow-hidden rounded-[1.5rem] border border-white/10">
                          <Image
                            src={leader.image}
                            alt={leader.name}
                            fill
                            sizes={IMAGE_SIZES.third}
                            className="object-cover"
                          />
                          <div aria-hidden className="absolute inset-0 bg-linear-to-t from-ink-950/90 via-transparent to-transparent" />
                        </div>
                        <TiltLayer depth={70} className="absolute bottom-5 left-5">
                          <span className="rounded-full bg-linear-to-r from-brand to-brand-bright px-4 py-2 text-body-xs font-bold tracking-[0.15em] text-white uppercase shadow-[0_10px_30px_-5px_rgb(255_45_45/0.8)]">
                            {leader.badge}
                          </span>
                        </TiltLayer>
                      </div>
                    </TiltCard>
                  </div>

                  {/* Message */}
                  <div className={cn("relative flex flex-col gap-6 lg:col-span-8", reversed && "lg:order-1")}>
                    <div>
                      <span className="eyebrow text-brand-bright">{leader.role}</span>
                      <h3 className="mt-2 text-[2.5rem] leading-none tracking-[0.02em] text-white lg:text-[3.25rem]">
                        {leader.name}
                      </h3>
                    </div>

                    <blockquote className="relative rounded-2xl border border-white/10 bg-linear-to-br from-brand/20 to-transparent p-6">
                      <LuQuote className="absolute -top-4 left-6 size-9 rounded-full bg-brand-bright p-2 text-white" aria-hidden />
                      <p className="font-display text-[1.6rem] leading-tight tracking-[0.02em] text-white">
                        &ldquo;{leader.quote}&rdquo;
                      </p>
                    </blockquote>

                    <div className="flex flex-col gap-3 text-body-sm leading-relaxed text-sand/85">
                      {leader.paragraphs.map((para, i) => (
                        <p key={i}>{para}</p>
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
