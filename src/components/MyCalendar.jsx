import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";

const MyCalendar = () => {
  const [date, setDate] = useState(new Date());

  const onChange = (date) => {
    setDate(date);
    // Handle date change event
  };

  return (
    <div>
      <Calendar
        onChange={onChange}
        value={date}
        // Add any additional props or customization here
      />
    </div>
  );
};

export default MyCalendar;
