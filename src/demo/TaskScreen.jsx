import React, { useState } from 'react';
import { ChevronLeft, Paperclip, FileVideo, Check, CornerUpLeft } from 'lucide-react';

// Мини-версия TaskPage.jsx: ответ, файл, отправка на проверку, статус от мастера.
const STATES = ['draft', 'review', 'accepted', 'returned'];
const TEXT = {
  draft: null,
  review: { label: 'На проверке', cls: 'status--review' },
  accepted: { label: 'Зачтено', cls: 'status--ok' },
  returned: { label: 'Возвращено', cls: 'status--back' },
};

export default function TaskScreen({ onBack, master = false }) {
  const [i, setI] = useState(master ? 1 : 1);
  const state = STATES[i];
  const st = TEXT[state];

  if (master) {
    return (
      <div className="scr">
        <div className="scr__top glass-strong">
          <button type="button" className="scr__back" onClick={onBack} aria-label="Назад"><ChevronLeft size={22} strokeWidth={2} /></button>
          <div className="scr__title">Ответы на задания</div>
          <span style={{ width: 42 }} />
        </div>
        <div className="scr__body">
          <div className="card glass task">
            <div className="task__student"><span className="quote__avatar" aria-hidden="true">А</span><span><strong>Алёна</strong><br /><span className="task__size">День 9, видео походки</span></span></div>
            <div className="task__answer">
              <p>Левая стопа ставится носком наружу, вес уходит на пятку. На третьем круге стало ровнее.</p>
            </div>
            <div className="task__file"><FileVideo size={16} strokeWidth={2} /><span>pokhodka-sboku.mp4</span><span className="task__size">148 МБ</span></div>
            {state === 'accepted' || state === 'returned' ? (
              <div className={`status ${TEXT[state].cls}`}>
                {state === 'accepted' ? <Check size={14} strokeWidth={3} /> : <CornerUpLeft size={14} strokeWidth={2.4} />}
                <span>{TEXT[state].label}</span>
                <span className="status__note">{state === 'accepted' ? 'Ученица увидит зачёт на своём дне' : 'Комментарий ушёл ученице, задание снова в невыполненных'}</span>
              </div>
            ) : (
              <div className="task__actions">
                <button type="button" className="pill pill--ghost" onClick={() => setI(3)}><CornerUpLeft size={14} strokeWidth={2.4} /> Вернуть</button>
                <button type="button" className="pill pill--ink pill--grow" onClick={() => setI(2)}><Check size={14} strokeWidth={3} /> Зачесть</button>
              </div>
            )}
          </div>
          <div className="task__queue"><span>Ещё на проверке</span><span className="scr__num">3</span></div>
          {(state === 'accepted' || state === 'returned') && (
            <button type="button" className="scr__switch" onClick={() => setI(1)}>Сбросить пример</button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="scr">
      <div className="scr__top glass-strong">
        <button type="button" className="scr__back" onClick={onBack} aria-label="Назад к дню"><ChevronLeft size={22} strokeWidth={2} /></button>
        <div className="scr__title">Видео походки</div>
        <span style={{ width: 42 }} />
      </div>

      <div className="scr__body">
        <div className="card glass task">
          <p className="task__brief">Снимите 30 секунд своей обычной походки сбоку и напишите, что заметили в опоре.</p>
          <div className="task__answer">
            <p>Левая стопа ставится носком наружу, вес уходит на пятку. На третьем круге стало ровнее.</p>
          </div>
          <div className="task__file"><FileVideo size={16} strokeWidth={2} /><span>pokhodka-sboku.mp4</span><span className="task__size">148 МБ</span></div>

          {st ? (
            <div className={`status ${st.cls}`}>
              {state === 'accepted' && <Check size={14} strokeWidth={3} />}
              {state === 'returned' && <CornerUpLeft size={14} strokeWidth={2.4} />}
              <span>{st.label}</span>
              {state === 'returned' && <span className="status__note">Мария: «Сними ещё раз при дневном свете»</span>}
              {state === 'accepted' && <span className="status__note">День засчитан</span>}
            </div>
          ) : (
            <div className="task__actions">
              <span className="pill pill--ghost"><Paperclip size={14} strokeWidth={2.2} /> Файл</span>
              <span className="pill pill--ink pill--grow">Отправить на проверку</span>
            </div>
          )}
        </div>

        <button type="button" className="scr__switch" onClick={() => setI((v) => (v + 1) % STATES.length)}>
          Следующее состояние
        </button>
      </div>
    </div>
  );
}
