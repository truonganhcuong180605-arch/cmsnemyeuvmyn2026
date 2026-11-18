import { useState } from 'react';
import { SparkleCanvas } from './components/SparkleCanvas';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { BirthdayLetter } from './components/BirthdayLetter';
import { MemoryGallery } from './components/MemoryGallery';
import { VideoReel } from './components/VideoReel';
import { LoveQuiz } from './components/LoveQuiz';

export default function App() {
  const [sparkleBoost, setSparkleBoost] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#09070C] text-[#FAF5F0]">
      <SparkleCanvas intensified={sparkleBoost} />

      <Header />

      <main>
        <HeroSection />

        {/* Subtle Editorial Marquee Ribbon Divider */}
        <div
          aria-hidden="true"
          className="relative z-10 overflow-hidden border-y border-white/[0.08] bg-[#100C15]/80 py-3"
        >
          <div className="animate-marquee flex w-max items-center gap-8 whitespace-nowrap text-xs font-medium tracking-widest text-amber-200/70">
            <span>VŨ MẠC YẾN NHI · 19.11.2005</span>
            <span>·</span>
            <span>TRƯƠNG ANH CƯỜNG</span>
            <span>·</span>
            <span>CHÚC MỪNG SINH NHẬT ÍN NHI</span>
            <span>·</span>
            <span>MÃI YÊU THƯƠNG</span>
            <span>·</span>
            <span>VŨ MẠC YẾN NHI · 19.11.2005</span>
            <span>·</span>
            <span>TRƯƠNG ANH CƯỜNG</span>
            <span>·</span>
            <span>CHÚC MỪNG SINH NHẬT ÍN NHI</span>
            <span>·</span>
            <span>MÃI YÊU THƯƠNG</span>
            <span>·</span>
          </div>
        </div>

        <BirthdayLetter onCandleBlown={(blown) => setSparkleBoost(blown)} />

        <MemoryGallery />

        <VideoReel />

        <LoveQuiz onAnsweredYes={() => setSparkleBoost(true)} />
      </main>

      <footer className="relative z-10 border-t border-white/10 py-10 text-center">
        <div className="mx-auto max-w-6xl px-6">
          <p className="font-display text-xl italic text-[#FAF5F0]">
            Trương Anh Cường gửi tặng Vũ Mạc Yến Nhi
          </p>
          <p className="mt-2 text-xs text-[#9E938B]">
            Kỷ niệm sinh nhật 19 · 11 · 2005 — Chúc Ín Nhi một đời bình an và hạnh phúc.
          </p>
        </div>
      </footer>
    </div>
  );
}
