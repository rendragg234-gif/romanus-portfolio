import { useMemo, useState } from 'react';
import { Award, CalendarDays, ExternalLink, Eye, ShieldCheck } from 'lucide-react';
import { certificates } from '@/config/certificates';
import SectionHeading from '@/components/ui/SectionHeading';
import Modal from '@/components/ui/Modal';

const MONTHS = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
];

function formatDate(value: string): string {
  if (!value) return 'Tanggal belum diisi';
  const match = /^(\d{4})-(\d{2})/.exec(value);
  if (!match) return value;
  const year = match[1];
  const monthIndex = Number(match[2]) - 1;
  if (monthIndex < 0 || monthIndex > 11) return value;
  return `${MONTHS[monthIndex]} ${year}`;
}

export default function Certificates() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = useMemo(
    () => certificates.find((certificate) => certificate.id === activeId) ?? null,
    [activeId],
  );

  const hasPlaceholder = certificates.some((certificate) => certificate.isPlaceholder);

  return (
    <section id="certificates" aria-labelledby="certificates-heading" className="section">
      <div className="container-x">
        <SectionHeading
          id="certificates-heading"
          label="Certificates"
          title="Sertifikat"
          description="Sertifikat pelatihan, kursus, dan penghargaan yang saya peroleh."
        />

        {hasPlaceholder ? (
          <p
            data-reveal
            className="mb-6 flex items-start gap-2.5 rounded-xl border border-line bg-muted px-4 py-3 text-xs leading-relaxed text-dim sm:text-sm"
          >
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
            <span>
              Daftar di bawah masih berisi <strong className="font-semibold text-fg">placeholder</strong>.
              Ganti dengan sertifikat asli Anda di{' '}
              <code className="rounded bg-elevated px-1.5 py-0.5">src/config/certificates.ts</code>{' '}
              atau kosongkan daftarnya.
            </span>
          </p>
        ) : null}

        {certificates.length === 0 ? (
          <p data-reveal className="card p-8 text-center text-sm text-dim">
            Belum ada sertifikat untuk ditampilkan.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {certificates.map((certificate, index) => (
              <article
                key={certificate.id}
                data-reveal
                style={{ transitionDelay: `${(index % 3) * 70}ms` }}
                className="card card-hover group flex flex-col overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setActiveId(certificate.id)}
                  className="relative block overflow-hidden bg-muted text-left"
                  aria-label={`Pratinjau sertifikat: ${certificate.name}`}
                >
                  <img
                    src={certificate.image}
                    alt={certificate.imageAlt}
                    width={640}
                    height={450}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-black opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <Eye className="h-3.5 w-3.5" aria-hidden />
                    Lihat
                  </span>
                  {certificate.isPlaceholder ? (
                    <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/55 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur">
                      Placeholder
                    </span>
                  ) : null}
                </button>

                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start gap-3">
                    <span
                      aria-hidden
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-line bg-muted text-accent"
                    >
                      <Award className="h-4 w-4" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-display text-sm font-bold leading-snug text-fg sm:text-base">
                        {certificate.name}
                      </h3>
                      <p className="mt-1 text-xs text-dim">{certificate.issuer}</p>
                    </div>
                  </div>

                  <p className="mt-3 flex-1 text-xs leading-relaxed text-faint">
                    {certificate.description}
                  </p>

                  <div className="mt-4 flex items-center justify-between gap-3 border-t border-line pt-4">
                    <span className="inline-flex items-center gap-1.5 text-xs text-faint">
                      <CalendarDays className="h-3.5 w-3.5" aria-hidden />
                      {formatDate(certificate.issuedAt)}
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveId(certificate.id)}
                      className="text-xs font-semibold text-accent transition-colors hover:text-fg"
                    >
                      Pratinjau
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      <Modal
        open={active !== null}
        onClose={() => setActiveId(null)}
        title={active ? active.name : 'Pratinjau Sertifikat'}
      >
        {active ? (
          <div className="space-y-4">
            <img
              src={active.image}
              alt={active.imageAlt}
              width={1200}
              height={850}
              loading="lazy"
              decoding="async"
              className="w-full rounded-xl border border-line bg-muted object-contain"
            />
            <dl className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-line bg-muted p-3.5">
                <dt className="text-[11px] uppercase tracking-wider text-faint">Penerbit</dt>
                <dd className="mt-1 text-sm font-semibold text-fg">{active.issuer}</dd>
              </div>
              <div className="rounded-xl border border-line bg-muted p-3.5">
                <dt className="text-[11px] uppercase tracking-wider text-faint">Tanggal Terbit</dt>
                <dd className="mt-1 text-sm font-semibold text-fg">{formatDate(active.issuedAt)}</dd>
              </div>
            </dl>
            <p className="text-sm leading-relaxed text-dim">{active.description}</p>

            {active.credentialUrl.trim() !== '' ? (
              <a
                href={active.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-sm"
              >
                <ExternalLink className="h-4 w-4" aria-hidden />
                Buka Dokumen Sertifikat
              </a>
            ) : (
              <p className="text-xs text-faint">
                Tautan dokumen sertifikat belum tersedia untuk entri ini.
              </p>
            )}
          </div>
        ) : null}
      </Modal>
    </section>
  );
}
