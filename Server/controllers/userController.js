const connection = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const sendMail = require("../services/emailService");
const sendMailRecover = require("../services/emailServiceRecoverPassword");
const tokenGenerator = require("../helpers/tokenGenerator");
const { encryptToken, decryptToken } = require("../helpers/encryptToken");
const generator = require("generate-password");

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

    let sql = `SELECT user.*, province.name AS province_name, city.city_name 
    FROM user JOIN province ON user.province_id = province.province_id JOIN 
    city ON user.province_id = city.province_id AND user.city_id = city.city_id 
    WHERE user.user_id = ${id}`;
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

  recoverPassword = (req, res) => {
    console.log("Hasta aqui");
    const { email } = req.body;

    let sql = `SELECT * FROM user WHERE email='${email}' AND is_disabled = 0 AND is_validated = 1`;
    console.log("Hasta aqui");
    connection.query(sql, (err, result) => {
      console.log("Hasta aqui 1");

      if (err) {
        res.status(500).json(err);
      } else if (result.length === 0) {
        res.status(401).json("No autorizado");
      } else {
        //Genera la contraseña de recuperacion
        const password = generator.generate({
          length: 12, // Longitud de la contraseña
          numbers: true, // Incluir números
          symbols: true, // Incluir símbolos
          uppercase: true, // Incluir letras mayúsculas
          lowercase: true, // Incluir letras minúsculas
        });
        console.log("Hasta aqui 2");
        //Genera Token
        const resetToken = tokenGenerator(
          result[0].user_id,
          process.env.SECRET_KEY_2,
          1
        );

        //Encripta el token y hace el envio
        const hashToken = encryptToken(resetToken, process.env.SECRET_KEY_3);

        let saltRounds = 10;
        bcrypt.hash(password, saltRounds, (error, hash) => {
          if (error) {
            res.status(500).json(error);
          } else {
            let data = [hash, result[0].user_id];
            console.log(result[0].user_id);
            let sql2 =
              "UPDATE user SET password = ?, is_auto_generated = 1 WHERE user_id = ?";
            connection.query(sql2, data, (err, resultUpdate) => {
              if (err) {
                res.status(500).json(err);
              } else {
                sendMailRecover(email, result[0].name, password, hashToken);
                res.status(200).json(resultUpdate);
              }
            });
          }
        });
      }
    });
  };

  changePassword = (req, res) => {
    const { oldPassword, password } = req.body;
    console.log(oldPassword, "*****", password);

    const hashtoken = req.headers.authorization.split(" ")[1];
    console.log("1111");
    const token = decryptToken(hashtoken, process.env.SECRET_KEY_3);

    const { id } = jwt.decode(token);

    let sql = `SELECT * FROM user WHERE user_id='${id}' AND is_disabled = 0 AND is_validated = 1`;
    connection.query(sql, (err, result) => {
      if (err) {
        res.status(401).json("Credenciales incorrectas");
      } else {
        if (!result || result.length === 0) {
          res.status(401).json("Credenciales incorrectas");
        } else {
          const hash = result[0].password;
          bcrypt.compare(oldPassword, hash, (errHash, resHash) => {
            if (errHash) {
              resHash.status(500).json(errHash);
            } else {
              console.log("22222");
              if (resHash) {
                let saltRounds = 10;
                bcrypt.hash(password, saltRounds, (error, hash) => {
                  if (error) {
                    res.status(500).json(error);
                  } else {
                    let data = [hash, id];
                    let sql2 =
                      "UPDATE user SET password = ?, is_auto_generated = 0 WHERE user_id = ?";
                    connection.query(sql2, data, (errSelect, resultSelect) => {
                      if (errSelect) {
                        res
                          .status(401)
                          .json({ status: 401, message: "No autorizado" });
                      } else {
                        if (!resultSelect || resultSelect.length === 0) {
                          res.status(401).json("No autorizado");
                        } else {
                          const resultF = result[0].is_auto_generated;
                          if (result[0].is_auto_generated === 1) {
                            res.status(200).json({ resultF });
                          } else {
                            res.status(200).json({ resultF, hash });
                          }
                        }
                      }
                    });
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
}

module.exports = new UserController();
