import React, { useState } from "react";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";



function CalendarPage() {
  const [value, setValue] = useState(new Date());

  return (
    <div className="calendar-container">
      <h2>Calendar</h2>

      <Calendar
        onChange={setValue}
        value={value}
        className="custom-calendar"
      />

      <p className="mt-3">
        📅 Selected Date: <strong>{value.toDateString()}</strong>
      </p>
    </div>
  );
}


export default CalendarPage;