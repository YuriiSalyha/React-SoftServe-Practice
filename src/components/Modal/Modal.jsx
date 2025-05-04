// src/components/Modal/Modal.jsx
import React, { useState, useEffect } from 'react';
import styles from '../../styles/modal.module.css';

function Modal({ isOpen, onClose, poster, title, hall }) {
  // дані сеансів
  const [sessionsData, setSessionsData]     = useState([]);
  // вибрані дата/час
  const [selectedDate, setSelectedDate]     = useState('');
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedTime, setSelectedTime]     = useState('');
  const [availableTimes, setAvailableTimes] = useState([]);

  // список реально зайнятих місць для поточної сесії
  const [bookedSeatsList, setBookedSeatsList] = useState([]);
  // список місць, які користувач обрав у цьому вікні
  const [selectedSeats, setSelectedSeats]     = useState([]);

  // для форми
  const [name, setName]   = useState('');
  const [phone, setPhone] = useState('');
  const [isOrdered, setIsOrdered] = useState(false);

  // 1) Завантажити сесії при відкритті модального
  useEffect(() => {
    if (!isOpen) return;
    setSelectedDate('');
    setSelectedTime('');
    setName('');
    setPhone('');
    setSelectedSeats([]);
    setBookedSeatsList([]);
    setIsOrdered(false);

    fetch('/data/sessions.json')
      .then(res => res.json())
      .then(data => {
        setSessionsData(data);
        const dates = Array.from(
          new Set(data.filter(s => s.hall === hall).map(s => s.date))
        );
        setAvailableDates(dates);
      })
      .catch(console.error);
  }, [isOpen, hall]);

  // 2) Оновлюємо список часу при зміні дати
  useEffect(() => {
    setSelectedTime('');
    setAvailableTimes([]);
    setSelectedSeats([]);
    setBookedSeatsList([]);

    if (!selectedDate) return;
    const times = Array.from(
      new Set(
        sessionsData
          .filter(s => s.hall === hall && s.date === selectedDate)
          .map(s => s.time)
      )
    );
    setAvailableTimes(times);
  }, [selectedDate, sessionsData, hall]);

  // 3) При виборі часу – формуємо список зайнятих місць
  useEffect(() => {
    setSelectedSeats([]);
    setBookedSeatsList([]);

    if (!selectedTime) return;
    const session = sessionsData.find(
      s => s.hall === hall && s.date === selectedDate && s.time === selectedTime
    );
    if (session) {
      // якщо в session.bookedSeatsList є конкретні номери місць – використовуємо їх,
      // інакше беремо перші N місць (кількість bookedSeats)
      const booked = Array.isArray(session.bookedSeatsList)
        ? session.bookedSeatsList
        : Array.from({ length: session.bookedSeats }, (_, i) => i + 1);
      setBookedSeatsList(booked);
    }
  }, [selectedTime, selectedDate, sessionsData, hall]);

  // Тоггл вибору місця в сітці
  const handleSeatClick = (seatNumber) => {
    if (bookedSeatsList.includes(seatNumber)) return; // не клікаємо по червоних
    setSelectedSeats(prev =>
      prev.includes(seatNumber)
        ? prev.filter(n => n !== seatNumber)
        : [...prev, seatNumber]
    );
  };

  // Підтвердження замовлення
  const handleConfirm = e => {
    e.preventDefault();
    if (selectedDate && selectedTime && name && phone && selectedSeats.length) {
      setIsOrdered(true);
      // тут можна відправити selectedSeats разом з іншими даними на сервер
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose} aria-label="Close">×</button>

        {isOrdered ? (
          <div className={styles.successMessage}>
            <p>Your ticket has been successfully booked!</p>
            <p>
              {`Session: ${selectedDate} at ${selectedTime}, Seats: ${selectedSeats.join(', ')}`}
            </p>
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleConfirm}>
            {/* Інформація про фільм */}
            <div className={styles.movieInfo}>
              <img src={poster} alt={`Poster of ${title}`} className={styles.poster}/>
              <h2 className={styles.title}>{title}</h2>
            </div>
            <p className={styles.sessionDetails}>Hall: <span>{hall}</span></p>

            {/* Дата */}
            <label className={styles.label}>
              Session Date:
              <select
                className={styles.input}
                value={selectedDate}
                onChange={e => setSelectedDate(e.target.value)}
                required
              >
                <option value="">Select a date</option>
                {availableDates.map(date => (
                  <option key={date} value={date}>{date}</option>
                ))}
              </select>
            </label>

            {/* Час */}
            <label className={styles.label}>
              Session Time:
              <select
                className={styles.input}
                value={selectedTime}
                onChange={e => setSelectedTime(e.target.value)}
                disabled={!availableTimes.length}
                required
              >
                <option value="">Select a time</option>
                {availableTimes.map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </label>

            {/* Персональні дані */}
            <label className={styles.label}>
              Your Name:
              <input
                type="text"
                className={styles.input}
                placeholder="Enter your name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </label>

            <label className={styles.label}>
              Phone Number:
              <input
                type="tel"
                className={styles.input}
                placeholder="Enter your phone"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                required
              />
            </label>

            {/* Сітка місць */}
            {name && phone && selectedTime && (
              <div className={styles.seatsSection}>
                <p className={styles.label}>Select Your Seats:</p>
                <div className={styles.seatsGrid}>
                  {Array.from({ length: 5 }).map((_, row) => (
                    <div key={row} className={styles.seatRow}>
                      {Array.from({ length: 12 }).map((_, col) => {
                        const seatNumber = row * 12 + col + 1;
                        const isBooked   = bookedSeatsList.includes(seatNumber);
                        const isSelected = selectedSeats.includes(seatNumber);
                        const cls = [
                          styles.seat,
                          isBooked   ? styles.booked  : '',
                          isSelected ? styles.selected : ''
                        ].join(' ');
                        return (
                          <div
                            key={seatNumber}
                            className={cls}
                            onClick={() => handleSeatClick(seatNumber)}
                          >
                            {seatNumber}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Кнопка підтвердження */}
            <button
              type="submit"
              className={styles.confirmButton}
              disabled={!(selectedDate && selectedTime && name && phone && selectedSeats.length)}
            >
              Book Tickets
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Modal;
