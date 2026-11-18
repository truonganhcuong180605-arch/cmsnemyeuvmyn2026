import { useMemo } from 'react';
import { motion } from 'motion/react';
import { ArrowDownRight, Heart } from 'lucide-react';
import { HERO_COUPLE_INSET, HERO_PORTRAIT_MAIN } from '../data/memories';

export function HeroSection() {
  const milestoneInfo = useMemo(() => {
    const birthDate = new Date(2005, 10, 19); // Nov 19, 2005
    const now = new Date();
    const diffDays = Math.max(
      1,
      Math.floor((now.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24)),
    );

    const isBirthdayToday = now.getMonth() === 10 && now.getDate() === 19;
    const currentYearBirthday = new Date(now.getFullYear(), 10, 19);
    const targetYear =
      now > currentYearBirthday && !isBirthdayToday
        ? now.getFullYear() + 1
        : now.getFullYear();
    const turningAge = targetYear - 2005;

    return {
      diffDays: diffDays.toLocaleString('vi-VN'),
      turningAge,
      isBirthdayToday,
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="top" className="relative z-10 mx-auto max-w-6xl px-6 pt-12 pb-16 md:pt-16 md:pb-24">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-stretch lg:gap-12">
        {/* Left Column: Editorial Typography */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col justify-between lg:col-span-6"
        >
          <div>
            <div className="flex flex-wrap items-center gap-3 text-xs font-medium tracking-wide text-amber-200/85">
              <span>19 · 11 · 2005</span>
              <span aria-hidden="true" className="text-white/25">
                /
              </span>
              <span>Vũ Mạc Yến Nhi</span>
              <span aria-hidden="true" className="text-white/25">
                /
              </span>
              <span>Từ Trương Anh Cường</span>
            </div>

            <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-[#FAF5F0] sm:text-5xl lg:text-6xl [text-wrap:balance]">
              Chúc Mừng Sinh Nhật
              <span className="mt-1 block italic font-medium text-rose-300">
                Ín Nhi Của Anh
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-[#CFC4BC]">
              {milestoneInfo.isBirthdayToday
                ? `Hôm nay là ngày 19 tháng 11 — ngày cô gái đặc biệt nhất thế giới của anh tròn ${milestoneInfo.turningAge} tuổi.`
                : `Chào đón ngày 19 tháng 11 thật rực rỡ — cột mốc tuổi ${milestoneInfo.turningAge} đầy dịu dàng của Vũ Mạc Yến Nhi.`}{' '}
              Trang nhỏ này được Trương Anh Cường cất công gom góp từng bức ảnh, từng thước phim đáng yêu nhất của hai đứa mình, để mỗi lần em mở ra đều thấy lòng thật ấm áp và lung linh.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => scrollToSection('gallery')}
              className="inline-flex items-center gap-2 rounded-lg bg-rose-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-rose-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-400 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Heart className="h-4 w-4 fill-current" />
              Ngắm Khoảnh Khắc
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('letter')}
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-medium text-[#FAF5F0] transition-colors hover:border-amber-200/40 hover:bg-white/[0.08] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-200 whitespace-nowrap shrink-0 cursor-pointer"
            >
              Đọc Thư Gửi Em
              <ArrowDownRight className="h-4 w-4 text-amber-200" />
            </button>
          </div>
        </motion.div>

        {/* Right Column: Luminous Editorial Portrait Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative lg:col-span-6"
        >
          <div className="relative h-[460px] w-full overflow-hidden rounded-2xl border border-amber-200/20 bg-[#14101A] shadow-[0_24px_80px_-24px_rgba(225,29,72,0.28)] sm:h-[540px] lg:h-full lg:min-h-[520px]">
            <img
              src={HERO_PORTRAIT_MAIN}
              alt="Vũ Mạc Yến Nhi trong tà áo dài hồng cùng hoa bách hợp"
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover object-top"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#09070C] via-[#09070C]/20 to-transparent" />

            {/* Delicate Floating Inset Couple Frame */}
            <div className="absolute right-4 bottom-4 flex items-end gap-4 sm:right-6 sm:bottom-6">
              <div className="hidden text-right sm:block">
                <p className="font-display text-xl italic text-[#FAF5F0]">
                  Vũ Mạc Yến Nhi
                </p>
                <p className="text-xs text-amber-200/90">
                  Sinh nhật 19 · 11 · 2005
                </p>
              </div>
              <div className="h-24 w-24 overflow-hidden rounded-xl border border-amber-200/40 bg-[#14101A] shadow-xl sm:h-28 sm:w-28">
                <img
                  src={HERO_COUPLE_INSET}
                  alt="Trương Anh Cường và Vũ Mạc Yến Nhi chụp cùng nhau"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Full-Width 4-Column Milestone Strip */}
      <div className="mt-14 grid grid-cols-2 gap-6 border-y border-white/10 py-7 md:grid-cols-4">
        <div>
          <p className="text-xs text-[#A39890]">Ngày Em Ra Đời</p>
          <p className="mt-1.5 font-display text-2xl font-semibold text-[#FAF5F0] tabular-nums sm:text-3xl">
            19.11.2005
          </p>
        </div>
        <div>
          <p className="text-xs text-[#A39890]">Tuổi Mới Ngọt Ngào</p>
          <p className="mt-1.5 font-display text-2xl font-semibold text-rose-300 tabular-nums sm:text-3xl">
            Tuổi {milestoneInfo.turningAge}
          </p>
        </div>
        <div>
          <p className="text-xs text-[#A39890]">Hành Trình Rực Rỡ</p>
          <p className="mt-1.5 font-display text-2xl font-semibold text-amber-200 tabular-nums sm:text-3xl">
            {milestoneInfo.diffDays} ngày
          </p>
        </div>
        <div>
          <p className="text-xs text-[#A39890]">Tình Cảm Của Anh</p>
          <p className="mt-1.5 font-display text-2xl font-semibold text-[#FAF5F0] sm:text-3xl">
            Mãi Bên Em
          </p>
        </div>
      </div>
    </section>
  );
}
