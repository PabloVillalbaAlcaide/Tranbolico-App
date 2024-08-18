import { useEffect, useState } from "react";
import DatePicker from "react-date-picker";
import "./datePicker.scss";

const TranbolicoDatePicker = ({date, setDate, planningList}) => {
  const [allowedDates, setAllowedDates] = useState([])
  const today = new Date()
  
  useEffect(()=>{
    setAllowedDates(planningList.map((elem)=>{
      const newDate = elem.departure_date.replace(/-/g,", ")
      return new Date(newDate);
    }))
  },[planningList]) 

  const isAllowedDate  = (date) => {
    return allowedDates.some(
      (allowedDate) =>
        date.getFullYear() === allowedDate.getFullYear() &&
        date.getMonth() === allowedDate.getMonth() &&
        date.getDate() === allowedDate.getDate()
    );
  };

  const handleDateChange = (date) => {
    if (isAllowedDate(date)){
      setDate(formatDate(date));
    }
  }

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month' && isAllowedDate(date)) {
      return 'react-calendar__tile--allowed';
    }
    return null;
  };

  return (
    <div className="tranbolico-datepicker">
     {allowedDates && <DatePicker
        onChange={handleDateChange}
        value={date}
        highlightDates={allowedDates}
        minDate={today}
        isOpen={true}
        calendarIcon={null}
        clearIcon={null}
        tileClassName={tileClassName}
        className="tranbolico-datepicker"
      />}
    </div>
  );
};

export default TranbolicoDatePicker;
