import { Briefcase, Calendar, GraduationCap, MapPin, Target, User } from 'lucide-react';
import { profile } from '@/config/profile';
import SectionHeading from '@/components/ui/SectionHeading';

const facts = [
  {
    icon: User,
    label: 'Nama',
    value: profile.fullName,
  },
  {
    icon: GraduationCap,
    label: 'Pendidikan',
    value: `${profile.education.major}`,
    sub: `${profile.education.school} · Masuk ${profile.education.entryYear}`,
  },
  {
    icon: Calendar,
    label: 'Perkiraan Lulus',
    value: `${profile.education.expectedGraduation}`,
    sub: `Kurikulum ${profile.education.entryYear}–${profile.education.expectedGraduation}`,
  },
  {
    icon: Briefcase,
    label: 'Pengalaman PKL',
    value: profile.internship.company,
    sub: profile.internship.period,
  },
  {
    icon: MapPin,
    label: 'Lokasi',
    value: profile.internship.location ?? 'Indonesia',
    sub: 'Terbuka untuk remote / on-site',
  },
  {
    icon: Target,
    label: 'Bidang yang Diminati',
    value: profile.interests.slice(0, 2).join(', '),
    sub: profile.interests[2],
  },
];

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="section">
      <div className="container-x">
        <SectionHeading
          id="about-heading"
          label="About Me"
          title="Tentang Saya"
          description="Perjalanan saya belajar pengembangan web, dari ruang kelas hingga pengalaman PKL di perusahaan."
        />

        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          {/* Narasi */}
          <div data-reveal className="space-y-5">
            {profile.about.map((paragraph, index) => (
              <p
                key={index}
                className={`text-[15px] leading-[1.85] text-dim sm:text-base ${
                  index === 0 ? 'text-fg' : ''
                }`}
              >
                {paragraph}
              </p>
            ))}

            <div className="flex flex-wrap gap-2 pt-2">
              {profile.interests.map((interest) => (
                <span key={interest} className="chip">
                  {interest}
                </span>
              ))}
            </div>
          </div>

          {/* Kartu fakta */}
          <div data-reveal className="card p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3 border-b border-line pb-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-faint">
                Ringkasan Profil
              </h3>
              <span aria-hidden className="h-2 w-2 rounded-full bg-accent" />
            </div>

            <ul className="mt-5 space-y-4">
              {facts.map((fact) => (
                <li key={fact.label} className="flex gap-3.5">
                  <span
                    aria-hidden
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-line bg-muted text-accent"
                  >
                    <fact.icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-wider text-faint">{fact.label}</p>
                    <p className="mt-0.5 break-words text-sm font-semibold text-fg">{fact.value}</p>
                    {fact.sub ? <p className="mt-0.5 text-xs text-dim">{fact.sub}</p> : null}
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-xl border border-line bg-muted p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-faint">
                Tujuan Saya
              </p>
              <p className="mt-2 text-sm leading-relaxed text-dim">
                Terus mengasah kemampuan sebagai Web Developer dan menghasilkan produk digital
                yang berguna.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
