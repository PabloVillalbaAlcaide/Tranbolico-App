const connection = require("../config/db");
const bcrypt = require("bcrypt");
const { json } = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class UserController {
  registerUser = (req, res) => {
    const {
      name,
      surname,
      birthdate,
      genre,
      email,
      password,
      phone_number,
      province,
      city,
    } = req.body;
    let sql = `SELECT * FROM user where email = "${email}"`;
    connection.query(sql, (error, result) => {
      if (error) {
        res.status(500).json(error);
      } else {
        if (!result || result.length !== 0) {
          res.status(401).json("usuario ya existe");
        } else {
          let saltRounds = 10;
          bcrypt.hash(password, saltRounds, (error, hash) => {
            if (error) {
              res.status(500).json(error);
            } else {
              let data = [
                name,
                surname,
                birthdate,
                genre,
                email,
                hash,
                phone_number,
                province,
                city,
                province,
              ];
              let sql2 = `INSERT INTO user (name, surname, birthdate, genre, email, password, phone_number, province_id, city_id)
              VALUES (?,?,?,?,?,?,?, 
              (SELECT province_id FROM province WHERE name = ?), 
              (SELECT city_id FROM city WHERE city_name = ? AND province_id = (SELECT province_id FROM province WHERE name = ?)));`;
              connection.query(sql2, data, (errorIns, resultIns) => {
                if (errorIns) {
                  res.status(500).json(errorIns);
                } else {
                  res.status(201).json(resultIns);
                }
              });
            }
          });
        }
      }
    });
  };
}

module.exports = new UserController();
