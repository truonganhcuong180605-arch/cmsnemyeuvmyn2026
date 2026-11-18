import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import {
  PHOTO_MEMORIES,
  type MemoryCategory,
  type PhotoMemory,
} from '../data/memories';

const FILTER_TABS: Array<{ id: MemoryCategory; label: string }> = [
  { id: 'all', label: 'Tất Cả' },
  { id: 'couple', label: 'Đôi Mình' },
  { id: 'muse', label: 'Nàng Thơ' },
  { id: 'photobooth', label: 'Photobooth' },
];

export function MemoryGallery() {
  const [filter, setFilter] = useState<MemoryCategory>('all');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const visiblePhotos =
    filter === 'all'
      ? PHOTO_MEMORIES
      : PHOTO_MEMORIES.filter((item) => item.category === filter);

  useEffect(() => {
    if (activeIndex === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveIndex(null);
      } else if (e.key === 'ArrowRight') {
        setActiveIndex((prev) =>
          prev === null ? null : (prev + 1) % visiblePhotos.length,
        );
      } else if (e.key === 'ArrowLeft') {
        setActiveIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + visiblePhotos.length) % visiblePhotos.length,
        );
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeIndex, visiblePhotos.length]);

  const activePhoto: PhotoMemory | null =
    activeIndex !== null ? visiblePhotos[activeIndex] ?? null : null;

  return (
    <section
      id="gallery"
      className="relative z-10 mx-auto max-w-6xl border-t border-white/10 px-6 py-16 md:py-24"
    >
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-medium text-amber-200/85">
            Bộ Sưu Tập Kỷ Niệm · {PHOTO_MEMORIES.length} Khung Hình
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-[#FAF5F0] sm:text-4xl [text-wrap:balance]">
            Khoảnh Khắc Đẹp Nhất Của Chúng Mình
          </h2>
        </div>

        {/* Interactive Category Segmented Control */}
        <div
          role="tablist"
          aria-label="Lọc ảnh kỷ niệm"
          className="flex flex-wrap items-center gap-1 rounded-xl border border-white/10 bg-[#120E17] p-1 self-start md:self-auto"
        >
          {FILTER_TABS.map((tab) => {
            const isActive = filter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => {
                  setFilter(tab.id);
                  setActiveIndex(null);
                }}
                className={`rounded-lg px-3.5 py-2 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-rose-600 text-white'
                    : 'text-[#C8BEB6] hover:text-[#FAF5F0]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bento / Editorial Photo Grid */}
      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visiblePhotos.map((photo, index) => {
          const isLeadCard = filter === 'all' && index === 0;
          return (
            <button
              key={photo.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-[#130F18] text-left transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-400 cursor-pointer ${
                isLeadCard
                  ? 'sm:col-span-2 lg:col-span-2 aspect-[16/10]'
                  : 'aspect-[4/5]'
              }`}
            >
              <img
                src={photo.src}
                alt={photo.title}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#09070C]/90 via-[#09070C]/25 to-transparent" />

              <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-[#09070C]/65 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <Expand className="h-4 w-4" />
              </div>

              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="text-xs text-amber-200/85">{photo.dateLabel}</p>
                <h3 className="mt-1 font-display text-xl font-semibold text-[#FAF5F0]">
                  {photo.title}
                </h3>
                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-[#D4C9C0]">
                  {photo.caption}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {activePhoto && activeIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activePhoto.title}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 p-4 backdrop-blur-md sm:p-8"
          onClick={() => setActiveIndex(null)}
        >
          <div
            className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#120E17]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5">
              <div className="flex items-center gap-3 text-xs text-[#C8BEB6]">
                <span className="tabular-nums text-amber-200">
                  {String(activeIndex + 1).padStart(2, '0')} /{' '}
                  {String(visiblePhotos.length).padStart(2, '0')}
                </span>
                <span aria-hidden="true">·</span>
                <span>{activePhoto.dateLabel}</span>
              </div>
              <button
                type="button"
                aria-label="Đóng ảnh"
                onClick={() => setActiveIndex(null)}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-[#FAF5F0] transition-colors hover:bg-white/10 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="relative flex flex-1 items-center justify-center bg-[#09070C] p-3 sm:p-6">
              <img
                src={activePhoto.src}
                alt={activePhoto.title}
                referrerPolicy="no-referrer"
                className="max-h-[65vh] w-auto rounded-lg object-contain"
              />

              <button
                type="button"
                aria-label="Ảnh trước"
                onClick={() =>
                  setActiveIndex(
                    (activeIndex - 1 + visiblePhotos.length) %
                      visiblePhotos.length,
                  )
                }
                className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-[#09070C]/80 text-white transition-colors hover:bg-rose-600 cursor-pointer"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                type="button"
                aria-label="Ảnh tiếp theo"
                onClick={() =>
                  setActiveIndex((activeIndex + 1) % visiblePhotos.length)
                }
                className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-[#09070C]/80 text-white transition-colors hover:bg-rose-600 cursor-pointer"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            <div className="border-t border-white/10 px-6 py-4">
              <h3 className="font-display text-2xl font-semibold text-[#FAF5F0]">
                {activePhoto.title}
              </h3>
              <p className="mt-1 text-sm text-[#CFC4BC]">
                {activePhoto.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
