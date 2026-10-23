import React from 'react';
import { Smartphone, Apple, Download } from 'lucide-react';
import { BrandLogo } from './Logo.jsx';
import { APPS, LOGIN_URL } from '../data/content.js';
import './footer.css';

const ICONS = { android: Smartphone, ios: Apple, apk: Download };

export default function Footer() {
  return (
    <footer className="ftr" id="apps">
      <div className="wrap">
        <div className="ftr__cta glass">
          <div className="ftr__col">
            <h2 className="ftr__title">Ученикам</h2>
            <p className="ftr__lead">Выберите курс, бесплатный или с пробным доступом, и пройдите первый день сегодня.</p>
            <a className="btn btn--ink btn--lg" href="#courses">Смотреть курсы</a>
          </div>
          <div className="ftr__col ftr__col--master">
            <h2 className="ftr__title">Мастерам</h2>
            <p className="ftr__lead">Соберите курс за вечер и ведите поток из кабинета. Платите только с продаж.</p>
            <a className="btn btn--ghost btn--lg" href={LOGIN_URL}>Стать мастером</a>
          </div>
        </div>

        <div className="ftr__apps-row">
          <p className="ftr__apps-text">Веб-версия открывается в браузере телефона и компьютера. Мобильное приложение собирается.</p>
          <ul className="ftr__apps" aria-label="Мобильные приложения">
            {APPS.map((a) => {
              const Icon = ICONS[a.key];
              return (
                <li key={a.key}>
                  <span className="app-badge" aria-disabled="true" title="Скоро">
                    <Icon size={18} strokeWidth={2} aria-hidden="true" />
                    <span className="app-badge__label">{a.label}</span>
                    <span className="app-badge__note">{a.note}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="ftr__bottom">
          <BrandLogo size={26} muted className="ftr__logo" />
          <nav className="ftr__links" aria-label="Служебные ссылки">
            <a href="https://instep.expert/policy">Политика конфиденциальности</a>
            <a href={LOGIN_URL}>Войти</a>
          </nav>
          <p className="ftr__copy">InStep, 2026. instep.expert</p>
        </div>
      </div>
    </footer>
  );
}
