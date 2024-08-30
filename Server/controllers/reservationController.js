const connection = require("../config/db");

class ReservationController {
  oneWayTrip = (req, res) => {
    const { search } = req.query;
    let sql = `SELECT city.city_name, province.name 
    FROM city, province 
    WHERE city.province_id = province.province_id 
    AND (city.city_name LIKE "${search}%" OR province.name LIKE "${search}%")`;
    connection.query(sql, (err, result) => {
      if (err) {
        return res.status(500).json(err);
      } else {
        res.status(200).json(result);
      }
    });
  };

  returnTrip = (req, res) => {
    const { search, city, province } = req.query;
      let sql = `SELECT province.name AS name, city.city_name AS city_name 
      FROM route 
      JOIN city ON route.arrival_province_id = city.province_id 
      AND route.arrival_city_id = city.city_id
      JOIN province ON city.province_id = province.province_id 
      WHERE route.departure_city_id = (
      SELECT city_id 
      FROM city 
      WHERE city_name LIKE '${city}' 
      AND province_id = (
      SELECT province_id 
      FROM province 
      WHERE name LIKE '${province}')) 
      AND province.province_id = (
      SELECT province.province_id 
      FROM province 
      WHERE name LIKE '${province}')
      AND (province.name LIKE '${search}%' 
      OR city.city_name LIKE '${search}%')
      AND route.is_deleted = FALSE
      AND route.is_disabled = FALSE`;
    connection.query(sql, (err, result) => {
      if (err) {
        return res.status(500).json(err);
      } else {
        res.status(200).json(result);
      }
    });
  };

  historical = (req, res) => {
    let userID = req.params.id;
    if (req.query.userid) {
      userID = req.query.userid;
    }
    
    const sql = `SELECT
    reservation.user_id,
    reservation.reservation_id,
    GROUP_CONCAT(CASE WHEN reservation.reservation_type = 1 THEN planning.departure_date END) AS departure_days_ida,
    GROUP_CONCAT(CASE WHEN reservation.reservation_type = 2 THEN planning.departure_date END) AS departure_days_vuelta,
    GROUP_CONCAT(CASE WHEN reservation.reservation_type = 1 THEN planning.departure_time END) AS departure_times_ida,
    GROUP_CONCAT(CASE WHEN reservation.reservation_type = 2 THEN planning.departure_time END) AS departure_times_vuelta,
    GROUP_CONCAT(CASE WHEN reservation.reservation_type = 1 THEN dp.name END) AS departure_province_ida,
    GROUP_CONCAT(CASE WHEN reservation.reservation_type = 2 THEN dp.name END) AS departure_province_vuelta,
    GROUP_CONCAT(CASE WHEN reservation.reservation_type = 1 THEN dc.city_name END) AS departure_city_ida,
    GROUP_CONCAT(CASE WHEN reservation.reservation_type = 2 THEN dc.city_name END) AS departure_city_vuelta,
    GROUP_CONCAT(CASE WHEN reservation.reservation_type = 1 THEN ap.name END) AS arrival_province_ida,
    GROUP_CONCAT(CASE WHEN reservation.reservation_type = 2 THEN ap.name END) AS arrival_province_vuelta,
    GROUP_CONCAT(CASE WHEN reservation.reservation_type = 1 THEN ac.city_name END) AS arrival_city_ida,
    GROUP_CONCAT(CASE WHEN reservation.reservation_type = 2 THEN ac.city_name END) AS arrival_city_vuelta,
    MAX(reservation.is_deleted) AS is_deleted
    FROM reservation
    JOIN planning ON reservation.route_id = planning.route_id AND reservation.planning_id = planning.planning_id
    JOIN route ON reservation.route_id = route.route_id
    JOIN province dp ON route.departure_province_id = dp.province_id
    JOIN city dc ON route.departure_city_id = dc.city_id AND route.departure_province_id = dc.province_id
    JOIN province ap ON route.arrival_province_id = ap.province_id
    JOIN city ac ON route.arrival_city_id = ac.city_id AND route.arrival_province_id = ac.province_id
    WHERE reservation.user_id = ${userID}
    AND (
    (reservation.reservation_type IN (1,2) AND CAST(CONCAT(planning.departure_date, ' ', planning.departure_time) AS DATETIME) < NOW())
    OR (reservation.user_id = ${userID} AND reservation.is_deleted = TRUE)
    )
    GROUP BY reservation.reservation_id
    ORDER BY departure_days_ida DESC, departure_times_ida DESC;`;

    connection.query(sql, (err, result) => {
      if (err) {
        return res.status(500).json(err);
      } else {
        res.status(200).json(result);
      }
    });
  };

  nextReservations = (req, res) => {
    let userID = req.params.id;
    if (req.query.userid) {
      userID = req.query.userid;
    }

    const sql = `SELECT
    reservation.user_id,
    reservation.reservation_id,
    GROUP_CONCAT(CASE WHEN reservation.reservation_type = 1 THEN planning.departure_date END) AS departure_days_ida,
    GROUP_CONCAT(CASE WHEN reservation.reservation_type = 2 THEN planning.departure_date END) AS departure_days_vuelta,
    GROUP_CONCAT(CASE WHEN reservation.reservation_type = 1 THEN planning.departure_time END) AS departure_times_ida,
    GROUP_CONCAT(CASE WHEN reservation.reservation_type = 2 THEN planning.departure_time END) AS departure_times_vuelta,
    GROUP_CONCAT(CASE WHEN reservation.reservation_type = 1 THEN dp.name END) AS departure_province_ida,
    GROUP_CONCAT(CASE WHEN reservation.reservation_type = 2 THEN dp.name END) AS departure_province_vuelta,
    GROUP_CONCAT(CASE WHEN reservation.reservation_type = 1 THEN dc.city_name END) AS departure_city_ida,
    GROUP_CONCAT(CASE WHEN reservation.reservation_type = 1 THEN ap.name END) AS arrival_province_ida,
    GROUP_CONCAT(CASE WHEN reservation.reservation_type = 1 THEN ac.city_name END) AS arrival_city_ida,
    GROUP_CONCAT(CASE WHEN reservation.reservation_type = 2 THEN ac.city_name END) AS arrival_city_vuelta,
    MAX(reservation.is_deleted) AS is_deleted
    FROM reservation
    JOIN planning ON reservation.route_id = planning.route_id AND reservation.planning_id = planning.planning_id
    JOIN route ON reservation.route_id = route.route_id
    JOIN province dp ON route.departure_province_id = dp.province_id
    JOIN city dc ON route.departure_city_id = dc.city_id AND route.departure_province_id = dc.province_id
    JOIN province ap ON route.arrival_province_id = ap.province_id
    JOIN city ac ON route.arrival_city_id = ac.city_id AND route.arrival_province_id = ac.province_id
    WHERE reservation.user_id = ${userID}
    AND ((reservation.reservation_type IN (1,2) AND CAST(CONCAT(planning.departure_date, ' ', planning.departure_time) AS DATETIME) > NOW())
    OR (reservation.reservation_type = 1 AND CAST(CONCAT(planning.departure_date, ' ', planning.departure_time) AS DATETIME) < NOW() 
    AND reservation.reservation_type = 2 AND CAST(CONCAT(planning.departure_date, ' ', planning.departure_time) AS DATETIME) > NOW()))
    AND reservation.is_deleted = FALSE
    GROUP BY reservation.reservation_id
    ORDER BY departure_days_ida, departure_times_ida;`;

    connection.query(sql, (err, result) => {
      if (err) {
        return res.status(500).json(err);
      } else {
        return res.status(200).json(result);
      }
    });
  };

  cancelReservation = (req, res) => {
    const { reservationForCancel } = req.body;
    const data = [
      reservationForCancel.user_id,
      reservationForCancel.reservation_id,
    ];
    const sql = `
    UPDATE reservation
    SET is_deleted = TRUE
    WHERE user_id = ?
    AND reservation_id = ?
    AND reservation_type IN (1, 2)
    AND EXISTS (
    SELECT 1
    FROM planning
    WHERE planning.route_id = reservation.route_id
    AND planning.planning_id = reservation.planning_id
    AND CAST(CONCAT(planning.departure_date, ' ', planning.departure_time) AS DATETIME) > NOW()
    );
    `;

    connection.query(sql, data, (err, result) => {
      if (err) {
        return res.status(500).json(err);
      } else {
        res.status(200).json(result);
      }
    });
  };

  getSchedules = (req, res) => {
    const {
      origin_province,
      origin_city,
      destination_province,
      destination_city,
      date,
      time,
    } = req.query;

    let sql = `SELECT 
    p1.route_id, 
    p1.planning_id, 
    p1.departure_date, 
    p1.departure_time, 
    dp.name AS departure_province_name,
    dc.city_name AS departure_city_name, 
    ap.name AS arrival_province_name, 
    ac.city_name AS arrival_city_name
    FROM planning p1
    JOIN route r1 ON p1.route_id = r1.route_id
    JOIN province dp ON r1.departure_province_id = dp.province_id
    JOIN city dc ON r1.departure_city_id = dc.city_id AND r1.departure_province_id = dc.province_id
    JOIN province ap ON r1.arrival_province_id = ap.province_id
    JOIN city ac ON r1.arrival_city_id = ac.city_id AND r1.arrival_province_id = ac.province_id
    WHERE dp.name LIKE '${origin_province}'
    AND dc.city_name = '${origin_city}'
    AND ap.name = '${destination_province}'
    AND ac.city_name = '${destination_city}'
    AND CAST(CONCAT(p1.departure_date, ' ', p1.departure_time) AS DATETIME) >= NOW()
    AND p1.is_deleted = FALSE
    AND EXISTS (
    SELECT 1
    FROM planning p2
    JOIN route r2 ON p2.route_id = r2.route_id
    JOIN province dp2 ON r2.departure_province_id = dp2.province_id
    JOIN city dc2 ON r2.departure_city_id = dc2.city_id AND r2.departure_province_id = dc2.province_id
    JOIN province ap2 ON r2.arrival_province_id = ap2.province_id
    JOIN city ac2 ON r2.arrival_city_id = ac2.city_id AND r2.arrival_province_id = ac2.province_id
    WHERE dp2.name = '${destination_province}'
    AND dc2.city_name = '${destination_city}'
    AND ap2.name LIKE '${origin_province}'
    AND ac2.city_name = '${origin_city}'
    AND p2.is_deleted = FALSE
    AND CAST(CONCAT(p2.departure_date, ' ', p2.departure_time) AS DATETIME) 
    BETWEEN CAST(CONCAT(p1.departure_date, ' ', p1.departure_time) AS DATETIME) 
    AND DATE_ADD(CAST(CONCAT(p1.departure_date, ' ', p1.departure_time) AS DATETIME), INTERVAL 8 HOUR)
    )
    ORDER BY p1.departure_time`;

    if (date && time) {
      sql = `SELECT planning.route_id, planning.planning_id, planning.departure_date, planning.departure_time, dp.name AS departure_province_name,
      dc.city_name AS departure_city_name, ap.name AS arrival_province_name, ac.city_name AS arrival_city_name
      FROM planning 
      JOIN route ON planning.route_id = route.route_id 
      JOIN province dp ON route.departure_province_id = dp.province_id
      JOIN city dc ON route.departure_city_id = dc.city_id AND route.departure_province_id = dc.province_id
      JOIN province ap ON route.arrival_province_id = ap.province_id 
      JOIN city ac ON route.arrival_city_id = ac.city_id AND route.arrival_province_id = ac.province_id
      WHERE dp.name = '${origin_province}' 
      AND dc.city_name = '${origin_city}' 
      AND ap.name = '${destination_province}' 
      AND ac.city_name = '${destination_city}' 
      AND CAST(CONCAT(planning.departure_date, ' ', planning.departure_time) AS DATETIME) > CAST('${date} ${time}' AS DATETIME)
      AND CAST(CONCAT(planning.departure_date, ' ', planning.departure_time) AS DATETIME) <= DATE_ADD(CAST('${date} ${time}' AS DATETIME), INTERVAL 8 HOUR)
      AND planning.is_deleted = FALSE
      ORDER BY planning.departure_time`;
    }
    connection.query(sql, (err, result) => {
      if (err) {
        return res.status(500).json(err);
      } else {
        res.status(200).json(result);
      }
    });
  };

  setReservation = (req, res) => {
    const {
      user_id,
      departure_planning_id,
      departure_route_id,
      arrival_planning_id,
      arrival_route_id,
    } = req.body;

    let sqlMaxId = `SELECT COALESCE(MAX(reservation_id), 0) + 1 AS new_id 
    FROM reservation 
    WHERE reservation_type = 1`;
    connection.query(sqlMaxId, (err, result) => {
      if (err) {
        return res.status(500).json(err);
      } else {
        let data = [
          user_id,
          result[0].new_id,
          departure_route_id,
          departure_planning_id,
        ];
        let sql = `INSERT INTO reservation (user_id, reservation_id, reservation_type, route_id, planning_id) 
               VALUES (?, ?, 1, ?, ?);`;
        connection.query(sql, data, (err, resultIns) => {
          if (err) {
            return res.status(500).json(err);
          } else {
            data = [
              user_id,
              result[0].new_id,
              arrival_route_id,
              arrival_planning_id,
            ];
            let sql2 = `INSERT INTO reservation (user_id, reservation_id, reservation_type, route_id, planning_id) 
                    VALUES (?, ?, 2, ?, ?);`;

            connection.query(sql2, data, (err, resultIns2) => {
              if (err) {
                return res.status(500).json(err);
              } else {
                res.status(200).json(resultIns2);
              }
            });
          }
        });
      }
    });
  };
}
module.exports = new ReservationController();
