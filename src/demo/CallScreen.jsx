import React, { useEffect, useState } from 'react';
import { ChevronLeft, Video, Play, Clock } from 'lucide-react';

// Мини-версия практики «Онлайн с мастером»: до звонка обратный отсчёт, после - запись в той же практике.
function fmtHMS(s) {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const p = (n) => (n < 10 ? `0${n}` : `${n}`);
  return `${h}:${p(m)}:${p(sec)}`;
}

export default function CallScreen({ mode = 'before', onBack, onToggle }) {
  const [left, setLeft] = useState(1 * 3600 + 45 * 60 + 30);
  useEffect(() => {
    if (mode !== 'before') return undefined;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;
    const id = setInterval(() => setLeft((v) => (v > 0 ? v - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, [mode]);

  return (
    <div className="scr">
      <div className="scr__top glass-strong">
        <button type="button" className="scr__back" onClick={onBack} aria-label="Назад к дню"><ChevronLeft size={22} strokeWidth={2} /></button>
        <div className="scr__title">Разбор недели</div>
        <span style={{ width: 42 }} />
      </div>

      <div className="scr__body">
        {mode === 'before' ? (
          <div className="card glass call">
            <span className="call__icon"><Video size={22} strokeWidth={2} /></span>
            <div className="call__kicker">Начало через</div>
            <div className="call__count" aria-live="off">{fmtHMS(left)}</div>
            <dl className="call__facts">
              <div><dt>Когда</dt><dd>четверг, 19:00</dd></div>
              <div><dt>Ведёт</dt><dd>Мария Коломбина</dd></div>
            </dl>
            <span className="pill pill--ink pill--full" aria-disabled="true">Войти в созвон</span>
            <p className="call__hint">Вход откроется за 5 минут до начала</p>
          </div>
        ) : (
          <div className="card glass call">
            <div className="rec">
              <span className="rec__play" aria-hidden="true"><Play size={20} strokeWidth={2.4} /></span>
              <span className="rec__label">Запись созвона</span>
              <span className="rec__len"><Clock size={12} strokeWidth={2.2} /> 48:12</span>
            </div>
            <p className="call__after">Запись появилась сама после встречи. Досмотрите её до конца, и день засчитается.</p>
            <div className="bar" role="progressbar" aria-valuenow={62} aria-valuemin={0} aria-valuemax={100} aria-label="Просмотрено записи"><div className="bar__fill" style={{ '--p': 0.62 }} /></div>
          </div>
        )}

        <button type="button" className="scr__switch" onClick={onToggle}>
          {mode === 'before' ? 'Показать, как это выглядит после созвона' : 'Показать до созвона'}
        </button>
      </div>
    </div>
  );
}
