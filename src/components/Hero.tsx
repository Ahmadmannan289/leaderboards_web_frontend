export default function Hero() {
  return (
    <section className="relative mx-auto max-w-3xl px-5 pt-16 pb-10 text-center sm:pt-24 sm:pb-14">
      <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3.5 py-1.5 text-xs font-medium text-text-secondary">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-pulse-soft rounded-full bg-ember-400" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ember-400" />
        </span>
        Updated weekly &middot; 36 models tracked
      </div>

      <h1
        className="animate-fade-up mt-6 text-balance font-display text-4xl font-semibold tracking-[-0.03em] text-text-primary sm:text-5xl md:text-6xl"
        style={{ animationDelay: "80ms" }}
      >
        AI Benchmark <span className="text-ember-400">Leaderboard</span>
      </h1>

      <p
        className="animate-fade-up mx-auto mt-5 max-w-xl text-pretty text-base leading-[1.7] text-text-secondary sm:text-lg"
        style={{ animationDelay: "160ms" }}
      >
        Comparing speech and translation models across the benchmarks that matter, in an{" "}
        <span className="text-text-primary font-medium">open</span> and{" "}
        <span className="text-text-primary font-medium">reproducible</span> way.
      </p>
    </section>
  );
}
