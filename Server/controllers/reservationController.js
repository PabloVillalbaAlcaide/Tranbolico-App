const connection = require("../config/db");

class ReservationController {
  oneWayTrip = (req, res) => {
    console.log(req);
    const { search } = req.query;
    console.log(search);
    let sql = `SELECT city.city_name, province.name FROM city, province WHERE city.province_id = province.province_id AND (city.city_name LIKE "${search}%" OR province.name LIKE "${search}%")`;
    connection.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(result);
      }
    });
  };

  returnTrip = (req, res) => {
    const { search, city, province } = req.query;
    let sql = `SELECT province.name AS name, city.city_name AS city_name FROM route JOIN city ON route.arrival_province_id = city.province_id AND route.arrival_city_id = city.city_id
    JOIN province ON city.province_id = province.province_id WHERE route.departure_city_id = (SELECT city_id FROM city WHERE city_name = '${city}' AND province_id = (SELECT province_id FROM province WHERE name = '${province}')) AND (province.name LIKE '${search}%' OR city.city_name LIKE '${search}%')`;
    connection.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(result);
      }
    });
  };

  historical = (req, res) => {
    console.log("Hasta aqui");

    const userID = req.params.id;
    console.log(userID);

    let sql = `SELECT
    reservation.user_id,
    reservation.reservation_id,
    reservation.reservation_type,
    route.text AS route_name,
    planning.departure_date AS departure_day,
    planning.departure_time AS departure_time,
    dp.name AS departure_province_name,
    dc.city_name AS departure_city_name,
    ap.name AS arrival_province_name,
    ac.city_name AS arrival_city_name
FROM reservation JOIN planning ON reservation.route_id = planning.route_id AND reservation.planning_id = planning.planning_id
JOIN route ON reservation.route_id = route.route_id JOIN  province dp ON route.departure_province_id = dp.province_id
JOIN city dc ON route.departure_city_id = dc.city_id AND route.departure_province_id = dc.province_id
JOIN province ap ON route.arrival_province_id = ap.province_id JOIN city ac ON route.arrival_city_id = ac.city_id
AND route.arrival_province_id = ac.province_id WHERE reservation.user_id = ${userID}
AND CAST(CONCAT(planning.departure_date, ' ', planning.departure_time) AS DATETIME) <= CURRENT_TIMESTAMP`;
    connection.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(result);
      }
    });
  };

  nextReservations = (req, res) => {
    const userID = req.params.id;
    let sql = `SELECT
    reservation.user_id,
    reservation.reservation_id,
    reservation.reservation_type,
    route.text AS route_name,
    planning.departure_date AS departure_day,
    planning.departure_time AS departure_time,
    dp.name AS departure_province_name,
    dc.city_name AS departure_city_name,
    ap.name AS arrival_province_name,
    ac.city_name AS arrival_city_name
FROM reservation JOIN planning ON reservation.route_id = planning.route_id AND reservation.planning_id = planning.planning_id
JOIN route ON reservation.route_id = route.route_id JOIN  province dp ON route.departure_province_id = dp.province_id
JOIN city dc ON route.departure_city_id = dc.city_id AND route.departure_province_id = dc.province_id
JOIN province ap ON route.arrival_province_id = ap.province_id JOIN city ac ON route.arrival_city_id = ac.city_id
AND route.arrival_province_id = ac.province_id WHERE reservation.user_id = ${userID}
AND CAST(CONCAT(planning.departure_date, ' ', planning.departure_time) AS DATETIME) >= CURRENT_TIMESTAMP`;
    connection.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(result);
      }
    });
  };
}
module.exports = new ReservationController();
