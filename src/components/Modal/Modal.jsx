// src/components/Modal/Modal.jsx
import React, { useState, useEffect } from 'react';
import styles from '../../styles/modal.module.css';

function Modal({ isOpen, onClose, poster, title, hall }) {
  const [sessionsData, setSessionsData] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedTime, setSelectedTime] = useState('');
  const [availableTimes, setAvailableTimes] = useState([]);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isOrdered, setIsOrdered] = useState(false);

  // 1) Завантажити дані при відкритті модалки
  useEffect(() => {
    if (!isOpen) return;
    // скинути попередні стани
    setSelectedDate('');
    setSelectedTime('');
    setName('');
    setPhone('');
    setIsOrdered(false);

    fetch('/data/sessions.json')
      .then(res => res.json())
      .then(data => {
        setSessionsData(data);
        // одразу сформуємо можливі дати для даного залу
        const dates = Array.from(
          new Set(
            data
              .filter(s => s.hall === hall)
              .map(s => s.date)
          )
        );
        setAvailableDates(dates);
      })
      .catch(err => console.error('Не вдалося завантажити сесії:', err));
  }, [isOpen, hall]);

  // 2) Коли змінюється selectedDate — оновлюємо availableTimes
  useEffect(() => {
    if (!selectedDate) {
      setAvailableTimes([]);
      setSelectedTime('');
      return;
    }
    const times = Array.from(
      new Set(
        sessionsData
          .filter(s => s.hall === hall && s.date === selectedDate)
          .map(s => s.time)
      )
    );
    setAvailableTimes(times);
    setSelectedTime('');
  }, [selectedDate, sessionsData, hall]);

  const handleConfirm = e => {
    e.preventDefault();
    if (selectedDate && selectedTime && name.trim() && phone.trim()) {
      setIsOrdered(true);
      // тут можна ще відправити на сервер
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose} aria-label="Закрити">×</button>

        {isOrdered ? (
          <div className={styles.successMessage}>
            <p>Квиток успішно замовлено!</p>
          </div>
        ) : (
          <div className={styles.content}>
            <div className={styles.movieInfo}>
              <img src={poster} alt={`Постер ${title}`} className={styles.poster} />
              <h2 className={styles.title}>{title}</h2>
            </div>
            <p className={styles.sessionDetails}>
              Зал: <span>{hall}</span>
            </p>

            <form className={styles.form} onSubmit={handleConfirm}>
              {/* Дата */}
              <label className={styles.label}>
                Дата сеансу:
                <select
                  className={styles.input}
                  value={selectedDate}
                  onChange={e => setSelectedDate(e.target.value)}
                  required
                >
                  <option value="">Оберіть день</option>
                  {availableDates.map(d => (
                    <option key={d} value={d}>
                      {new Date(d).toLocaleDateString('uk-UA', { day: '2-digit', month: 'long', year: 'numeric' })}
                    </option>
                  ))}
                </select>
              </label>

              {/* Час */}
              <label className={styles.label}>
                Час сеансу:
                <select
                  className={styles.input}
                  value={selectedTime}
                  onChange={e => setSelectedTime(e.target.value)}
                  disabled={!availableTimes.length}
                  required
                >
                  <option value="">Оберіть час</option>
                  {availableTimes.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </label>

              {/* Ім'я */}
              <input
                type="text"
                placeholder="Ваше ім'я"
                className={styles.input}
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />

              {/* Телефон */}
              <input
                type="tel"
                placeholder="Ваш номер телефону"
                className={styles.input}
                value={phone}
                onChange={e => setPhone(e.target.value)}
                required
              />

              <button
                type="submit"
                className={styles.confirmButton}
                disabled={!selectedDate || !selectedTime || !name || !phone}
              >
                Замовити квиток
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Modal;
