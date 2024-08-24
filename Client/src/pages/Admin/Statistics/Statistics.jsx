import React from "react";
import { StatisticsUsers } from "../../../components/Admin/StatisticsComponents/StatisticsUsers";
import { StatisticsGenre } from "../../../components/Admin/StatisticsComponents/StatisticsGenre";

export const Statistics = () => {
  return (
    <>
      <StatisticsUsers />
      <StatisticsGenre />
    </>
  );
};
