import { useEffect, useState } from 'react';
import { navItems } from '@/config/site';

/** Lacak section yang sedang aktif di viewport untuk indikator navbar. */
export function useActiveSection() {
  const [active, setActive] = useState<string>(navItems[0]?.id ?? 'home');

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) setActive(visible[0].target.id);
      },
      {
        rootMargin: '-45% 0px -45% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    sections.forEach((section) => observer.observe(section));

    // Perbarui saat user kembali ke paling atas halaman.
    const onScroll = () => {
      if (window.scrollY < 120) setActive(navItems[0]?.id ?? 'home');
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return active;
}
