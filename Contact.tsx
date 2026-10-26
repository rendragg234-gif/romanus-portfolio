import { useEffect, useRef, useState, type FormEvent } from 'react';
import {
  AlertCircle,
  Check,
  Copy,
  ExternalLink,
  Loader2,
  Mail,
  Send,
  ShieldCheck,
} from 'lucide-react';
import { profile } from '@/config/profile';
import { contactForm } from '@/config/site';
import SectionHeading from '@/components/ui/SectionHeading';
import { SocialIcon, socialMeta } from '@/components/ui/SocialIcon';
import { copyToClipboard } from '@/lib/clipboard';
import { hasErrors, validateContact, type ContactErrors } from '@/lib/validation';
import { cn } from '@/lib/cn';

type Status = 'idle' | 'sending' | 'success' | 'error' | 'mailto';

const INITIAL = { name: '', email: '', message: '' };

export default function Contact() {
  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [feedback, setFeedback] = useState('');
  const [copied, setCopied] = useState(false);
  const [honey, setHoney] = useState('');
  const lastSubmitRef = useRef(0);
  const formRef = useRef<HTMLFormElement>(null);

  const email = profile.contact.email.trim();
  const socials = profile.socials.filter((social) => social.url.trim() !== '');
  const endpoint = contactForm.endpoint;

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const setField = (field: keyof typeof INITIAL, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const next = validateContact({ ...values, [field]: value });
      setErrors((prev) => ({ ...prev, [field]: next[field] }));
    }
    if (status !== 'idle') {
      setStatus('idle');
      setFeedback('');
    }
  };

  const onBlur = (field: keyof typeof INITIAL) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const next = validateContact(values);
    setErrors((prev) => ({ ...prev, [field]: next[field] }));
  };

  const handleCopyEmail = async () => {
    const ok = await copyToClipboard(email);
    setCopied(ok);
    if (!ok) setFeedback('Gagal menyalin. Salin manual: ' + email);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (honey.trim() !== '') return; // honeypot: kemungkinan besar bot

    const nextErrors = validateContact(values);
    setTouched({ name: true, email: true, message: true });
    setErrors(nextErrors);

    if (hasErrors(nextErrors)) {
      setStatus('error');
      setFeedback('Mohon lengkapi field yang masih kosong atau tidak valid.');
      const firstInvalid = formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]');
      firstInvalid?.focus();
      return;
    }

    const now = Date.now();
    if (now - lastSubmitRef.current < contactForm.minSubmitIntervalMs) {
      setStatus('error');
      setFeedback('Terlalu cepat mengirim. Tunggu beberapa detik lalu coba lagi.');
      return;
    }
    lastSubmitRef.current = now;

    // Tanpa endpoint terkonfigurasi → gunakan aplikasi email pengunjung (mailto).
    if (!endpoint) {
      const subject = encodeURIComponent(
        `${contactForm.fallbackSubject} — dari ${values.name.trim()}`,
      );
      const body = encodeURIComponent(
        `Nama: ${values.name.trim()}\nEmail: ${values.email.trim()}\n\nPesan:\n${values.message.trim()}`,
      );
      setStatus('sending');
      await new Promise((resolve) => window.setTimeout(resolve, 400));
      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
      setStatus('mailto');
      setFeedback(
        `Aplikasi email Anda dibuka dengan pesan yang sudah terisi. Kirim ke ${email} agar pesan diterima.`,
      );
      return;
    }

    setStatus('sending');
    setFeedback('');
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          message: values.message.trim(),
        }),
      });

      if (!response.ok) {
        const detail = await response.text().catch(() => '');
        throw new Error(detail || `HTTP ${response.status}`);
      }

      setStatus('success');
      setFeedback('Pesan berhasil dikirim. Terima kasih telah menghubungi saya.');
      setValues(INITIAL);
      setTouched({});
      setErrors({});
    } catch (error) {
      console.error('Gagal mengirim pesan kontak:', error);
      setStatus('error');
      setFeedback(
        `Pesan gagal dikirim (${error instanceof Error ? error.message : 'kesalahan jaringan'}). Silakan coba lagi atau kirim langsung ke email.`,
      );
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-heading" className="section">
      <div className="container-x">
        <SectionHeading
          id="contact-heading"
          label="Contact"
          title="Hubungi Saya"
          description="Punya proyek, kesempatan magang, atau ingin berdiskusi? Kirim pesan melalui form maupun kontak langsung di bawah ini."
        />

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Info kontak */}
          <div data-reveal className="card flex flex-col p-6 sm:p-7">
            <h3 className="font-display text-lg font-bold text-fg">Kontak Langsung</h3>
            <p className="mt-2 text-sm leading-relaxed text-dim">
              Saya biasanya membalas pesan dalam 1–2 hari kerja.
            </p>

            <ul className="mt-6 space-y-3">
              {/* Email */}
              <li>
                <div className="flex items-center gap-3 rounded-xl border border-line bg-muted p-3.5">
                  <span
                    aria-hidden
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-line bg-elevated text-accent"
                  >
                    <Mail className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] uppercase tracking-wider text-faint">Email</p>
                    <a
                      href={`mailto:${email}`}
                      className="block truncate text-sm font-semibold text-fg transition-colors hover:text-accent"
                    >
                      {email}
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    aria-label={copied ? 'Email tersalin' : 'Salin alamat email'}
                    className={cn(
                      'grid h-9 w-9 shrink-0 place-items-center rounded-lg border transition-all duration-300',
                      copied
                        ? 'border-ok/50 bg-ok-soft text-ok'
                        : 'border-line bg-elevated text-dim hover:border-accent hover:text-fg',
                    )}
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
              </li>

              {/* Sosial */}
              {socials.map((social) => {
                const meta = socialMeta(social.platform);
                return (
                  <li key={social.platform}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-xl border border-line bg-muted p-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent"
                    >
                      <span
                        aria-hidden
                        className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-line bg-elevated text-accent"
                      >
                        <SocialIcon platform={social.platform} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[11px] uppercase tracking-wider text-faint">
                          {meta.label}
                        </span>
                        <span className="block truncate text-sm font-semibold text-fg">
                          {social.label}
                        </span>
                      </span>
                      <ExternalLink className="h-4 w-4 shrink-0 text-faint" aria-hidden />
                    </a>
                  </li>
                );
              })}
            </ul>

            {socials.length === 0 ? (
              <div className="mt-5 rounded-xl border border-dashed border-line-strong p-4">
                <p className="text-xs leading-relaxed text-dim">
                  Link GitHub, LinkedIn, dan WhatsApp belum dikonfigurasi. Isi{' '}
                  <code className="rounded bg-elevated px-1.5 py-0.5">socials</code> pada{' '}
                  <code className="rounded bg-elevated px-1.5 py-0.5">src/config/profile.ts</code>{' '}
                  dan tautannya akan otomatis tampil di sini.
                </p>
              </div>
            ) : null}

            <div className="mt-auto pt-6">
              <div className="rounded-xl border border-line bg-gradient-to-br from-accent/10 to-accent-2/10 p-4">
                <p className="flex items-center gap-2 text-xs font-semibold text-fg">
                  <ShieldCheck className="h-4 w-4 text-accent" aria-hidden />
                  Data Anda aman
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-dim">
                  Form hanya memproses pesan yang Anda kirimkan dan tidak menyimpan data
                  tambahan apa pun.
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div data-reveal className="card p-6 sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-display text-lg font-bold text-fg">Kirim Pesan</h3>
                <p className="mt-2 text-sm text-dim">
                  {endpoint
                    ? 'Pesan akan dikirim langsung melalui endpoint form yang dikonfigurasi.'
                    : 'Endpoint form belum dikonfigurasi, jadi tombol kirim akan membuka aplikasi email Anda.'}
                </p>
              </div>
              <span
                aria-hidden
                className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-muted text-accent"
              >
                <Send className="h-5 w-5" />
              </span>
            </div>

            <form ref={formRef} onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
              {/* Honeypot anti-bot */}
              <div className="sr-only" aria-hidden>
                <label htmlFor="website">Jangan isi kolom ini</label>
                <input
                  id="website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honey}
                  onChange={(event) => setHoney(event.target.value)}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-faint"
                  >
                    Nama <span aria-hidden className="text-danger">*</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Nama lengkap Anda"
                    className="field"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'contact-name-error' : undefined}
                    value={values.name}
                    onChange={(event) => setField('name', event.target.value)}
                    onBlur={() => onBlur('name')}
                  />
                  {errors.name ? (
                    <p
                      id="contact-name-error"
                      role="alert"
                      className="mt-1.5 flex items-center gap-1.5 text-xs text-danger"
                    >
                      <AlertCircle className="h-3.5 w-3.5" aria-hidden />
                      {errors.name}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-faint"
                  >
                    Email <span aria-hidden className="text-danger">*</span>
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    placeholder="nama@email.com"
                    className="field"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'contact-email-error' : undefined}
                    value={values.email}
                    onChange={(event) => setField('email', event.target.value)}
                    onBlur={() => onBlur('email')}
                  />
                  {errors.email ? (
                    <p
                      id="contact-email-error"
                      role="alert"
                      className="mt-1.5 flex items-center gap-1.5 text-xs text-danger"
                    >
                      <AlertCircle className="h-3.5 w-3.5" aria-hidden />
                      {errors.email}
                    </p>
                  ) : null}
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-faint"
                >
                  Pesan <span aria-hidden className="text-danger">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={6}
                  placeholder="Tuliskan pesan Anda…"
                  className="field resize-y"
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'contact-message-error' : undefined}
                  value={values.message}
                  onChange={(event) => setField('message', event.target.value)}
                  onBlur={() => onBlur('message')}
                />
                <div className="mt-1.5 flex items-start justify-between gap-3">
                  {errors.message ? (
                    <p
                      id="contact-message-error"
                      role="alert"
                      className="flex items-center gap-1.5 text-xs text-danger"
                    >
                      <AlertCircle className="h-3.5 w-3.5" aria-hidden />
                      {errors.message}
                    </p>
                  ) : (
                    <span />
                  )}
                  <span className="shrink-0 text-[11px] text-faint">
                    {values.message.length}/3000
                  </span>
                </div>
              </div>

              {/* Feedback status */}
              {feedback ? (
                <p
                  role="status"
                  aria-live="polite"
                  className={cn(
                    'flex items-start gap-2 rounded-xl border px-4 py-3 text-sm leading-relaxed',
                    status === 'success' && 'border-ok/40 bg-ok-soft text-ok',
                    status === 'error' && 'border-danger/40 bg-danger-soft text-danger',
                    status === 'mailto' && 'border-accent/40 bg-accent-soft text-accent',
                  )}
                >
                  {status === 'success' ? (
                    <Check className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                  ) : status === 'sending' ? (
                    <Loader2 className="mt-0.5 h-4 w-4 shrink-0 animate-spin" aria-hidden />
                  ) : (
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                  )}
                  {feedback}
                </p>
              ) : null}

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn btn-primary"
                >
                  {status === 'sending' ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                      Mengirim…
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" aria-hidden />
                      {endpoint ? 'Kirim Pesan' : 'Kirim via Email'}
                    </>
                  )}
                </button>
                <p className="text-xs text-faint">
                  {endpoint ? (
                    <>
                      via <span className="font-medium text-dim">endpoint form</span>
                    </>
                  ) : (
                    <>
                      via <span className="font-medium text-dim">aplikasi email</span>
                    </>
                  )}
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
