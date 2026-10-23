import React, { useState } from 'react';
import Phone from '../demo/Phone.jsx';
import DayScreen from '../demo/DayScreen.jsx';
import TimerScreen from '../demo/TimerScreen.jsx';
import ConstructorScreen from '../demo/ConstructorScreen.jsx';
import { LOGIN_URL } from '../data/content.js';
import './hero.css';

export default function Hero() {
  const [role, setRole] = useState('student');
  const [open, setOpen] = useState(null);

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="wrap hero__grid">
        <div className="hero__copy">
          <h1 id="hero-title" className="hero__title">Курсы, которые проходят до конца</h1>
          <p className="hero__lead">Платформа курсов и практик по дням: здоровье, спорт, искусство, ИТ. Живой мастер, созвоны с записью, проверка заданий. Есть бесплатные курсы.</p>
          <div className="hero__cta">
            <a className="btn btn--ink btn--lg" href="#courses">Смотреть курсы</a>
            <a className="btn btn--ghost btn--lg" href="#masters">Стать мастером</a>
          </div>
        </div>

        <div className="hero__phone">
          <div className="seg" role="tablist" aria-label="Чей экран показать">
            <button type="button" role="tab" aria-selected={role === 'student'} className={`seg__btn${role === 'student' ? ' is-on' : ''}`} onClick={() => { setRole('student'); setOpen(null); }}>Экран ученика</button>
            <button type="button" role="tab" aria-selected={role === 'master'} className={`seg__btn${role === 'master' ? ' is-on' : ''}`} onClick={() => { setRole('master'); setOpen(null); }}>Экран мастера</button>
          </div>
          <Phone label={role === 'student' ? 'Экран дня ученика' : 'Конструктор курса мастера'}>
            {role === 'master'
              ? <ConstructorScreen />
              : open
                ? <TimerScreen label={open.label} minutes={open.minutes} icon={open.icon} onBack={() => setOpen(null)} />
                : <DayScreen onOpen={(it) => { if (it.type === 'media') setOpen(it); }} />}
          </Phone>
          <p className="hero__phone-note">{role === 'student' ? 'Экран живой: нажмите практику, таймер пойдёт.' : 'Конструктор живой: добавьте практику в день 3, курс сохранится сам.'}</p>
        </div>
      </div>
    </section>
  );
}
