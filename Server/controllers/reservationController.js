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
    let sql = `SELECT province.name AS name, city.city_name AS city_name FROM route JOIN city ON route.arrival_province_id = city.province_id AND route.arrival_city_id = city.city_id
    JOIN province ON city.province_id = province.province_id WHERE route.departure_city_id = (SELECT city_id FROM city WHERE city_name = '${city}' AND province_id = (SELECT province_id FROM province WHERE name = '${province}')) AND (province.name LIKE '${search}%' OR city.city_name LIKE '${search}%')`;
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