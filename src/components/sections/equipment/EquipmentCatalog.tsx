"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { FaAngleLeft, FaAngleRight, FaCheck, FaXmark } from "react-icons/fa6";
import { LuArrowUpRight, LuLayers } from "react-icons/lu";
import {
  StaggerGroup,
  StaggerItem,
} from "@/components/common/AnimationWrapper";
import { Button } from "@/components/common/Button";
import { TiltCard, TiltLayer } from "@/components/three/TiltCard";
import { EQUIPMENT_LIST, type EquipmentItem } from "@/constants/equipment";
import { ROUTES } from "@/constants/routes";
import { IMAGE_SIZES } from "@/utils/image";
import { cn } from "@/utils/cn";

const ITEMS_PER_PAGE = 12;
const ALL = "all";

type CategoryFilter = EquipmentItem["category"] | typeof ALL;

export function EquipmentCatalog() {
  const [category, setCategory] = useState<CategoryFilter>(ALL);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeModalItem, setActiveModalItem] = useState<EquipmentItem | null>(
    null,
  );
  const catalogRef = useRef<HTMLDivElement>(null);

  /** Filter chips derived from the data, so new categories appear automatically. */
  const categories = useMemo(() => {
    const seen = new Map<EquipmentItem["category"], string>();
    for (const item of EQUIPMENT_LIST) seen.set(item.category, item.categoryLabel);
    return [
      { id: ALL as CategoryFilter, label: "All Equipment", count: EQUIPMENT_LIST.length },
      ...Array.from(seen, ([id, label]) => ({
        id: id as CategoryFilter,
        label,
        count: EQUIPMENT_LIST.filter((item) => item.category === id).length,
      })),
    ];
  }, []);

  const filtered = useMemo(
    () =>
      category === ALL
        ? EQUIPMENT_LIST
        : EQUIPMENT_LIST.filter((item) => item.category === category),
    [category],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));

  useEffect(() => {
    if (!activeModalItem) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveModalItem(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeModalItem]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== currentPage) {
      setCurrentPage(newPage);
      catalogRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const selectCategory = (id: CategoryFilter) => {
    setCategory(id);
    setCurrentPage(1);
  };

  return (
    <div ref={catalogRef} className="w-full scroll-mt-28 space-y-12">
      {/* Category filter */}
      <div className="scrollbar-none -mx-4 overflow-x-auto px-4">
        <div
          role="tablist"
          aria-label="Filter equipment by category"
          className="glass mx-auto flex w-max items-center gap-1 rounded-full p-1.5"
        >
          {categories.map((cat) => {
            const selected = category === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => selectCategory(cat.id)}
                className={cn(
                  "relative rounded-full px-5 py-2.5 text-body-xs font-bold tracking-[0.1em] whitespace-nowrap uppercase transition-colors",
                  selected ? "text-white" : "text-mist/70 hover:text-white",
                )}
              >
                {selected ? (
                  <motion.span
                    layoutId="equipment-filter"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-linear-to-r from-brand to-brand-bright shadow-[0_8px_20px_-6px_rgb(255_45_45/0.7)]"
                  />
                ) : null}
                <span className="relative">
                  {cat.label}
                  <span className={cn("ml-2", selected ? "text-white/70" : "text-muted")}>
                    {cat.count}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <StaggerGroup
        key={`${category}-${currentPage}`}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        stagger={0.05}
      >
        {currentItems.map((item) => (
          <StaggerItem key={item.id} className="h-full">
            <TiltCard max={10} className="rounded-[1.5rem]">
              <article className="group preserve-3d relative flex h-full flex-col rounded-[1.5rem] border border-white/10 bg-linear-to-b from-ink-800/70 to-ink-950">
                <button
                  type="button"
                  onClick={() => setActiveModalItem(item)}
                  aria-label={`View specifications for ${item.title}`}
                  className="absolute inset-0 z-40 rounded-[inherit]"
                />

                <div className="relative m-2.5 aspect-4/3 overflow-hidden rounded-[1.1rem] bg-white">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes={IMAGE_SIZES.quarter}
                    className="object-contain p-3 transition-transform duration-[1.2s] ease-(--ease-out-expo) group-hover:scale-110"
                  />
                </div>

                <TiltLayer depth={50} className="absolute top-5 left-5">
                  <span className="rounded-full bg-ink-950/90 px-3 py-1 text-[0.65rem] font-bold tracking-widest text-brand-bright uppercase ring-1 ring-brand-bright/40">
                    {item.model}
                  </span>
                </TiltLayer>

                <TiltLayer depth={30} className="flex flex-1 flex-col gap-3 px-5 pt-3 pb-5">
                  <p className="text-[0.65rem] font-bold tracking-[0.2em] text-gold uppercase">
                    {item.brand} · {item.type}
                  </p>
                  <h3 className="line-clamp-2 text-[1.35rem] leading-[1.05] tracking-[0.03em] text-white transition-colors group-hover:text-brand-bright">
                    {item.title}
                  </h3>
                  <p className="line-clamp-2 text-body-xs leading-relaxed text-sand/75">
                    {item.description}
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-3 text-body-xs font-bold tracking-wider text-white uppercase">
                    <span>View Specs</span>
                    <span className="grid size-9 place-items-center rounded-full bg-white/5 ring-1 ring-white/10 transition-all duration-300 group-hover:rotate-45 group-hover:bg-brand-bright">
                      <LuArrowUpRight className="size-4" aria-hidden />
                    </span>
                  </div>
                </TiltLayer>
              </article>
            </TiltCard>
          </StaggerItem>
        ))}
      </StaggerGroup>

      {totalPages > 1 && (
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-body-sm text-sand">
            Showing{" "}
            <span className="font-bold text-white">{startIndex + 1}</span>–
            <span className="font-bold text-white">
              {Math.min(startIndex + ITEMS_PER_PAGE, filtered.length)}
            </span>{" "}
            of <span className="font-bold text-mist">{filtered.length}</span>{" "}
            machines
          </p>

          <div className="glass flex items-center gap-1 rounded-full p-1.5">
            <button
              type="button"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous page"
              className="grid size-10 place-items-center rounded-full text-mist transition-colors hover:bg-white/10 hover:text-white disabled:pointer-events-none disabled:opacity-30"
            >
              <FaAngleLeft className="size-3.5" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                type="button"
                onClick={() => handlePageChange(pageNum)}
                aria-current={currentPage === pageNum ? "page" : undefined}
                className={cn(
                  "grid size-10 place-items-center rounded-full text-body-sm font-bold transition-all duration-200",
                  currentPage === pageNum
                    ? "bg-linear-to-br from-brand to-brand-bright text-white shadow-[0_6px_16px_-4px_rgb(255_45_45/0.7)]"
                    : "text-mist hover:bg-white/10 hover:text-white",
                )}
              >
                {pageNum}
              </button>
            ))}

            <button
              type="button"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Next page"
              className="grid size-10 place-items-center rounded-full text-mist transition-colors hover:bg-white/10 hover:text-white disabled:pointer-events-none disabled:opacity-30"
            >
              <FaAngleRight className="size-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Equipment detail modal */}
      <AnimatePresence>
        {activeModalItem && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={() => setActiveModalItem(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-100 flex items-center justify-center bg-ink-950/85 p-4 backdrop-blur-xl [perspective:1400px]"
          >
            <motion.div
              onClick={(event) => event.stopPropagation()}
              initial={{ opacity: 0, rotateX: 18, y: 40, scale: 0.94 }}
              animate={{ opacity: 1, rotateX: 0, y: 0, scale: 1 }}
              exit={{ opacity: 0, rotateX: -12, y: 30, scale: 0.95 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="glass-strong scrollbar-slim relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[2rem] p-6 shadow-[0_40px_100px_-30px_rgb(255_45_45/0.4)] md:p-8"
            >
              <button
                type="button"
                onClick={() => setActiveModalItem(null)}
                aria-label="Close"
                className="absolute top-4 right-4 z-20 grid size-11 place-items-center rounded-full border border-white/10 bg-ink-950 text-mist transition-colors hover:border-brand-bright hover:bg-brand hover:text-white"
              >
                <FaXmark className="size-5" />
              </button>

              <div className="grid gap-8 md:grid-cols-12 md:items-start">
                <div className="relative aspect-square w-full overflow-hidden rounded-[1.5rem] bg-white md:col-span-5">
                  <Image
                    src={activeModalItem.image}
                    alt={activeModalItem.title}
                    fill
                    sizes={IMAGE_SIZES.half}
                    className="object-contain p-4"
                  />
                  <span className="absolute top-3 left-3 rounded-full bg-ink-950 px-3 py-1 text-[0.7rem] font-bold text-brand-bright uppercase">
                    {activeModalItem.model}
                  </span>
                </div>

                <div className="flex flex-col gap-5 md:col-span-7">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 text-body-xs">
                      <span className="rounded-full bg-brand/20 px-3 py-1 font-bold text-brand-bright uppercase">
                        {activeModalItem.brand}
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1 text-sand">
                        <LuLayers className="size-3" aria-hidden />
                        {activeModalItem.categoryLabel}
                      </span>
                      <span className="rounded-full bg-gold/10 px-3 py-1 text-gold">
                        {activeModalItem.type}
                      </span>
                    </div>
                    <h2
                      id="modal-title"
                      className="mt-4 text-[2rem] leading-none tracking-[0.03em] text-white"
                    >
                      {activeModalItem.title}
                    </h2>
                  </div>

                  <p className="text-body-sm leading-relaxed text-sand/90">
                    {activeModalItem.description}
                  </p>

                  {activeModalItem.features && (
                    <ul className="grid gap-2 sm:grid-cols-2">
                      {activeModalItem.features.map((feat) => (
                        <li
                          key={feat}
                          className="flex items-center gap-2.5 rounded-xl bg-white/5 px-3 py-2.5 text-body-xs font-semibold text-mist"
                        >
                          <span className="grid size-5 shrink-0 place-items-center rounded-full bg-linear-to-br from-brand to-brand-bright text-white">
                            <FaCheck className="size-2.5" />
                          </span>
                          {feat}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                    <Button href={ROUTES.contact} size="md" fullWidth>
                      Inquire For Training
                    </Button>
                    <Button
                      variant="outline"
                      size="md"
                      fullWidth
                      onClick={() => setActiveModalItem(null)}
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
