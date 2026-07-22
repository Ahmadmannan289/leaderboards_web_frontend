import { BookOpenText, Radio } from "lucide-react";

function GithubMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 .5C5.73.5.5 5.73.5 12.02c0 5.05 3.29 9.33 7.86 10.84.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.11-3.2.7-3.87-1.37-3.87-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.76.12 3.05.74.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.15 0 1.55-.01 2.79-.01 3.17 0 .3.2.66.79.55A10.53 10.53 0 0 0 23.5 12.02C23.5 5.73 18.27.5 12 .5Z" />
    </svg>
  );
}

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-border-subtle bg-base/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a
          href="#top"
          className="group flex items-center gap-2.5 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ember-400/60"
        >
          <span className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-ember-400 to-ember-600 shadow-ember-glow transition-transform duration-300 group-hover:scale-105 group-active:scale-95">
            <Radio className="h-4 w-4 text-base" strokeWidth={2.5} />
          </span>
          <span className="font-display text-[1.05rem] font-semibold tracking-[-0.02em] text-text-primary">
            Signal
          </span>
        </a>

        <nav className="flex items-center gap-2 sm:gap-3">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex h-9 items-center gap-2 rounded-full border border-border px-3.5 text-sm font-medium text-text-secondary transition-[color,background-color,border-color,transform] duration-200 hover:border-border-strong hover:bg-surface hover:text-text-primary active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-400/60 sm:px-4"
          >
            <GithubMark className="h-4 w-4" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
          <a
            href="#docs"
            className="group inline-flex h-9 items-center gap-2 rounded-full bg-text-primary px-3.5 text-sm font-medium text-base transition-[transform,box-shadow] duration-200 hover:shadow-elevated active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-400/60 sm:px-4"
          >
            <BookOpenText className="h-4 w-4" strokeWidth={2} />
            <span className="hidden sm:inline">Docs</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
