import { useState } from "react";
import { Outlet } from "react-router-dom";

export const Historical = () => {
  const [hist, setHist] = useState("historical");
  return (
    <>
      <Outlet context={{ hist }} />
    </>
  );
};
