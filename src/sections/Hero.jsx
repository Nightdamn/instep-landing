import React, { useState } from 'react';
import Phone from '../demo/Phone.jsx';
import DayScreen from '../demo/DayScreen.jsx';
import TimerScreen from '../demo/TimerScreen.jsx';
import './hero.css';

export default function Hero() {
  const [open, setOpen] = useState(null);

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="wrap hero__grid">
        <div className="hero__copy">
          <h1 id="hero-title" className="hero__title">Курс, который живёт по дням</h1>
          <p className="hero__lead">Практики с таймером, созвоны с записью и задания с проверкой. Каждое на своём дне, у ученика и у мастера.</p>
          <div className="hero__cta">
            <a className="btn btn--ink btn--lg" href="#courses">Записаться на курс</a>
            <a className="btn btn--ghost btn--lg" href="#master">Собрать свой курс</a>
          </div>
        </div>

        <div className="hero__phone">
          <Phone label="Экран дня в приложении InStep">
            {open
              ? <TimerScreen label={open.label} minutes={open.minutes} icon={open.icon} onBack={() => setOpen(null)} />
              : <DayScreen onOpen={(it) => { if (it.type === 'media') setOpen(it); }} />}
          </Phone>
          <p className="hero__phone-note">Экран живой: нажмите практику, таймер пойдёт.</p>
        </div>
      </div>
    </section>
  );
}
