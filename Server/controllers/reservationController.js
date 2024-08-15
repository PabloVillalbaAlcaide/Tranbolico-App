const connection = require("../config/db");

class ReservationController {
  oneWayTrip = (req, res) => { 
    console.log(req);
    const {search} = req.query
    console.log(search);
    let sql = `SELECT city.city_name, province.name FROM city, province WHERE city.province_id = province.province_id AND (city.city_name LIKE "${search}%" OR province.name LIKE "${search}%")`;
    connection.query(sql, (err, result)=>{
      if(err){
        res.status(500).json(err)
      }else{
        res.status(200).json(result)
      }
    })
  }

  returnTrip = (req ,res) => {
    const {search, city, province} = req.query
    let sql = `SELECT city.city_name, province.name FROM city, province WHERE city.province_id = province.province_id 
    AND city.city_id IN (SELECT arrival_city_id FROM route WHERE arrival_city_id IN (SELECT city_id FROM city WHERE city_name LIKE '${search}%')
    || arrival_province_id IN (SELECT province_id FROM province WHERE name LIKE '${search}%'))
    AND city.province_id IN (SELECT arrival_province_id FROM route WHERE arrival_city_id IN (SELECT city_id FROM city WHERE city_name LIKE '${search}%')
    || arrival_province_id IN (SELECT province_id FROM province WHERE name LIKE '${search}%') AND departure_city_id IN (SELECT city_id FROM city WHERE city_name LIKE '${city}') 
    AND departure_province_id IN (SELECT province_id FROM province WHERE name LIKE '${province}'));`;
    connection.query(sql, (err, result)=>{
      if(err){
        res.status(500).json(err)
      }else{
        res.status(200).json(result)
      }
    })
  }

}
module.exports = new ReservationController();