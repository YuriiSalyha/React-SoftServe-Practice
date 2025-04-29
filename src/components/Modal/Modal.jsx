// src/components/Modal/Modal.jsx
import React, { useState, useEffect } from 'react';
import styles from '../../styles/modal.module.css';

function Modal({ isOpen, onClose, poster, title, hall }) {
  const [sessionsData, setSessionsData]     = useState([]);
  const [selectedDate, setSelectedDate]     = useState('');
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedTime, setSelectedTime]     = useState('');
  const [availableTimes, setAvailableTimes] = useState([]);

  // Seat numbers (1..freeSeats)
  const [maxSeats, setMaxSeats]       = useState(0);
  const [selectedSeat, setSelectedSeat] = useState('');

  const [name, setName]   = useState('');
  const [phone, setPhone] = useState('');
  const [isOrdered, setIsOrdered] = useState(false);

  // 1) Load sessions when modal opens
  useEffect(() => {
    if (!isOpen) return;
    // reset all form fields
    setSelectedDate('');
    setSelectedTime('');
    setSelectedSeat('');
    setName('');
    setPhone('');
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

  // 2) When date changes → update times
  useEffect(() => {
    setSelectedTime('');
    setAvailableTimes([]);
    setSelectedSeat('');
    setMaxSeats(0);

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

  // 3) When time changes → compute free seats
  useEffect(() => {
    setSelectedSeat('');
    setMaxSeats(0);

    if (!selectedTime) return;
    const session = sessionsData.find(
      s => s.hall === hall && s.date === selectedDate && s.time === selectedTime
    );
    if (session) {
      const free = session.numberOfSeats - session.bookedSeats;
      setMaxSeats(free > 0 ? free : 0);
    }
  }, [selectedTime, selectedDate, sessionsData, hall]);

  const handleConfirm = e => {
    e.preventDefault();
    // final check: all fields filled, including seat
    if (selectedDate && selectedTime && name && phone && selectedSeat) {
      setIsOrdered(true);
      // тут можна відправити дані на сервер
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
              {`Session: ${selectedDate} at ${selectedTime}, Seat #${selectedSeat}`}
            </p>
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleConfirm}>
            <div className={styles.movieInfo}>
              <img src={poster} alt={`Poster of ${title}`} className={styles.poster}/>
              <h2 className={styles.title}>{title}</h2>
            </div>
            <p className={styles.sessionDetails}>Hall: <span>{hall}</span></p>

            {/* Date */}
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

            {/* Time */}
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

            {/* Personal data */}
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

            {/* Seat selector appears only after name & phone */}
            {name && phone && maxSeats > 0 && (
              <label className={styles.label}>
                Select Seat:
                <select
                  className={styles.input}
                  value={selectedSeat}
                  onChange={e => setSelectedSeat(e.target.value)}
                  required
                >
                  <option value="">Choose your seat</option>
                  {Array.from({ length: maxSeats }, (_, i) => i + 1).map(num => (
                    <option key={num} value={num}>{`#${num}`}</option>
                  ))}
                </select>
              </label>
            )}

            <button
              type="submit"
              className={styles.confirmButton}
              disabled={!(selectedDate && selectedTime && name && phone && selectedSeat)}
            >
              Book Ticket
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Modal;
