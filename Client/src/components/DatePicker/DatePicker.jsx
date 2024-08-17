import { useEffect, useState } from "react";
import DatePicker from "react-date-picker";
import "./datePicker.scss";

const TranbolicoDatePicker = ({date, setDate, planningList}) => {
  const [allowedDates, setAllowedDates] = useState([])
  
  useEffect(()=>{
    setAllowedDates(planningList.map((elem)=>{
      const newDate = elem.departure_date.replace(/-/g,", ")
      return new Date(newDate);
    }))
  },[planningList])
  console.log("Fechas disponibles",allowedDates);
  

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
      setDate(date);
    }
  }

  return (
    <div className="tranbolico-datepicker">
      <DatePicker
        onChange={handleDateChange}
        value={date}
        highlightDates={allowedDates}
      />
    </div>
  );
};

export default TranbolicoDatePicker;
