import React, { useState } from 'react';
import Phone from '../demo/Phone.jsx';
import DayScreen from '../demo/DayScreen.jsx';
import TimerScreen from '../demo/TimerScreen.jsx';
import CallScreen from '../demo/CallScreen.jsx';
import TaskScreen from '../demo/TaskScreen.jsx';
import { BENEFITS, STEPS } from '../data/content.js';
import './students.css';

export default function Students() {
  const [active, setActive] = useState('timer');
  const [callMode, setCallMode] = useState('before');

  const screen = {
    day: <DayScreen onOpen={(it) => { if (it.type === 'media') setActive('timer'); }} />,
    timer: <TimerScreen onBack={() => setActive('day')} />,
    call: <CallScreen mode={callMode} onBack={() => setActive('day')} onToggle={() => setCallMode((m) => (m === 'before' ? 'after' : 'before'))} />,
    task: <TaskScreen onBack={() => setActive('day')} />,
  }[active];

  return (
    <section className="stu" id="students" aria-labelledby="stu-title">
      <div className="wrap">
        <div className="stu__head">
          <h2 id="stu-title" className="h2">Почему курсы здесь доходят до конца</h2>
          <p className="lead">Не лента сообщений и не папка с видео. Курс идёт по дням вместе с мастером, и всё нужное лежит в сегодняшнем дне.</p>
        </div>

        <div className="stu__grid">
          <ul className="stu__list" role="tablist" aria-label="Выгоды для ученика">
            {BENEFITS.map((b) => (
              <li key={b.key}>
                <button type="button" role="tab" aria-selected={active === b.key} className={`benefit${active === b.key ? ' is-on' : ''}`} onClick={() => { setActive(b.key); if (b.key === 'call') setCallMode('before'); }}>
                  <span className="benefit__title">{b.title}</span>
                  <span className="benefit__text">{b.text}</span>
                </button>
              </li>
            ))}
          </ul>
          <div className="stu__phone">
            <Phone label="Экран приложения" height={620}>{screen}</Phone>
          </div>
        </div>

        <ol className="steps" aria-label="Как начать">
          {STEPS.map((s, i) => (
            <li key={s.title} className="step glass">
              <span className="step__num" aria-hidden="true">{i + 1}</span>
              <div>
                <h3 className="step__title">{s.title}</h3>
                <p className="step__text">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="stu__cta">
          <a className="btn btn--ink btn--lg" href="#courses">Смотреть курсы</a>
        </div>
      </div>
    </section>
  );
}
