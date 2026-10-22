import React from 'react';
import { Menu, Check, Video, Map, BarChart3 } from 'lucide-react';
import { DEMO_DAY } from '../data/content.js';

// Живая мини-версия Dashboard.jsx: шапка курса, кружки дней, прогресс, карточки практик.
export default function DayScreen({ day = DEMO_DAY.day, onOpen, activeId }) {
  const items = DEMO_DAY.items;
  const done = items.filter((i) => i.done).length;
  const pct = Math.round((done / items.length) * 100);
  const days = Array.from({ length: DEMO_DAY.totalDays }, (_, i) => i + 1);

  return (
    <div className="scr">
      <div className="scr__top glass-strong">
        <img src="/icons/walking.svg" alt="" className="scr__avatar" />
        <div className="scr__top-text">
          <div className="scr__course">{DEMO_DAY.course}</div>
          <div className="scr__sub">День {day} из {DEMO_DAY.totalDays}</div>
        </div>
        <span className="scr__menu" aria-hidden="true"><Menu size={18} strokeWidth={2} /></span>
      </div>

      <div className="scr__body">
        <div className="scr__tabs" aria-hidden="true">
          <span className="scr__tab"><Map size={14} strokeWidth={2.2} /> Карта курса</span>
          <span className="scr__tab"><BarChart3 size={14} strokeWidth={2.2} /> Статистика</span>
        </div>
        <div className="scr__ribbon" aria-label={`Дни курса, текущий день ${day}`}>
          {days.map((d) => (
            <span key={d} className={`dot${d < day ? ' dot--done' : ''}${d === day ? ' dot--now' : ''}`} aria-hidden="true">
              {d < day ? <Check size={10} strokeWidth={3} /> : d}
            </span>
          ))}
        </div>

        <div className="scr__progress">
          <div className="scr__progress-head"><span>Сегодня</span><span className="scr__num">{done}/{items.length}</span></div>
          <div className="bar" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="Выполнено за день"><div className="bar__fill" style={{ '--p': pct / 100 }} /></div>
        </div>

        <ul className="scr__list">
          {items.map((it) => (
            <li key={it.id}>
              <button type="button" className={`prac glass${activeId === it.id ? ' is-active' : ''}`} onClick={() => onOpen?.(it)}>
                <span className="prac__icon"><img src={it.icon} alt="" /></span>
                <span className="prac__text">
                  <span className="prac__label">{it.label}</span>
                  <span className="prac__meta">{it.type === 'call' ? 'онлайн с мастером' : `${it.minutes} мин`}</span>
                </span>
                {it.done
                  ? <span className="prac__state prac__state--done" aria-label="выполнено"><Check size={14} strokeWidth={3} /></span>
                  : it.type === 'call'
                    ? <span className="prac__state prac__state--call" aria-label="созвон"><Video size={14} strokeWidth={2.2} /></span>
                    : <span className="prac__state" aria-label="не начато" />}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
