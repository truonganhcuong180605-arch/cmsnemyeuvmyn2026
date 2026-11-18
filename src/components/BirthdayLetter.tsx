import { useState } from 'react';
import { motion } from 'motion/react';
import { Flame, Sparkles, RotateCcw } from 'lucide-react';
import { BIRTHDAY_WISHES } from '../data/memories';

interface BirthdayLetterProps {
  onCandleBlown: (blown: boolean) => void;
}

export function BirthdayLetter({ onCandleBlown }: BirthdayLetterProps) {
  const [candleBlown, setCandleBlown] = useState(false);

  const handleToggleCandle = () => {
    const next = !candleBlown;
    setCandleBlown(next);
    onCandleBlown(next);
  };

  return (
    <section
      id="letter"
      className="relative z-10 mx-auto max-w-6xl px-6 py-16 md:py-24"
    >
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
        {/* Interactive Birthday Cake / Candle Experience */}
        <div className="rounded-2xl border border-white/10 bg-[#120E17]/90 p-7 sm:p-9 lg:col-span-5">
          <p className="text-xs font-medium text-amber-200/85">
            Nghi Thức Sinh Nhật · 19 · 11
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-[#FAF5F0] [text-wrap:balance]">
            Thổi Nến &amp; Ước Nguyện Tuổi 21
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#BEB3AB]">
            Nhắm mắt lại, nghĩ về một điều em mong muốn nhất trong năm mới, rồi bấm vào nút bên dưới để thổi tắt ngọn nến cùng anh nhé.
          </p>

          {/* Minimal Luminous Cake Illustration */}
          <div className="my-8 flex flex-col items-center justify-center rounded-xl border border-white/[0.06] bg-[#0B080F] py-10">
            <div className="relative flex flex-col items-center">
              {/* Flame */}
              <div className="h-10 flex items-end justify-center">
                {!candleBlown ? (
                  <motion.div
                    animate={{
                      scale: [1, 1.12, 0.96, 1.08, 1],
                      rotate: [-2, 3, -1, 2, 0],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 2.1,
                      ease: 'easeInOut',
                    }}
                    className="relative flex items-center justify-center"
                  >
                    <div className="absolute -inset-4 rounded-full bg-amber-400/25 blur-lg" />
                    <div className="h-7 w-4 rounded-full bg-gradient-to-t from-rose-500 via-amber-300 to-white shadow-[0_0_24px_rgba(251,191,36,0.9)]" />
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: -6 }}
                    className="flex items-center gap-1.5 text-xs font-medium text-amber-200"
                  >
                    <Sparkles className="h-4 w-4 text-rose-300" />
                    <span>Điều ước đã bay lên trời</span>
                  </motion.div>
                )}
              </div>

              {/* Candle */}
              <div className="mt-1 h-12 w-3 rounded-t-sm bg-gradient-to-b from-rose-200 to-rose-400 shadow-inner" />

              {/* Cake Top Layer */}
              <div className="h-8 w-36 rounded-t-xl border-b border-rose-300/25 bg-gradient-to-r from-[#2D1B2A] via-[#3D2235] to-[#2D1B2A]" />
              {/* Cake Base Layer */}
              <div className="h-10 w-48 rounded-t-lg rounded-b-md border-t border-amber-200/20 bg-gradient-to-r from-[#211520] via-[#2F1D2C] to-[#211520]" />
              {/* Plate */}
              <div className="h-2 w-56 rounded-full bg-white/15" />
            </div>

            <p className="mt-5 font-display text-lg italic text-amber-100">
              {candleBlown
                ? 'Chúc mừng sinh nhật Vũ Mạc Yến Nhi!'
                : 'Ngọn nến tuổi 21 đang cháy sáng'}
            </p>
          </div>

          <button
            type="button"
            onClick={handleToggleCandle}
            className={`flex w-full items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-colors cursor-pointer ${
              candleBlown
                ? 'border border-white/15 bg-white/[0.05] text-[#FAF5F0] hover:bg-white/[0.1]'
                : 'bg-rose-600 text-white hover:bg-rose-500'
            }`}
          >
            {candleBlown ? (
              <>
                <RotateCcw className="h-4 w-4" />
                Thắp Lại Nến Sinh Nhật
              </>
            ) : (
              <>
                <Flame className="h-4 w-4" />
                Thổi Nến &amp; Gửi Điều Ước
              </>
            )}
          </button>
        </div>

        {/* Heartfelt Love Letter & 3 Wishes */}
        <div className="lg:col-span-7">
          <p className="text-xs font-medium text-rose-300">
            Thư Tay Gửi Em · Trương Anh Cường
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-[#FAF5F0] sm:text-4xl [text-wrap:balance]">
            Gửi Ín Nhi — Cô Gái Tháng Mười Một Của Anh
          </h2>

          <div className="mt-6 space-y-4 text-base leading-relaxed text-[#D8CEC6]">
            <p>
              Ín Nhi thương yêu của anh, vậy là cô bé sinh ngày 19/11/2005 của anh lại thêm một tuổi mới thật xinh đẹp rồi. Nhìn lại từng bức ảnh hai đứa đi ăn bingsu, ngồi cạnh nhau trên giảng đường, hay những lần chui vào buồng photobooth đội tai cáo tai mèo cười tít mắt, anh thấy mình thật may mắn vì có em đồng hành.
            </p>
            <p>
              Cảm ơn em vì sự dịu dàng, vì những cái tựa vai lúc mệt mỏi, và cả những biểu cảm tinh nghịch chỉ mình anh được thấy. Tuổi mới chúc em luôn rạng rỡ, an nhiên, đạt được mọi điều em mong ước — và nhớ là dù thế nào cũng luôn có Trương Anh Cường ở ngay bên cạnh em.
            </p>
          </div>

          <div className="mt-10 space-y-6 border-t border-white/10 pt-8">
            {BIRTHDAY_WISHES.map((wish) => (
              <div
                key={wish.number}
                className="grid grid-cols-1 gap-2 sm:grid-cols-12 sm:gap-6"
              >
                <div className="sm:col-span-4">
                  <span className="font-display text-sm font-medium text-amber-200/80 tabular-nums">
                    {wish.number}.
                  </span>{' '}
                  <h3 className="inline font-display text-xl font-semibold text-[#FAF5F0]">
                    {wish.title}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-[#BEB3AB] sm:col-span-8">
                  {wish.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
