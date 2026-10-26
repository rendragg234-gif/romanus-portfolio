import { useMemo, useState } from 'react';
import { ArrowUpRight, Filter, Github, MonitorPlay } from 'lucide-react';
import { projectCategories, projects } from '@/config/projects';
import SectionHeading from '@/components/ui/SectionHeading';
import { cn } from '@/lib/cn';

const hasUrl = (url: string) => url.trim().length > 0;

export default function Projects() {
  const [category, setCategory] = useState('all');

  const availableCategories = useMemo(() => {
    const used = new Set<string>(projects.map((project) => project.category));
    return projectCategories.filter((item) => item.id === 'all' || used.has(item.id));
  }, []);

  const filtered = useMemo(
    () => (category === 'all' ? projects : projects.filter((project) => project.category === category)),
    [category],
  );

  return (
    <section id="projects" aria-labelledby="projects-heading" className="section">
      <div className="container-x">
        <SectionHeading
          id="projects-heading"
          label="Featured Projects"
          title="Proyek Pilihan"
          description="Kumpulan proyek yang saya kerjakan. Entri bertanda placeholder masih contoh dan menunggu data asli."
        />

        {/* Filter kategori */}
        <div data-reveal className="mb-8 flex flex-wrap items-center gap-2">
          <span className="mr-1 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-faint">
            <Filter className="h-3.5 w-3.5" aria-hidden />
            Filter
          </span>
          {availableCategories.map((item) => {
            const isActive = category === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setCategory(item.id)}
                aria-pressed={isActive}
                className={cn(
                  'rounded-full border px-4 py-1.5 text-xs font-semibold transition-all duration-300 sm:text-sm',
                  isActive
                    ? 'border-transparent bg-gradient-to-r from-accent to-accent-2 text-white shadow-soft'
                    : 'border-line bg-muted text-dim hover:border-accent/50 hover:text-fg',
                )}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {filtered.length === 0 ? (
          <p data-reveal className="card p-8 text-center text-sm text-dim">
            Belum ada proyek pada kategori ini.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {filtered.map((project, index) => (
              <article
                key={project.id}
                data-reveal
                style={{ transitionDelay: `${(index % 2) * 80}ms` }}
                className="card card-hover group flex flex-col overflow-hidden"
              >
                {/* Screenshot */}
                <div className="relative overflow-hidden bg-muted">
                  <img
                    src={project.image}
                    alt={project.imageAlt}
                    width={800}
                    height={500}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent"
                  />
                  {project.isPlaceholder ? (
                    <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/55 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur">
                      Placeholder
                    </span>
                  ) : null}
                  <span className="absolute bottom-4 left-4 rounded-full border border-white/15 bg-black/50 px-3 py-1 text-[11px] font-medium capitalize text-white backdrop-blur">
                    {project.category}
                  </span>
                </div>

                {/* Konten */}
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="font-display text-lg font-bold text-fg sm:text-xl">
                    {project.title}
                  </h3>
                  <p className="mt-2.5 flex-1 text-sm leading-relaxed text-dim">
                    {project.description}
                  </p>

                  <ul className="mt-4 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <li key={tech} className="chip">
                        {tech}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-2.5 border-t border-line pt-5">
                    {hasUrl(project.demoUrl) ? (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary btn-sm"
                      >
                        <MonitorPlay className="h-4 w-4" aria-hidden />
                        Live Demo
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                      </a>
                    ) : null}

                    {hasUrl(project.repoUrl) ? (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-ghost btn-sm"
                      >
                        <Github className="h-4 w-4" aria-hidden />
                        Source Code
                      </a>
                    ) : null}

                    {!hasUrl(project.demoUrl) && !hasUrl(project.repoUrl) ? (
                      <p className="text-xs text-faint">
                        Tautan demo &amp; repository belum tersedia.
                      </p>
                    ) : null}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
