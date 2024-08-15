const connection = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const sendMail = require("../services/emailService");
const tokenGenerator = require("../helpers/tokenGenerator");
const { encryptToken, decryptToken } = require("../helpers/encryptToken");

class UserController {
  //Controlador que realiza el registro de usuario
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

    //Comprueba si existe el usuario
    let sql = `SELECT * FROM user where email = "${email}"`;
    connection.query(sql, (error, result) => {
      if (error) {
        res.status(500).json(error);
      } else {
        if (!result || result.length !== 0) {
          res.status(401).json("usuario ya existe");
        } else {
          // si no existe encripta contraseña
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
              //Insert del usuario en la base de datos, obteniendo el id de provincia y ciudad de sus respectivas tablas
              let sql2 = `INSERT INTO user (name, surname, birthdate, genre, email, password, phone_number, province_id, city_id)
              VALUES (?,?,?,?,?,?,?, 
              (SELECT province_id FROM province WHERE name = ?), 
              (SELECT city_id FROM city WHERE city_name = ? AND province_id = (SELECT province_id FROM province WHERE name = ?)));`;
              connection.query(sql2, data, (errorIns, resultIns) => {
                if (errorIns) {
                  res.status(500).json(errorIns);
                } else {
                  // Genera el token para verificación de registro
                  const registerToken = tokenGenerator(
                    resultIns.insertId,
                    process.env.SECRET_KEY_2,
                    1
                  );

                  //Encripta el token y hace el envio
                  const hashToken = encryptToken(
                    registerToken,
                    process.env.SECRET_KEY_3
                  );
                  sendMail(email, name, hashToken);
                  res.status(201).json(resultIns);
                }
              });
            }
          });
        }
      }
    });
  };

  //Controlador que realiza el login del usuario
  loginUser = (req, res) => {
    const { email, password } = req.body;
    let sql = `SELECT * FROM user WHERE email='${email}' AND is_disabled = 0 AND is_validated = 1`;
    connection.query(sql, (err, result) => {
      if (err) {
        res.status(401).json("Credenciales incorrectas");
      } else {
        if (!result || result.length === 0) {
          res.status(401).json("Credenciales incorrectas");
        } else {
          const hash = result[0].password;
          bcrypt.compare(password, hash, (errHash, resHash) => {
            if (errHash) {
              resHash.status(500).json(errHash);
            } else {
              if (resHash) {
                let data = result[0].user_id;
                let sql2 = "SELECT * FROM user WHERE user_id = ?";
                connection.query(sql2, data, (errSelect, resultSelect) => {
                  if (errSelect) {
                    res
                      .status(401)
                      .json({ status: 401, message: "No autorizado" });
                  } else {
                    if (!resultSelect || resultSelect.length === 0) {
                      res.status(401).json("No autorizado");
                    } else {
                      let token = tokenGenerator(
                        resultSelect[0].user_id,
                        process.env.SECRET_KEY,
                        1
                      );
                      //Encripta el token
                      token = encryptToken(token, process.env.SECRET_KEY_3);
                      res.status(200).json({ resultSelect, token });
                    }
                  }
                });
              } else {
                res.status(401).json("Credenciales incorrectas");
              }
            }
          });
        }
      }
    });
  };

  //Verifica el usuario en base al token de registro
  verifyUser = (req, res) => {
    const hashToken = req.headers.authorization.split(" ")[1];

    console.log(hashToken);

    if (!hashToken) {
      res.status(401).json({ status: 401, message: "No autorizado 1" });
    }

    //Desencripta el token
    const registerToken = decryptToken(hashToken, process.env.SECRET_KEY_3);

    //Verifica el token
    jwt.verify(registerToken, process.env.SECRET_KEY_2, (error, decode) => {
      if (error) {
        res.status(401).json({ status: 401, message: "No autorizado 2" });
      } else {
        console.log(decode);
        let data = [decode.id];
        let sql = `UPDATE user SET is_validated = 1 WHERE user_id = ?`;
        connection.query(sql, data, (err, result) => {
          if (err) {
            res.status(401).json({ status: 401, message: "No autorizado" });
          } else {
            let sql2 = "SELECT * FROM user WHERE user_id = ?";
            connection.query(sql2, data, (errSelect, resultSelect) => {
              if (errSelect) {
                res.status(401).json({ status: 401, message: "No autorizado" });
              } else {
                if (!resultSelect || resultSelect.length === 0) {
                  res.status(401).json("No autorizado");
                } else {
                  let token = tokenGenerator(
                    resultSelect[0].user_id,
                    process.env.SECRET_KEY,
                    1
                  );
                  token = encryptToken(token, process.env.SECRET_KEY_3);

                  res.status(200).json({ resultSelect, token });
                }
              }
            });
          }
        });
      }
    });
  };

  //Traemos los datos de un usuario
  getOneUser = (req, res) => {
    let hashtoken = req.headers.authorization.split(" ")[1];

    const token = decryptToken(hashtoken, process.env.SECRET_KEY_3);
    console.log("Token desencriptado", token);

    const { id } = jwt.decode(token);

    console.log(id);

    let sql = `SELECT * FROM user WHERE user_id = ${id}`;
    connection.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else if (result.length === 0) {
        res.status(401).json("No autorizado");
      } else {
        res.status(200).json(result);
      }
    });
  };

  editOneUser = (req, res) => {
    const {
      user_id,
      name,
      surname,
      email,
      genre,
      phone_number,
      province,
      city,
    } = JSON.parse(req.body.editUser);
    let data = [
      name,
      surname,
      email,
      genre,
      phone_number,
      province,
      city,
      province,
      user_id,
    ];
    let sql =
      "UPDATE user SET name = ?, surname = ?, email = ? genre = ?, phone_number = ?, province_id = (SELECT province_id FROM province WHERE name = ?), city_id = (SELECT city_id FROM city WHERE city_name = ? AND province_id = (SELECT province_id FROM province WHERE name = ?)) WHERE user_id = ?";

    if (req.file != undefined) {
      data = [
        name,
        surname,
        email,
        genre,
        phone_number,
        province,
        city,
        province,
        req.file.filename,
        user_id,
      ];
      sql =
        "UPDATE user SET name = ?, surname = ?, email = ? genre = ?, phone_number = ?, province_id = (SELECT province_id FROM province WHERE name = ?), city_id = (SELECT city_id FROM city WHERE city_name = ? AND province_id = (SELECT province_id FROM province WHERE name = ?)), avatar = ? WHERE user_id = ?";
    }
    connection.query(sql, data, (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        if (req.file) {
          res.status(200).json({ result, image: req.file.filename });
        } else {
          res.status(200).json({ result });
        }
      }
    });
  };
}

module.exports = new UserController();
