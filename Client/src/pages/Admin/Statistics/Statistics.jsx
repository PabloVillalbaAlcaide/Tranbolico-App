import {StatisticsUsers} from '../../../components/Admin/StatisticsComponents/StatisticsUsers'
import {StatisticsRoutes } from '../../../components/Admin/StatisticsComponents/StatisticsRoutes'
import { StatisticsAge } from '../../../components/Admin/StatisticsComponents/StatisticsAge'
import { StatisticsGenre } from "../../../components/Admin/StatisticsComponents/StatisticsGenre";


export const Statistics = () => {
  return (
    <>
    <StatisticsUsers/>
    <StatisticsRoutes/>
    <StatisticsAge/> 
    <StatisticsGenre />
    </>
  );
};
