import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Check, Heart, Sparkles, X } from 'lucide-react';
import { KISS_REVEAL_PHOTO } from '../data/memories';

interface LoveQuizProps {
  onAnsweredYes: () => void;
}

export function LoveQuiz({ onAnsweredYes }: LoveQuizProps) {
  const arenaRef = useRef<HTMLDivElement | null>(null);
  const yesBtnRef = useRef<HTMLButtonElement | null>(null);
  const noBtnRef = useRef<HTMLButtonElement | null>(null);

  const [noOffset, setNoOffset] = useState<{ x: number; y: number } | null>(null);
  const [dodgeCount, setDodgeCount] = useState(0);
  const [answeredYes, setAnsweredYes] = useState(false);
  const [showKissModal, setShowKissModal] = useState(false);
  const [lastDodgeTime, setLastDodgeTime] = useState(0);

  const dodgeNoButton = useCallback(
    (pointerClientX?: number, pointerClientY?: number) => {
      const now = Date.now();
      if (now - lastDodgeTime < 75) return;

      const arena = arenaRef.current;
      const noBtn = noBtnRef.current;
      if (!arena || !noBtn) return;

      const arenaRect = arena.getBoundingClientRect();
      const noRect = noBtn.getBoundingClientRect();
      const yesRect = yesBtnRef.current?.getBoundingClientRect();

      const padding = 16;
      const maxLeft = Math.max(padding, arenaRect.width - noRect.width - padding);
      const maxTop = Math.max(padding, arenaRect.height - noRect.height - padding);

      let bestX = padding;
      let bestY = padding;
      let bestScore = -Infinity;

      for (let i = 0; i < 24; i++) {
        const candidateX = padding + Math.random() * Math.max(1, maxLeft - padding);
        const candidateY = padding + Math.random() * Math.max(1, maxTop - padding);

        const candidateCenterX = arenaRect.left + candidateX + noRect.width / 2;
        const candidateCenterY = arenaRect.top + candidateY + noRect.height / 2;

        // Keep far from cursor
        let cursorDist = 200;
        if (pointerClientX !== undefined && pointerClientY !== undefined) {
          cursorDist = Math.hypot(
            candidateCenterX - pointerClientX,
            candidateCenterY - pointerClientY,
          );
        }

        // Avoid overlapping the "Có chứ" button
        let yesDist = 200;
        if (yesRect) {
          const yesCenterX = yesRect.left + yesRect.width / 2;
          const yesCenterY = yesRect.top + yesRect.height / 2;
          yesDist = Math.hypot(
            candidateCenterX - yesCenterX,
            candidateCenterY - yesCenterY,
          );
        }

        const overlapsYes = yesDist < 125;
        const score = (overlapsYes ? -1000 : 0) + Math.min(cursorDist, 260) + Math.random() * 35;

        if (score > bestScore) {
          bestScore = score;
          bestX = candidateX;
          bestY = candidateY;
        }
      }

      setNoOffset({ x: bestX, y: bestY });
      setDodgeCount((c) => c + 1);
      setLastDodgeTime(now);
    },
    [lastDodgeTime],
  );

  // Proximity detection inside the quiz arena so the "Không" button flees before the pointer even touches it
  const handleArenaPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (answeredYes) return;
    const noBtn = noBtnRef.current;
    if (!noBtn) return;

    const rect = noBtn.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);

    if (dist < 88) {
      dodgeNoButton(e.clientX, e.clientY);
    }
  };

  useEffect(() => {
    if (!showKissModal) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowKissModal(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [showKissModal]);

  const handleSelectYes = () => {
    setAnsweredYes(true);
    setShowKissModal(true);
    onAnsweredYes();
  };

  const getTeasingHint = () => {
    if (dodgeCount === 0) return 'Hãy chọn đáp án thật lòng nhất của Ín Nhi nhé.';
    if (dodgeCount <= 2) return 'Ơ kìa, sao đáp án "Không" cứ tự né đi đâu mất rồi?';
    if (dodgeCount <= 5) return 'Đáp án "Không" không cho bấm đâu nha, thử tích "Có chứ" xem điều gì xảy ra!';
    return 'Cố bắt cũng không bấm được nút "Không" đâu, chỉ có thể chọn "Có chứ" thôi!';
  };

  return (
    <section
      id="love-quiz"
      className="relative z-10 mx-auto max-w-6xl border-t border-white/10 px-6 py-16 md:py-24"
    >
      <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl border border-amber-200/20 bg-gradient-to-b from-[#16101D] to-[#0E0A13] p-6 shadow-[0_28px_90px_-30px_rgba(225,29,72,0.35)] sm:p-10">
        <div className="text-center">
          <p className="text-xs font-medium text-amber-200/85">
            Câu Hỏi Trắc Nghiệm Cuối Trang · Dành Riêng Cho Vũ Mạc Yến Nhi
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-[#FAF5F0] sm:text-5xl [text-wrap:balance]">
            Ín Nhi ơi, em có yêu anh không?
          </h2>
          <p className="mt-3 text-sm text-[#C8BEB6]">{getTeasingHint()}</p>
        </div>

        {/* Bounded Interactive Quiz Arena */}
        <div
          ref={arenaRef}
          onPointerMove={handleArenaPointerMove}
          className="relative mt-8 flex min-h-[240px] w-full flex-col items-center justify-center rounded-2xl border border-white/10 bg-[#09070C]/80 p-6 sm:min-h-[260px]"
        >
          <div className="flex flex-wrap items-center justify-center gap-6">
            {/* Option A: "Có chứ" */}
            <button
              ref={yesBtnRef}
              type="button"
              onClick={handleSelectYes}
              className={`group relative inline-flex min-w-[170px] items-center justify-center gap-3 rounded-xl border px-7 py-4 text-base font-semibold transition-all duration-200 cursor-pointer ${
                answeredYes
                  ? 'border-rose-400 bg-rose-600 text-white shadow-[0_0_32px_rgba(225,29,72,0.55)]'
                  : 'border-rose-400/50 bg-rose-600/90 text-white hover:scale-[1.04] hover:bg-rose-500 hover:shadow-[0_0_28px_rgba(225,29,72,0.45)]'
              }`}
            >
              <span
                aria-hidden="true"
                className={`flex h-5 w-5 items-center justify-center rounded border ${
                  answeredYes
                    ? 'border-white bg-white text-rose-600'
                    : 'border-white/70 bg-white/10 text-transparent group-hover:border-white'
                }`}
              >
                <Check className="h-3.5 w-3.5 stroke-[3]" />
              </span>
              <span>Có chứ</span>
            </button>

            {/* Placeholder spacer when "Không" switches to fleeing position */}
            {noOffset && !answeredYes && (
              <div aria-hidden="true" className="h-[58px] w-[170px]" />
            )}

            {/* Option B: "Không" — dodges mouse & refuses click */}
            {!answeredYes && (
              <button
                ref={noBtnRef}
                type="button"
                tabIndex={-1}
                aria-disabled="true"
                onMouseEnter={(e) => dodgeNoButton(e.clientX, e.clientY)}
                onMouseMove={(e) => dodgeNoButton(e.clientX, e.clientY)}
                onMouseDown={(e) => {
                  e.preventDefault();
                  dodgeNoButton(e.clientX, e.clientY);
                }}
                onTouchStart={(e) => {
                  e.preventDefault();
                  const touch = e.touches[0];
                  dodgeNoButton(touch?.clientX, touch?.clientY);
                }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  dodgeNoButton(e.clientX, e.clientY);
                }}
                style={
                  noOffset
                    ? {
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        transform: `translate3d(${noOffset.x}px, ${noOffset.y}px, 0)`,
                        transition: 'transform 150ms cubic-bezier(0.16, 1, 0.3, 1)',
                      }
                    : undefined
                }
                className="inline-flex min-w-[170px] select-none items-center justify-center gap-3 rounded-xl border border-white/15 bg-[#1B1523] px-7 py-4 text-base font-medium text-[#D0C6BE] shadow-lg"
              >
                <span
                  aria-hidden="true"
                  className="flex h-5 w-5 items-center justify-center rounded border border-white/30 bg-white/5"
                />
                <span>Không</span>
              </button>
            )}
          </div>

          {/* Inline Unlocked Reveal Card after answering "Có chứ" */}
          {answeredYes && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-8 flex flex-col items-center text-center"
            >
              <div className="overflow-hidden rounded-2xl border border-rose-300/35 bg-[#140E1A] p-2 shadow-2xl">
                <img
                  src={KISS_REVEAL_PHOTO}
                  alt="Trương Anh Cường hôn má Vũ Mạc Yến Nhi ngọt ngào"
                  referrerPolicy="no-referrer"
                  className="max-h-[340px] w-auto rounded-xl object-cover"
                />
              </div>
              <p className="mt-4 font-display text-2xl font-semibold text-rose-200">
                Anh biết ngay mà — Yêu Ín Nhi nhất trên đời!
              </p>
              <button
                type="button"
                onClick={() => setShowKissModal(true)}
                className="mt-3 inline-flex items-center gap-2 rounded-lg border border-rose-300/30 bg-rose-500/15 px-4 py-2 text-xs font-medium text-rose-200 transition-colors hover:bg-rose-500/25 cursor-pointer"
              >
                <Sparkles className="h-3.5 w-3.5" />
                Phóng To Khoảnh Khắc Này
              </button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Celebratory Pop-up Modal with Kissing Photo when "Có chứ" is checked */}
      {showKissModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Khoảnh khắc ngọt ngào của Cường và Nhi"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md sm:p-6"
          onClick={() => setShowKissModal(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.86, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-rose-300/35 bg-[#140E1A] shadow-[0_32px_100px_-16px_rgba(225,29,72,0.55)]"
          >
            <button
              type="button"
              aria-label="Đóng thông báo"
              onClick={() => setShowKissModal(false)}
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white transition-colors hover:bg-rose-600 cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative bg-[#09070C]">
              <img
                src={KISS_REVEAL_PHOTO}
                alt="Trương Anh Cường hôn má Vũ Mạc Yến Nhi"
                referrerPolicy="no-referrer"
                className="max-h-[60vh] w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#140E1A] to-transparent" />
            </div>

            <div className="px-6 pb-7 pt-3 text-center sm:px-8">
              <div className="inline-flex items-center gap-2 text-xs font-medium text-rose-300">
                <Heart className="h-3.5 w-3.5 fill-current" />
                <span>Trương Anh Cường · Vũ Mạc Yến Nhi</span>
                <Heart className="h-3.5 w-3.5 fill-current" />
              </div>

              <h3 className="mt-2 font-display text-3xl font-semibold text-[#FAF5F0]">
                Anh Cũng Yêu Ín Nhi Rất Nhiều!
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#CFC4BC]">
                Chúc mừng sinh nhật tuổi mới thật hạnh phúc nhé cô gái 19/11/2005. Cảm ơn em đã chọn &ldquo;Có chứ&rdquo; — phần thưởng là một cái thơm má thật kêu và vô vàn yêu thương từ anh!
              </p>

              <button
                type="button"
                onClick={() => setShowKissModal(false)}
                className="mt-6 rounded-lg bg-rose-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-rose-500 cursor-pointer"
              >
                Lưu Giữ Khoảnh Khắc Này
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
