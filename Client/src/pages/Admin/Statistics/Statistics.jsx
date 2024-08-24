import {StatisticsUsers} from '../../../components/Admin/StatisticsComponents/StatisticsUsers'
import { StatisticsAge } from '../../../components/Admin/StatisticsComponents/StatisticsAge'
import { StatisticsGenre } from "../../../components/Admin/StatisticsComponents/StatisticsGenre";

export const Statistics = () => {
  return (
    <>
    <StatisticsUsers/>
    <StatisticsAge/> 
    <StatisticsGenre />
    </>
  );
};
