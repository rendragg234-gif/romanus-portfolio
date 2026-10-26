import { ArrowUpRight, Download, Mail, Sparkles } from 'lucide-react';
import { profile } from '@/config/profile';
import { scrollToSection } from '@/lib/navigation';

const DELAY = (index: number) => ({ animationDelay: `${index * 90}ms` });

export default function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative overflow-hidden pb-16 pt-28 sm:pb-24 sm:pt-36 lg:pb-28 lg:pt-40"
    >
      {/* Dekorasi grid halus */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35] dark:opacity-[0.22]"
        style={{
          backgroundImage:
            'linear-gradient(to right, var(--line) 1px, transparent 1px), linear-gradient(to bottom, var(--line) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, #000 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, #000 40%, transparent 100%)',
        }}
      />

      <div className="container-x">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* Kolom teks */}
          <div>
            {profile.status.enabled && (
              <p
                className="inline-flex animate-fade-up items-center gap-2 rounded-full border border-ok/35 bg-ok-soft px-3.5 py-1.5 text-xs font-semibold text-ok"
                style={DELAY(0)}
              >
                <span aria-hidden className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ok opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-ok" />
                </span>
                {profile.status.label}
              </p>
            )}

            <p
              className="mt-6 animate-fade-up text-sm font-medium uppercase tracking-[0.22em] text-dim"
              style={DELAY(1)}
            >
              {profile.greeting}
            </p>

            <h1
              id="hero-title"
              className="animate-fade-up mt-3 font-display text-[2.6rem] font-extrabold leading-[1.05] tracking-tight text-fg sm:text-6xl lg:text-[4rem]"
              style={DELAY(2)}
            >
              {profile.fullName}
            </h1>

            <p
              className="animate-fade-up mt-5 max-w-xl font-display text-lg font-semibold leading-snug text-dim sm:text-xl"
              style={DELAY(3)}
            >
              <span className="text-fg">Junior Web Developer</span>
              <span aria-hidden className="mx-2 text-faint">
                |
              </span>
              <span className="gradient-text">Building Modern Digital Experiences</span>
            </p>

            <p
              className="animate-fade-up mt-5 max-w-xl text-base leading-relaxed text-dim sm:text-lg"
              style={DELAY(4)}
            >
              {profile.intro}
            </p>

            <div className="animate-fade-up mt-8 flex flex-wrap items-center gap-3" style={DELAY(5)}>
              <button
                type="button"
                onClick={() => scrollToSection('projects')}
                className="btn btn-primary"
              >
                Lihat Proyek
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </button>
              <button type="button" onClick={() => scrollToSection('contact')} className="btn btn-ghost">
                <Mail className="h-4 w-4" aria-hidden />
                Hubungi Saya
              </button>
              <a href={profile.cvUrl} download className="btn btn-ghost">
                <Download className="h-4 w-4" aria-hidden />
                Download CV
              </a>
            </div>

            <dl
              className="animate-fade-up mt-10 grid max-w-lg grid-cols-2 gap-4 border-t border-line pt-8 sm:grid-cols-3"
              style={DELAY(6)}
            >
              <div>
                <dt className="text-xs uppercase tracking-wider text-faint">Fokus</dt>
                <dd className="mt-1 text-sm font-semibold text-fg">Web Development</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-faint">Sekolah</dt>
                <dd className="mt-1 text-sm font-semibold text-fg">SMK RPL · 2024–2027</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-faint">PKL</dt>
                <dd className="mt-1 text-sm font-semibold text-fg">PT Geoho Tooling</dd>
              </div>
            </dl>
          </div>

          {/* Kolom foto */}
          <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
            <div
              aria-hidden
              className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-accent/25 via-transparent to-accent-2/25 blur-2xl"
            />
            <div className="relative animate-fade-up" style={DELAY(3)}>
              <div className="relative overflow-hidden rounded-[1.75rem] border border-line bg-elevated p-2 shadow-lift">
                <div className="relative overflow-hidden rounded-[1.35rem] bg-muted">
                  <img
                    src={profile.avatar}
                    alt={profile.avatarAlt}
                    width={640}
                    height={720}
                    loading="eager"
                    decoding="async"
                    className="aspect-[4/5] w-full object-cover"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent"
                  />
                </div>

                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-3 rounded-2xl border border-white/15 bg-black/45 px-4 py-3 backdrop-blur-md">
                  <div className="min-w-0">
                    <p className="truncate text-xs text-white/70">Berdasarkan</p>
                    <p className="truncate text-sm font-semibold text-white">
                      {profile.education.major}
                    </p>
                  </div>
                  <span
                    aria-hidden
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-accent to-accent-2 text-white"
                  >
                    <Sparkles className="h-4 w-4" />
                  </span>
                </div>
              </div>

              {/* Kartu melayang */}
              <div className="absolute -left-3 top-8 hidden rounded-2xl border border-line bg-elevated px-4 py-3 shadow-lift sm:block">
                <p className="text-[11px] uppercase tracking-wider text-faint">Interest</p>
                <p className="mt-0.5 text-sm font-semibold text-fg">Frontend & Backend</p>
              </div>
              <div className="absolute -right-3 bottom-28 hidden rounded-2xl border border-line bg-elevated px-4 py-3 shadow-lift sm:block">
                <p className="text-[11px] uppercase tracking-wider text-faint">Status</p>
                <p className="mt-0.5 text-sm font-semibold text-fg">Siswa · Lulus 2027</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Garis pemisah bawah */}
      <div aria-hidden className="container-x mt-16 sm:mt-24">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-line-strong to-transparent" />
      </div>
    </section>
  );
}
