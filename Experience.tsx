import { Briefcase, CalendarDays, MapPin, Plus } from 'lucide-react';
import { experiences, upcomingExperienceSlot } from '@/config/experience';
import SectionHeading from '@/components/ui/SectionHeading';

export default function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="section">
      <div className="container-x">
        <SectionHeading
          id="experience-heading"
          label="Experience"
          title="Pengalaman"
          description="Rekam jejak praktik kerja lapangan dan pengalaman lain yang telah saya jalani."
        />

        <div className="relative">
          {/* Garis timeline */}
          <div
            aria-hidden
            className="absolute left-[1.15rem] top-2 bottom-2 w-px bg-gradient-to-b from-accent/60 via-line-strong to-transparent sm:left-[1.4rem]"
          />

          <ol className="space-y-6">
            {experiences.map((item, index) => (
              <li key={item.id} data-reveal style={{ transitionDelay: `${index * 80}ms` }}>
                <article className="relative pl-12 sm:pl-16">
                  {/* Titik timeline */}
                  <span
                    aria-hidden
                    className="absolute left-0 top-1 grid h-9 w-9 place-items-center rounded-full border border-accent/40 bg-elevated shadow-soft sm:h-11 sm:w-11"
                  >
                    <Briefcase className="h-4 w-4 text-accent sm:h-5 sm:w-5" />
                  </span>

                  <div className="card card-hover p-5 sm:p-6">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                          {item.role}
                        </p>
                        <h3 className="mt-1.5 font-display text-lg font-bold text-fg sm:text-xl">
                          {item.company}
                        </h3>
                      </div>
                      <span className="chip whitespace-nowrap">
                        <CalendarDays className="h-3.5 w-3.5" aria-hidden />
                        {item.period}
                      </span>
                    </div>

                    {item.location ? (
                      <p className="mt-3 flex items-center gap-1.5 text-xs text-faint">
                        <MapPin className="h-3.5 w-3.5" aria-hidden />
                        {item.location}
                      </p>
                    ) : null}

                    <p className="mt-4 text-sm leading-relaxed text-dim sm:text-[15px]">
                      {item.summary}
                    </p>

                    <ul className="mt-4 space-y-2">
                      {item.highlights.map((highlight) => (
                        <li key={highlight} className="flex gap-3 text-sm text-dim">
                          <span
                            aria-hidden
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                          />
                          <span className="leading-relaxed">{highlight}</span>
                        </li>
                      ))}
                    </ul>

                    {item.technologies && item.technologies.length > 0 ? (
                      <div className="mt-5 flex flex-wrap gap-2 border-t border-line pt-4">
                        {item.technologies.map((tech) => (
                          <span key={tech} className="chip">
                            {tech}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </article>
              </li>
            ))}

            {upcomingExperienceSlot.enabled ? (
              <li data-reveal>
                <div className="relative pl-12 sm:pl-16">
                  <span
                    aria-hidden
                    className="absolute left-0 top-1 grid h-9 w-9 place-items-center rounded-full border border-dashed border-line-strong bg-elevated sm:h-11 sm:w-11"
                  >
                    <Plus className="h-4 w-4 text-faint sm:h-5 sm:w-5" />
                  </span>
                  <div className="rounded-2xl border border-dashed border-line-strong p-5 sm:p-6">
                    <h3 className="text-sm font-semibold text-fg">{upcomingExperienceSlot.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-dim">
                      {upcomingExperienceSlot.description}
                    </p>
                  </div>
                </div>
              </li>
            ) : null}
          </ol>
        </div>
      </div>
    </section>
  );
}
