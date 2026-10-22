import React from 'react';
import { ChevronLeft, Pause } from 'lucide-react';

// Мини-версия TrainerCabinet.jsx: ученики потока и их дни. Имена условные, помечено в подписи.
const STUDENTS = [
  { name: 'Алёна', days: [1, 1, 1, 1, 1, 1, 1, 1, 1, 0.5, 0, 0], note: 'день 10' },
  { name: 'Игорь', days: [1, 1, 1, 0, 1, 1, 1, 1, 0.5, 0, 0, 0], note: 'пропуск в день 4' },
  { name: 'Нина', days: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0.5, 0], note: 'день 11' },
  { name: 'Тимур', days: [1, 1, 0.5, 0, 0, 0, 0, 0, 0, 0, 0, 0], note: 'на паузе', paused: true },
  { name: 'Света', days: [1, 1, 1, 1, 1, 1, 0.5, 0, 0, 0, 0, 0], note: 'день 7' },
];

export default function CabinetScreen({ onBack }) {
  return (
    <div className="scr">
      <div className="scr__top glass-strong">
        <button type="button" className="scr__back" onClick={onBack} aria-label="Назад"><ChevronLeft size={22} strokeWidth={2} /></button>
        <div className="scr__title">Группа 2</div>
        <span style={{ width: 42 }} />
      </div>

      <div className="scr__body">
        <div className="cab__head"><span>Ученик</span><span>Дни с 1 по 12</span></div>
        <ul className="cab">
          {STUDENTS.map((s) => (
            <li key={s.name} className="cab__row glass">
              <span className="cab__name">{s.name}{s.paused && <Pause size={12} strokeWidth={2.6} aria-label="на паузе" />}</span>
              <span className="cab__days" aria-label={`${s.name}: ${s.note}`}>
                {s.days.map((d, idx) => (
                  <span key={idx} className={`cell${d === 1 ? ' cell--done' : d === 0.5 ? ' cell--half' : ''}`} />
                ))}
              </span>
              <span className="cab__note">{s.note}</span>
            </li>
          ))}
        </ul>
        <p className="cab__foot">Имена учеников условные</p>
      </div>
    </div>
  );
}
