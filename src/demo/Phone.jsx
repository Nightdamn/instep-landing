import React from 'react';
import './demo.css';

// Кадр телефона: внутри тот же фон и орбы, что в Layout.jsx приложения. Ширина содержимого 390.
export default function Phone({ children, className = '', label, height = 640 }) {
  return (
    <div className={`phone ${className}`} role="group" aria-label={label || 'Экран приложения InStep'} style={{ '--screen-h': `${height}px` }}>
      <div className="phone__screen">
        <div className="phone__orb phone__orb--a" aria-hidden="true" />
        <div className="phone__orb phone__orb--b" aria-hidden="true" />
        <div className="phone__status" aria-hidden="true"><span>9:41</span><span className="phone__signal" /></div>
        <div className="phone__content">{children}</div>
      </div>
    </div>
  );
}
