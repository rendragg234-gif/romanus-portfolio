import { Code2, Database, Server, Wrench, type LucideIcon } from 'lucide-react';
import { skillCategories } from '@/config/skills';
import SectionHeading from '@/components/ui/SectionHeading';
import type { SkillLevel } from '@/config/types';

const ICONS: Record<string, LucideIcon> = {
  code: Code2,
  server: Server,
  database: Database,
  wrench: Wrench,
};

const LEVEL_LABEL: Record<SkillLevel, string> = {
  dikuasai: 'Dikuasai',
  dipelajari: 'Dipelajari',
};

function LevelBadge({ level }: { level: SkillLevel }) {
  const mastered = level === 'dikuasai';
  return (
    <span
      className={[
        'shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider',
        mastered
          ? 'border-accent/40 bg-accent-soft text-accent'
          : 'border-line bg-muted text-faint',
      ].join(' ')}
    >
      {LEVEL_LABEL[level]}
    </span>
  );
}

export default function Skills() {
  const totalMastered = skillCategories.reduce(
    (count, category) => count + category.items.filter((item) => item.level === 'dikuasai').length,
    0,
  );
  const totalLearning = skillCategories.reduce(
    (count, category) => count + category.items.filter((item) => item.level === 'dipelajari').length,
    0,
  );

  return (
    <section id="skills" aria-labelledby="skills-heading" className="section">
      <div className="container-x">
        <SectionHeading
          id="skills-heading"
          label="Skills"
          title="Keterampilan Teknis"
          description="Daftar teknologi yang saya gunakan dalam pembelajaran dan proyek. Tidak memakai persentase karena angka tanpa dasar tidak akurat."
        />

        <div data-reveal className="mb-8 flex flex-wrap items-center gap-3">
          <span className="chip">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
            {totalMastered} teknologi dikuasai
          </span>
          <span className="chip">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-faint" />
            {totalLearning} teknologi sedang dipelajari
          </span>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {skillCategories.map((category, index) => {
            const Icon = ICONS[category.icon] ?? Code2;
            return (
              <article
                key={category.id}
                data-reveal
                style={{ transitionDelay: `${index * 70}ms` }}
                className="card card-hover flex flex-col p-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <span
                    aria-hidden
                    className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-gradient-to-br from-accent/15 to-accent-2/15 text-accent"
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-xs font-medium text-faint">
                    {category.items.length} item
                  </span>
                </div>

                <h3 className="mt-5 font-display text-base font-semibold text-fg">
                  {category.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-dim">{category.description}</p>

                <ul className="mt-5 space-y-2.5 border-t border-line pt-5">
                  {category.items.map((item) => (
                    <li key={item.name} className="flex items-center gap-3">
                      <span
                        aria-hidden
                        className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-line bg-muted text-[11px] font-bold tracking-tight text-fg"
                      >
                        {item.short}
                      </span>
                      <span className="min-w-0 flex-1 truncate text-sm font-medium text-fg">
                        {item.name}
                      </span>
                      <LevelBadge level={item.level} />
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
