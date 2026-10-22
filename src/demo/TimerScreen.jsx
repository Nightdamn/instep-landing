import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, Pause, Play } from 'lucide-react';

// Живая мини-версия Timer.jsx: круговой таймер, идёт по-настоящему, пауза и «Готово».
const R = 92;
const C = 2 * Math.PI * R;

function fmt(s) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec < 10 ? '0' : ''}${sec}`;
}

export default function TimerScreen({ label = 'Прогулка', minutes = 20, icon = '/icons/walking.svg', running: runningProp = true, onBack }) {
  const total = minutes * 60;
  const [elapsed, setElapsed] = useState(Math.round(total * 0.37));
  const [running, setRunning] = useState(runningProp);
  const ref = useRef(null);
  const visible = useRef(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return undefined;
    const io = new IntersectionObserver(([e]) => { visible.current = e.isIntersecting; }, { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!running) return undefined;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return undefined;
    const id = setInterval(() => {
      if (!visible.current) return;
      setElapsed((e) => (e + 1 >= total ? 0 : e + 1));
    }, 1000);
    return () => clearInterval(id);
  }, [running, total]);

  const left = total - elapsed;
  const offset = C * (1 - elapsed / total);

  return (
    <div className="scr" ref={ref}>
      <div className="scr__top glass-strong">
        <button type="button" className="scr__back" onClick={onBack} aria-label="Назад к дню"><ChevronLeft size={22} strokeWidth={2} /></button>
        <div className="scr__title">{label}</div>
        <span style={{ width: 42 }} />
      </div>

      <div className="scr__body scr__body--center">
        <div className="media-tile">
          <img src={icon} alt="" />
          <span>Видео мастера</span>
        </div>

        <div className="ring" role="timer" aria-live="off" aria-label={`Осталось ${fmt(left)}`}>
          <svg viewBox="0 0 220 220" width="220" height="220" aria-hidden="true">
            <defs>
              <linearGradient id="ring-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#27ae60" /><stop offset="1" stopColor="#2ecc71" />
              </linearGradient>
            </defs>
            <circle cx="110" cy="110" r={R} className="ring__track" />
            <circle cx="110" cy="110" r={R} className="ring__fill" strokeDasharray={C} strokeDashoffset={offset} transform="rotate(-90 110 110)" />
            <circle cx="110" cy="110" r={R} className="ring__knob" strokeDasharray={`2 ${C}`} strokeDashoffset={offset + 1} transform="rotate(-90 110 110)" />
          </svg>
          <div className="ring__time"><span className="ring__num">{fmt(left)}</span><span className="ring__of">из {minutes}:00</span></div>
        </div>

        <div className="scr__controls">
          <button type="button" className="pill pill--ghost" onClick={() => setRunning((v) => !v)} aria-pressed={!running}>
            {running ? <Pause size={16} strokeWidth={2.2} /> : <Play size={16} strokeWidth={2.2} />}
            {running ? 'Пауза' : 'Продолжить'}
          </button>
          <button type="button" className="pill pill--ink" onClick={() => setElapsed(total - 1)}>Готово</button>
        </div>
      </div>
    </div>
  );
}
