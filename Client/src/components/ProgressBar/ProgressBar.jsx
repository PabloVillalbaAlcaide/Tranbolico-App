import { useEffect, useState } from "react";
import "./ProgressBar.scss";

export const ProgressBar = ({ date }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (window.location.href.includes("routes")) {
      setProgress(1);
    }
    if (window.location.href.includes("reservations")) {
      setProgress(2);
    }
    if (window.location.href.includes("returnDate")) {
      setProgress(3);
    }
    if (window.location.href.includes("detailReservation")) {
      setProgress(4);
    }
  }, [date]);

  return (
    <>
      <div className={`ProgressBar-container`}>
        <div className="progress-bus-container">
          <div className={`ProgressBar-bus-${progress} `}></div>
        </div>
        <div className="ProgressBar-barra-container row">
          <div className={`col-3 ProgressBar-barra-1-${progress}`}></div>
          <div className={`col-3 ProgressBar-barra-2-${progress}`}></div>
          <div className={`col-3 ProgressBar-barra-3-${progress}`}></div>
          <div className={`col-3 ProgressBar-barra-4-${progress}`}></div>
        </div>
      </div>
    </>
  );
};
