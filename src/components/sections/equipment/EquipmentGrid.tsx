import Image from "next/image";
import {
  StaggerGroup,
  StaggerItem,
} from "@/components/common/AnimationWrapper";
import { IMAGE_SIZES } from "@/utils/image";
import { cn } from "@/utils/cn";

interface EquipmentCategory {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  items: readonly string[];
  span: "wide" | "regular";
}

const CATEGORIES: readonly EquipmentCategory[] = [
  {
    id: "free-weights",
    eyebrow: "Strength",
    title: "Free Weights & Racks",
    description:
      "Olympic platforms, power racks, and a full dumbbell range from 2.5kg to 60kg for serious strength work.",
    image: "/images/services/strength-lab.jpg",
    items: ["Power racks", "Olympic platforms", "Dumbbells to 60kg", "Kettlebells"],
    span: "wide",
  },
  {
    id: "cardio",
    eyebrow: "Endurance",
    title: "Cardio & Conditioning",
    description:
      "Technogym-grade treadmills, bikes, and rowers with full performance telemetry.",
    image: "/images/services/cardio-evolution.jpg",
    items: ["Treadmills", "Assault bikes", "Rowing ergs", "Stair climbers"],
    span: "regular",
  },
  {
    id: "functional",
    eyebrow: "Athletic",
    title: "Functional Training",
    description:
      "Sleds, battle ropes, plyo boxes, and a full turf lane for athletic conditioning.",
    image: "/images/services/group-training.jpg",
    items: ["Turf sled lane", "Battle ropes", "Plyo boxes", "Suspension trainers"],
    span: "regular",
  },
  {
    id: "recovery",
    eyebrow: "Restore",
    title: "Recovery & Wellness",
    description:
      "Cryotherapy, percussion therapy, and a dedicated stretch zone to keep you training pain-free.",
    image: "/images/services/personal-coaching.jpg",
    items: ["Cryotherapy", "Percussion guns", "Stretch zone", "Sauna"],
    span: "wide",
  },
];

/** Equipment category bento grid (Figma 12:1026). */
export function EquipmentGrid() {
  return (
    <StaggerGroup className="grid gap-6 md:grid-cols-6">
      {CATEGORIES.map((category) => (
        <StaggerItem
          key={category.id}
          className={cn(
            "md:col-span-3",
            category.span === "wide" ? "lg:col-span-4" : "lg:col-span-2",
          )}
        >
          <article className="group relative flex h-full min-h-[22rem] flex-col justify-end overflow-hidden border border-line">
            <Image
              src={category.image}
              alt=""
              fill
              sizes={IMAGE_SIZES.half}
              className="object-cover transition-transform duration-700 ease-(--ease-out-expo) group-hover:scale-105"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-linear-to-t from-ink-950 via-ink-950/80 to-ink-950/20"
            />

            <div className="relative z-10 flex flex-col gap-3 p-6 lg:p-8">
              <p className="eyebrow text-brand">{category.eyebrow}</p>
              <h3 className="text-display-3 text-white">{category.title}</h3>
              <p className="max-w-md text-body-sm text-sand">
                {category.description}
              </p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <li
                    key={item}
                    className="border border-line/80 bg-ink-950/60 px-3 py-1 text-body-xs font-bold tracking-[0.05em] text-mist uppercase"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}
