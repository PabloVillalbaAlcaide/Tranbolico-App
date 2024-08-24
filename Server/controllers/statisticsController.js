const connection = require("../config/db");

class StatisticsController {
  statisticsUsers=(req,res)=>{
    const sql = `SELECT 
    COUNT(*) AS total_users,
    SUM(CASE WHEN is_disabled = 1 THEN 1 ELSE 0 END) AS disabled_users,
    SUM(CASE WHEN is_disabled = 0 THEN 1 ELSE 0 END) AS enabled_users
    FROM user`;

    connection.query(sql,(err,result)=>{
      if(err){
        return res.status(500).json(err)
      }else{
        res.status(200).json(result)
      }
    })
  }

  statisticsGenre=(req,res)=>{
    const sql = `SELECT genre,
    COUNT(*) AS user_count
    FROM user
    GROUP BY genre`;

    connection.query(sql,(err,result)=>{
      if(err){
        return res.status(500).json(err)
      }else{
        res.status(200).json(result)
      }
    })
  }

  statisticsAge=(req,res)=>{
    const sql = `SELECT 
    CASE 
        WHEN TIMESTAMPDIFF(YEAR, birthdate, CURDATE()) BETWEEN 16 AND 20 THEN '16-20'
        WHEN TIMESTAMPDIFF(YEAR, birthdate, CURDATE()) BETWEEN 21 AND 25 THEN '21-25'
        WHEN TIMESTAMPDIFF(YEAR, birthdate, CURDATE()) BETWEEN 26 AND 30 THEN '26-30'
        WHEN TIMESTAMPDIFF(YEAR, birthdate, CURDATE()) BETWEEN 31 AND 35 THEN '31-35'
        WHEN TIMESTAMPDIFF(YEAR, birthdate, CURDATE()) BETWEEN 36 AND 40 THEN '36-40'
        ELSE '41+'
    END AS age_group,
    SUM(CASE WHEN genre IS NULL THEN 1 ELSE 0 END) AS genre_null,
    SUM(CASE WHEN genre = 1 THEN 1 ELSE 0 END) AS genre_1,
    SUM(CASE WHEN genre = 2 THEN 1 ELSE 0 END) AS genre_2,
    SUM(CASE WHEN genre = 3 THEN 1 ELSE 0 END) AS genre_3
FROM user
GROUP BY age_group
ORDER BY 
    CASE 
        WHEN age_group = '16-20' THEN 1
        WHEN age_group = '21-25' THEN 2
        WHEN age_group = '26-30' THEN 3
        WHEN age_group = '31-35' THEN 4
        WHEN age_group = '36-40' THEN 5
        ELSE 6
    END;`
    connection.query(sql,(err,result)=>{
      if(err){
        return res.status(500).json(err)
      }else{
        res.status(200).json(result)
      }
    })
  }

  statisticsRoutes=(req,res)=>{
    const sql = `WITH TopRoutes AS (
    SELECT 
    r.route_id,
    r.departure_city_id,
    r.departure_province_id,
    r.arrival_city_id,
    r.arrival_province_id,
    COUNT(reservation_id) AS reservation_count
    FROM 
    route r
    JOIN 
    reservation res ON r.route_id = res.route_id
    GROUP BY 
    r.route_id
    ORDER BY 
    reservation_count DESC
    LIMIT 10
    ),
    CombinedRoutes AS (
    SELECT 
    LEAST(tr1.route_id, tr2.route_id) AS route_id_1,
    GREATEST(tr1.route_id, tr2.route_id) AS route_id_2,
    LEAST(tr1.departure_city_id, tr1.arrival_city_id) AS departure_city_id,
    LEAST(tr1.departure_province_id, tr1.arrival_province_id) AS departure_province_id,
    GREATEST(tr1.departure_city_id, tr1.arrival_city_id) AS arrival_city_id,
    GREATEST(tr1.departure_province_id, tr1.arrival_province_id) AS arrival_province_id,
    tr1.reservation_count + IFNULL(tr2.reservation_count, 0) AS total_reservation_count
    FROM 
    TopRoutes tr1
    LEFT JOIN 
    TopRoutes tr2 ON tr1.departure_city_id = tr2.arrival_city_id 
    AND tr1.departure_province_id = tr2.arrival_province_id
    AND tr1.arrival_city_id = tr2.departure_city_id
    AND tr1.arrival_province_id = tr2.departure_province_id
    )
    SELECT 
    route_id_1,
    route_id_2,
    departure_city_id,
    departure_province_id,
    arrival_city_id,
    arrival_province_id,
    MAX(total_reservation_count) AS total_reservation_count
    FROM 
    CombinedRoutes
    GROUP BY 
    route_id_1, route_id_2, departure_city_id, departure_province_id, arrival_city_id, arrival_province_id
    ORDER BY 
    total_reservation_count DESC
    LIMIT 10;`;

    connection.query(sql,(err,result)=>{
      if(err){
        return res.status(500).json(err)
      }else{
        res.status(200).json(result)
      }
    })
  }

  statisticsCity=(req,res)=>{
    const sql = `SELECT
    c.city_name,
    p.name AS province_name,
    COUNT(res.reservation_id) AS total_reservations
    FROM route r
    JOIN planning pl ON r.route_id = pl.route_id
    JOIN reservation res ON pl.route_id = res.route_id AND pl.planning_id = res.planning_id
    JOIN city c ON (r.departure_city_id = c.city_id AND r.departure_province_id = c.province_id)
    OR (r.arrival_city_id = c.city_id AND r.arrival_province_id = c.province_id)
    JOIN province p ON c.province_id = p.province_id
    WHERE res.is_deleted = FALSE
    GROUP BY c.city_id, c.province_id, c.city_name, p.name
    ORDER BY total_reservations DESC
    LIMIT 10`;

    connection.query(sql,(err,result)=>{
      if(err){
        return res.status(500).json(err)
      }else{
        res.status(200).json(result)
      }
    })
  }
}

module.exports = new StatisticsController