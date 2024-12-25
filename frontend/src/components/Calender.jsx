import React, { useState, useEffect } from "react";
import "../styles/calender.css";

function Calendar() {
  // Initialize the current date
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentDay, setCurrentDay] = useState(today.getDate());
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Event 1",
      year: 2024,
      month: 10, // November (zero-based index)
      day: 21
    },
    {
      id: 2,
      title: "Event 2",
      year: 2024,
      month: 10,
      day: 22
    },
    {
      id: 3,
      title: "Event 3",
      year: 2024,
      month: 10,
      day: 19
    },
    {
      id: 4,
      title: "Event 4",
      year: 2024,
      month: 10 ,// September (zero-based index)
      day: 19
    }
  ]);

  // Month names for display
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  // Get the first day of the current month and the last date of the current month
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();
  const getLastDateOfMonth = (year, month) => new Date(year, month + 1, 0).getDate();

  // Handle the navigation (next/previous month)
  const handleMonthChange = (direction) => {
    let newMonth = currentMonth + direction;
    let newYear = currentYear;

    if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    }

    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  // Handle date selection from the input
  const handleDateSelect = (e) => {
    const selectedDate = new Date(e.target.value);
    setCurrentMonth(selectedDate.getMonth());
    setCurrentYear(selectedDate.getFullYear());
    setCurrentDay(selectedDate.getDate());
  };

  // Generate the calendar grid
  const generateCalendarGrid = () => {
    const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);
    const lastDateOfMonth = getLastDateOfMonth(currentYear, currentMonth);
    const lastDateOfLastMonth = getLastDateOfMonth(currentYear, currentMonth - 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth, lastDateOfMonth).getDay();

    let gridDays = [];

    // Fill days of the previous month
    for (let i = firstDayOfMonth; i > 0; i--) {
      gridDays.push({
        date: lastDateOfLastMonth - i + 1,
        isCurrentMonth: false,
        events: []  // Initialize with empty events
      });
    }

    // Fill days of the current month
    for (let i = 1; i <= lastDateOfMonth; i++) {
      const dayEvents = events.filter(event => event.day === i && event.month === currentMonth && event.year === currentYear);
      
      // Check if this day is today
      const isToday = i === currentDay && currentMonth === today.getMonth() && currentYear === today.getFullYear();
      
      gridDays.push({
        date: i,
        isCurrentMonth: true,
        events: dayEvents,  // Include events for the day
        isToday: isToday    // Mark this day as 'today' if it matches
      });
    }

    // Fill days of the next month
    for (let i = lastDayOfMonth; i < 6; i++) {
      gridDays.push({
        date: i - lastDayOfMonth + 1,
        isCurrentMonth: false,
        events: []  // Initialize with empty events
      });
    }

    return gridDays;
  };

  // Get the current month's grid
  const calendarGrid = generateCalendarGrid();

  // useEffect(() => {
  // }, [currentDate, currentMonth, currentYear]);

  return (
    <div className="wrapper">
      <header>
        <p className="current-date">
          {currentDay} / {monthNames[currentMonth]} / {currentYear}
        </p>
        <div>
          <input type="date" placeholder="Select a date" onChange={handleDateSelect} />
          <p className="choose-date">{monthNames[currentMonth]} / {currentYear}</p>
        </div>
        <div className="icons">
          <span id="prev" onClick={() => handleMonthChange(-1)}>{"<"}</span>
          <span id="next" onClick={() => handleMonthChange(1)}>{">"}</span>
        </div>
      </header>
      <div className="calendar">
        <ul className="weeks">
          <li>Sun</li>
          <li>Mon</li>
          <li>Tue</li>
          <li>Wed</li>
          <li>Thu</li>
          <li>Fri</li>
          <li>Sat</li>
        </ul>
        <ul className="days">
          {calendarGrid.map((day, index) => (
            <li 
              key={index} 
              className={`li ${!day.isCurrentMonth ? "inactive" : ""} ${day.isToday ? "active" : ""}`} 
              data-day={day.date}
            >
              <span>{day.date}</span>
              {day.events.length > 0 && (
                <div className="content">
                  <div className="event">
                    <p>{day.events[0].title}</p>
                    <p>{day?.events[1]?.title}</p>

                  </div>
                  {day.events.length > 1 && <p className="event-count">items: {day.events.length}</p>}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Calendar;
