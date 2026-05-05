import { interests } from '@/lib/data'

export function FieldNotes() {
  return (
    <section id="field-notes" className="relative px-6 py-20 md:px-16 lg:px-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle, oklch(0.4 0 0 / 0.3) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl">
        <p className="mb-2 font-mono text-xs text-accent">outside work</p>
        <h2 className="mb-12 font-display text-[clamp(2rem,5vw,3rem)] font-bold text-foreground">
          Field notes
        </h2>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {interests.map((item, i) => (
            <div
              key={i}
              className={`rounded-lg border border-white/[0.07] bg-white/[0.02] p-5 transition-colors hover:border-accent/20 hover:bg-white/[0.04] ${
                i === 0 ? 'sm:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <p className="mb-1.5 font-display text-base font-semibold text-foreground">
                {item.label}
              </p>
              <p className="font-sans text-sm text-muted/70">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
