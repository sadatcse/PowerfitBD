"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { FaAngleLeft, FaAngleRight, FaCheck, FaXmark } from "react-icons/fa6";
import {
  StaggerGroup,
  StaggerItem,
} from "@/components/common/AnimationWrapper";
import { Button } from "@/components/common/Button";
import { EQUIPMENT_LIST, type EquipmentItem } from "@/constants/equipment";
import { ROUTES } from "@/constants/routes";
import { IMAGE_SIZES } from "@/utils/image";
import { cn } from "@/utils/cn";

const ITEMS_PER_PAGE = 12;

export function EquipmentCatalog() {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeModalItem, setActiveModalItem] = useState<EquipmentItem | null>(
    null,
  );
  const catalogRef = useRef<HTMLDivElement>(null);

  const totalPages = Math.ceil(EQUIPMENT_LIST.length / ITEMS_PER_PAGE);

  useEffect(() => {
    if (!activeModalItem) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveModalItem(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeModalItem]);

  // Paginated equipment items (12 items per page: 4 cols x 3 rows)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = EQUIPMENT_LIST.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== currentPage) {
      setCurrentPage(newPage);
      if (catalogRef.current) {
        catalogRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  };

  return (
    <div ref={catalogRef} className="w-full scroll-mt-24 space-y-10">
      {/* 4x3 Equipment Cards Grid (12 items per page) */}
      <StaggerGroup
        key={currentPage}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        {currentItems.map((item) => (
          <StaggerItem key={item.id}>
            <article
              onClick={() => setActiveModalItem(item)}
              className="group relative flex h-full cursor-pointer flex-col overflow-hidden border border-line bg-ink-950 transition-all duration-300 hover:border-brand/70 hover:shadow-xl hover:shadow-brand/10"
            >
              {/* Machine Image Frame */}
              <div className="relative aspect-4/3 w-full overflow-hidden bg-ink-900">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes={IMAGE_SIZES.quarter}
                  className="object-cover object-center transition-transform duration-700 ease-(--ease-out-expo) group-hover:scale-108"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-linear-to-t from-ink-950 via-ink-950/20 to-transparent"
                />

                {/* Model Tag */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="border border-brand/40 bg-ink-950/90 px-2.5 py-1 text-[11px] font-bold tracking-widest text-brand-bright uppercase backdrop-blur-xs">
                    {item.model}
                  </span>
                </div>

                {/* Type Tag */}
                <div className="absolute top-3 right-3 z-10">
                  <span className="border border-line bg-ink-900/90 px-2 py-0.5 text-[10px] font-medium text-sand backdrop-blur-xs">
                    {item.type}
                  </span>
                </div>
              </div>

              {/* Content Details */}
              <div className="flex flex-1 flex-col gap-3 p-5">
                <h3 className="line-clamp-2 font-display text-display-4 text-white transition-colors group-hover:text-brand-bright">
                  {item.title}
                </h3>

                <p className="line-clamp-3 text-body-xs leading-relaxed text-sand">
                  {item.description}
                </p>

                {/* Action CTA */}
                <div className="mt-auto flex items-center justify-between border-t border-line/60 pt-3 text-body-xs font-bold text-brand-bright group-hover:text-white">
                  <span>View Specifications</span>
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </div>
            </article>
          </StaggerItem>
        ))}
      </StaggerGroup>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex flex-col items-center justify-between gap-4 border-t border-line pt-8 sm:flex-row">
          <p className="text-body-sm text-sand">
            Showing{" "}
            <span className="font-bold text-white">{startIndex + 1}</span>–
            <span className="font-bold text-white">
              {Math.min(startIndex + ITEMS_PER_PAGE, EQUIPMENT_LIST.length)}
            </span>{" "}
            of{" "}
            <span className="font-bold text-mist">{EQUIPMENT_LIST.length}</span>{" "}
            Total Equipment
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous Page"
              className="inline-flex items-center gap-1.5 border border-line bg-ink-950 px-4 py-2 text-body-xs font-bold tracking-wider text-mist uppercase transition-colors hover:border-brand hover:text-white disabled:pointer-events-none disabled:opacity-40"
            >
              <FaAngleLeft className="size-3.5" />
              <span>Previous</span>
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNum) => (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => handlePageChange(pageNum)}
                  aria-current={currentPage === pageNum ? "page" : undefined}
                  className={cn(
                    "grid size-10 place-items-center border text-body-sm font-bold transition-all duration-200",
                    currentPage === pageNum
                      ? "border-brand bg-brand text-white shadow-md shadow-brand/20"
                      : "border-line bg-ink-950 text-mist hover:border-brand/40 hover:text-white",
                  )}
                >
                  {pageNum}
                </button>
              ),
            )}

            <button
              type="button"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Next Page"
              className="inline-flex items-center gap-1.5 border border-line bg-ink-950 px-4 py-2 text-body-xs font-bold tracking-wider text-mist uppercase transition-colors hover:border-brand hover:text-white disabled:pointer-events-none disabled:opacity-40"
            >
              <span>Next</span>
              <FaAngleRight className="size-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Equipment Detail Modal */}
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
            className="fixed inset-0 z-100 flex items-center justify-center bg-ink-950/85 p-4 backdrop-blur-md"
          >
            <motion.div
              onClick={(event) => event.stopPropagation()}
              initial={{ opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative scrollbar-slim max-h-[90vh] w-full max-w-3xl overflow-hidden overflow-y-auto border border-brand/50 bg-ink-900 p-6 shadow-2xl shadow-brand/10 md:p-8"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveModalItem(null)}
                className="absolute top-4 right-4 z-20 grid size-10 place-items-center border border-line bg-ink-950 text-mist transition-colors hover:border-brand hover:text-white"
              >
                <FaXmark className="size-5" />
              </button>

              <div className="grid gap-6 md:grid-cols-12 md:items-start">
                {/* Left Column — Machine Image */}
                <div className="relative aspect-4/3 w-full overflow-hidden border border-line bg-ink-950 md:col-span-5">
                  <Image
                    src={activeModalItem.image}
                    alt={activeModalItem.title}
                    fill
                    sizes={IMAGE_SIZES.half}
                    className="object-cover object-center"
                  />
                  <span className="absolute top-3 left-3 border border-brand/40 bg-ink-900 px-2.5 py-1 text-[11px] font-bold text-brand-bright uppercase">
                    {activeModalItem.model}
                  </span>
                </div>

                {/* Right Column — Information */}
                <div className="flex flex-col gap-4 md:col-span-7">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 text-body-xs text-muted">
                      <span className="font-bold text-brand-bright uppercase">
                        {activeModalItem.brand}
                      </span>
                      <span>•</span>
                      <span>{activeModalItem.categoryLabel}</span>
                      <span>•</span>
                      <span className="border border-line bg-ink-950 px-2 py-0.5 text-sand">
                        {activeModalItem.type}
                      </span>
                    </div>
                    <h2
                      id="modal-title"
                      className="mt-2 text-display-3 text-white"
                    >
                      {activeModalItem.title}
                    </h2>
                  </div>

                  <div className="border-t border-line/60 pt-3">
                    <h3 className="text-body-xs font-bold tracking-wider text-mist uppercase">
                      Product Overview & Specifications
                    </h3>
                    <p className="mt-2 text-body-sm leading-relaxed text-sand">
                      {activeModalItem.description}
                    </p>
                  </div>

                  {activeModalItem.features && (
                    <div className="border-t border-line/60 pt-3">
                      <h3 className="mb-2 text-body-xs font-bold tracking-wider text-mist uppercase">
                        Key Highlights & Features
                      </h3>
                      <ul className="grid gap-2 sm:grid-cols-2">
                        {activeModalItem.features.map((feat) => (
                          <li
                            key={feat}
                            className="flex items-center gap-2 text-body-xs text-sand"
                          >
                            <span className="grid size-4 shrink-0 place-items-center rounded-full bg-brand/20 text-brand-bright">
                              <FaCheck className="size-2.5" />
                            </span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="mt-4 flex flex-col gap-3 border-t border-line pt-4 sm:flex-row">
                    <Button
                      href={ROUTES.contact}
                      size="md"
                      className="w-full justify-center"
                    >
                      Inquire For Training
                    </Button>

                    <Button
                      variant="outline"
                      size="md"
                      onClick={() => setActiveModalItem(null)}
                      className="w-full justify-center"
                    >
                      Close Window
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
