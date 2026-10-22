import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { BrandLogo } from './Logo.jsx';
import { LOGIN_URL } from '../data/content.js';
import './header.css';

const NAV = [
  { href: '#how', label: 'Как проходит' },
  { href: '#sections', label: 'Разделы' },
  { href: '#courses', label: 'Курсы' },
  { href: '#reviews', label: 'Отзывы' },
  { href: '#apps', label: 'Приложение' },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [open]);

  return (
    <header className="hdr glass-strong">
      <div className="wrap hdr__row">
        <a href="#top" className="hdr__logo" aria-label="InStep, на главную"><BrandLogo size={30} /></a>

        <nav className="hdr__nav" aria-label="Разделы страницы">
          {NAV.map((n) => <a key={n.href} href={n.href} className="hdr__link">{n.label}</a>)}
        </nav>

        <div className="hdr__actions">
          <a className="btn btn--ink btn--sm" href={LOGIN_URL}>Войти</a>
          <button type="button" className="hdr__burger" aria-expanded={open} aria-controls="mobile-menu"
            aria-label={open ? 'Закрыть меню' : 'Открыть меню'} onClick={() => setOpen((v) => !v)}>
            {open ? <X size={22} strokeWidth={2} /> : <Menu size={22} strokeWidth={2} />}
          </button>
        </div>
      </div>

      {open && <button type="button" className="hdr__scrim" aria-label="Закрыть меню" onClick={() => setOpen(false)} />}
      <div id="mobile-menu" className={`hdr__drawer glass-strong${open ? ' is-open' : ''}`} aria-hidden={!open}>
        {NAV.map((n) => (
          <a key={n.href} href={n.href} className="hdr__drawer-link" onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>{n.label}</a>
        ))}
        <a className="btn btn--ink" href={LOGIN_URL} tabIndex={open ? 0 : -1}>Войти в веб-версию</a>
      </div>
    </header>
  );
}
