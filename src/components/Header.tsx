export function Header() {
  const scrollToQuiz = () => {
    const el = document.getElementById('love-quiz');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#09070C]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-6 py-4">
        <a
          href="#top"
          className="font-display text-xl font-semibold tracking-tight text-[#FAF5F0] whitespace-nowrap shrink-0"
        >
          Cường &amp; Nhi
        </a>

        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#C8BEB6]">
          <a
            href="#letter"
            className="hover:text-[#FAF5F0] transition-colors whitespace-nowrap shrink-0"
          >
            Lời Chúc
          </a>
          <a
            href="#gallery"
            className="hover:text-[#FAF5F0] transition-colors whitespace-nowrap shrink-0"
          >
            Khoảnh Khắc
          </a>
          <a
            href="#videos"
            className="hover:text-[#FAF5F0] transition-colors whitespace-nowrap shrink-0"
          >
            Thước Phim
          </a>
          <a
            href="#love-quiz"
            className="hover:text-[#FAF5F0] transition-colors whitespace-nowrap shrink-0"
          >
            Câu Hỏi Nhỏ
          </a>
        </nav>

        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={scrollToQuiz}
            className="rounded-lg bg-rose-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-rose-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-400 whitespace-nowrap shrink-0 cursor-pointer"
          >
            Mở Bất Ngờ
          </button>
        </div>
      </div>
    </header>
  );
}
