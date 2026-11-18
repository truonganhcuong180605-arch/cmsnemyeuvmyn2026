import { useState } from 'react';
import { Maximize2, Play, X } from 'lucide-react';
import { VIDEO_MEMORIES, type VideoMemory } from '../data/memories';

export function VideoReel() {
  const [activeVideo, setActiveVideo] = useState<VideoMemory | null>(null);

  return (
    <section
      id="videos"
      className="relative z-10 mx-auto max-w-6xl border-t border-white/10 px-6 py-16 md:py-24"
    >
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-medium text-amber-200/85">
            Thước Phim Sống Động · 04 Video Kỷ Niệm
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-[#FAF5F0] sm:text-4xl [text-wrap:balance]">
            Những Đoạn Phim Nhỏ Của Đôi Ta
          </h2>
        </div>
        <p className="max-w-md text-sm leading-relaxed text-[#BEB3AB]">
          Bấm phát để nghe lại tiếng cười nói rôm rả, những buổi đi ăn ngọt lịm và khoảnh khắc nhí nhố bên nhau.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
        {VIDEO_MEMORIES.map((video, idx) => (
          <article
            key={video.id}
            className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#120E17]"
          >
            <div className="relative flex aspect-video w-full items-center justify-center bg-[#07050A]">
              <video
                src={video.src}
                controls
                playsInline
                preload="metadata"
                className="h-full w-full object-contain"
              />
            </div>

            <div className="flex flex-1 flex-col justify-between gap-4 p-5 sm:p-6">
              <div>
                <div className="flex items-center gap-2 text-xs text-amber-200/85">
                  <span className="tabular-nums">
                    Thước phim {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums">{video.durationLabel}</span>
                </div>
                <h3 className="mt-1.5 font-display text-2xl font-semibold text-[#FAF5F0]">
                  {video.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[#C8BEB6]">
                  {video.subtitle}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-white/10 pt-4">
                <span className="inline-flex items-center gap-1.5 text-xs text-[#A39890]">
                  <Play className="h-3.5 w-3.5 text-rose-300" />
                  Bấm trực tiếp trên khung hình để xem
                </span>
                <button
                  type="button"
                  onClick={() => setActiveVideo(video)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-[#FAF5F0] transition-colors hover:bg-white/[0.1] whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Maximize2 className="h-3.5 w-3.5" />
                  Rạp Phim
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Theater Modal */}
      {activeVideo && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeVideo.title}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 p-4 backdrop-blur-md sm:p-8"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#120E17]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5">
              <div>
                <h3 className="font-display text-xl font-semibold text-[#FAF5F0]">
                  {activeVideo.title}
                </h3>
              </div>
              <button
                type="button"
                aria-label="Đóng video"
                onClick={() => setActiveVideo(null)}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-[#FAF5F0] transition-colors hover:bg-white/10 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex flex-1 items-center justify-center bg-black p-2 sm:p-4">
              <video
                src={activeVideo.src}
                controls
                autoPlay
                playsInline
                className="max-h-[72vh] w-full rounded-lg object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
