import { useCallback, useMemo } from "react";
import { DayPicker } from "react-day-picker";
import { es } from "date-fns/locale";
import { format, isSameDay, parseISO } from "date-fns";
import "react-day-picker/style.css";
import "./datePicker.scss";

export const TranbolicoDatePicker = ({ date, setDate, planningList }) => {
  const allowedDates = useMemo(
    () => planningList.map((elem) => parseISO(elem.departure_date)),
    [planningList]
  );

  const isAllowedDate = useCallback(
    (date) => {
      return allowedDates.some((allowedDate) => isSameDay(date, allowedDate));
    },
    [allowedDates]
  );

  const handleDateChange = (newDate) => {
    if (newDate instanceof Date && !isNaN(newDate)) {
      if (isAllowedDate(newDate)) {
        const formattedDate = format(newDate, "yyyy-MM-dd");
        setDate(formattedDate);
      }
    }
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <DayPicker
      mode="single"
      selected={date}
      onSelect={handleDateChange}
      disabled={(day) => !isAllowedDate(day)}
      modifiers={{ allowed: allowedDates }}
      modifiersClassNames={{
        weekend: "weekend-day",
        today: "today-day",
        allowed: "allowed-day",
      }}
      locale={es}
      formatters={{
        formatCaption: (date) =>
          capitalizeFirstLetter(format(date, "MMMM yyyy", { locale: es })),
        formatWeekdayName: (date) => format(date, "EEEEEE", { locale: es }),
      }}
    />
  );
};
