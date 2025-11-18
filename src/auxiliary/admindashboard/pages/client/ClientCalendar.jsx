import React, { useState } from "react";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import  RequestForm from "../client/modal/RequestForm.jsx";



function ClientCalendar() {
  const [value, setValue] = useState(new Date());
  const [showDetails, setShowDetails] = useState(false); // 👈 hidden div toggle

  const handleDateClick = (date) => {
    setValue(date);
    setShowDetails(true); // 👈 show hidden div when a date is clicked
  };

  const handleBackClick = () => {
    setShowDetails(false); // hide details when button is clicked
  };


  return (
    <div className="calendar-container">
      <h2>Calendar</h2>

      <Calendar
        onChange={handleDateClick}
        value={value}
        className="custom-calendar"
      />

      <p className="mt-3">
        📅 Selected Date: <strong>{value.toDateString()}</strong>
      </p>

      {/* 👇 Hidden div that shows up after clicking a date */}
      {showDetails && (
        <div className="request_form">
          <div className="requestNav flex-grow-2">
          <p className="requestTitle mt-2">Request Form</p>

          <button
            className="btn flex-grow-1"
            onClick={handleBackClick}
          >
            ❌
          </button>

          

          </div>
          <RequestForm />


        </div>
      )}
    </div>
  );
}


export default ClientCalendar;