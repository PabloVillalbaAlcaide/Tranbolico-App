const connection = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const sendMail = require("../services/emailService");
const sendMailRecover = require("../services/emailServiceRecoverPassword");
const tokenGenerator = require("../helpers/tokenGenerator");
const { encryptToken, decryptToken } = require("../helpers/encryptToken");
const generator = require("generate-password");
const delFile = require("../helpers/delFile");

const tranbolicAvatar = [
  "/tram1.png",
  "/tram2.png",
  "/tram3.png",
  "/tram4.png",
  "/tram5.png",
  "/tram6.png",
  "/tram7.png",
  "/tram8.png",
  "/tram9.png",
];
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
    const randomIndex = Math.floor(Math.random() * tranbolicAvatar.length);
    let avatar = tranbolicAvatar[randomIndex];
    //Comprueba si existe el usuario
    let sql = `SELECT * FROM user where email = "${email}"`;
    connection.query(sql, (error, result) => {
      if (error) {
        return res.status(500).json(error);
      } else {
        if (!result || result.length !== 0) {
          return res.status(401).json("usuario ya existe");
        } else {
          // si no existe encripta contraseña
          let saltRounds = 10;
          bcrypt.hash(password, saltRounds, (error, hash) => {
            if (error) {
              return res.status(500).json(error);
            } else {
              let data = [
                name,
                surname,
                birthdate,
                genre || null,
                email,
                hash,
                phone_number,
                avatar,
                province.province_id,
                city.city_id,
              ];
              let sql2 = `INSERT INTO user (name, surname, birthdate, genre, email, password, phone_number, avatar, province_id, city_id)
              VALUES (?,?,?,?,?,?,?,?,?,?);`;

              connection.query(sql2, data, (errorIns, resultIns) => {
                if (errorIns) {
                  return res.status(500).json(errorIns);
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
        return res.status(401).json("Credenciales incorrectas");
      } else {
        if (!result || result.length === 0) {
          return res.status(401).json("Credenciales incorrectas");
        } else {
          const hash = result[0].password;
          bcrypt.compare(password, hash, (errHash, resHash) => {
            if (errHash) {
              return resHash.status(500).json(errHash);
            } else {
              if (resHash) {
                let data = result[0].user_id;
                let sql2 = `SELECT user.*, province.name AS province, city.city_name AS city
                FROM user JOIN province ON user.province_id = province.province_id JOIN 
                city ON user.province_id = city.province_id AND user.city_id = city.city_id 
                WHERE user.user_id = ?`;
                connection.query(sql2, data, (errSelect, resultSelect) => {
                  if (errSelect) {
                    return res
                      .status(401)
                      .json({ status: 401, message: "No autorizado" });
                  } else {
                    if (!resultSelect || resultSelect.length === 0) {
                      return res.status(401).json("No autorizado");
                    } else {
                      let token = tokenGenerator(
                        resultSelect[0].user_id,
                        process.env.SECRET_KEY,
                        1
                      );
                      //Encripta el token
                      token = encryptToken(token, process.env.SECRET_KEY_3);

                      const finalResult = {
                        user_id: resultSelect[0].user_id,
                        name: resultSelect[0].name,
                        surname: resultSelect[0].surname,
                        birthdate: resultSelect[0].birthdate,
                        genre: resultSelect[0].genre,
                        email: resultSelect[0].email,
                        phone_number: resultSelect[0].phone_number,
                        avatar: resultSelect[0].avatar,
                        province: {
                          name: resultSelect[0].province,
                          province_id: resultSelect[0].province_id,
                        },
                        city: {
                          city_name: resultSelect[0].city,
                          city_id: resultSelect[0].city_id,
                          province_id: resultSelect[0].province_id,
                        },
                        user_type: resultSelect[0].user_type,
                      };

                      return res.status(200).json({ finalResult, token });
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

    if (!hashToken) {
      res.status(401).json({ status: 401, message: "No autorizado 1" });
    }

    //Desencripta el token
    const registerToken = decryptToken(hashToken, process.env.SECRET_KEY_3);

    //Verifica el token
    jwt.verify(registerToken, process.env.SECRET_KEY_2, (error, decode) => {
      if (error) {
        return res
          .status(401)
          .json({ status: 401, message: "No autorizado 2" });
      } else {
        let data = [decode.id];
        let sql = `UPDATE user SET is_validated = 1 WHERE user_id = ?`;
        connection.query(sql, data, (err, result) => {
          if (err) {
            return res
              .status(401)
              .json({ status: 401, message: "No autorizado" });
          } else {
            let sql2 = `SELECT user.*, province.name AS province, city.city_name AS city
    FROM user JOIN province ON user.province_id = province.province_id JOIN 
    city ON user.province_id = city.province_id AND user.city_id = city.city_id 
    WHERE user.user_id = ?`;
            connection.query(sql2, data, (errSelect, resultSelect) => {
              if (errSelect) {
                return res
                  .status(401)
                  .json({ status: 401, message: "No autorizado" });
              } else {
                if (!resultSelect || resultSelect.length === 0) {
                  return res.status(401).json("No autorizado");
                } else {
                  let token = tokenGenerator(
                    resultSelect[0].user_id,
                    process.env.SECRET_KEY,
                    1
                  );
                  token = encryptToken(token, process.env.SECRET_KEY_3);
                  const finalResult = {
                    user_id: resultSelect[0].user_id,
                    name: resultSelect[0].name,
                    surname: resultSelect[0].surname,
                    birthdate: resultSelect[0].birthdate,
                    genre: resultSelect[0].genre,
                    email: resultSelect[0].email,
                    phone_number: resultSelect[0].phone_number,
                    avatar: resultSelect[0].avatar,
                    province: {
                      name: resultSelect[0].province,
                      province_id: resultSelect[0].province_id,
                    },
                    city: {
                      city_name: resultSelect[0].city,
                      city_id: resultSelect[0].city_id,
                      province_id: resultSelect[0].province_id,
                    },
                    user_type: resultSelect[0].user_type,
                  };
                  res.status(200).json({ finalResult, token });
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

    const { id } = jwt.decode(token);

    let sql = `SELECT user.*, province.name AS province, city.city_name AS city
    FROM user JOIN province ON user.province_id = province.province_id JOIN 
    city ON user.province_id = city.province_id AND user.city_id = city.city_id 
    WHERE user.user_id = ${id}`;
    connection.query(sql, (err, result) => {
      if (err) {
        return res.status(500).json(err);
      } else if (result.length === 0) {
        return res.status(401).json("No autorizado");
      } else {
        const finalResult = {
          user_id: result[0].user_id,
          name: result[0].name,
          surname: result[0].surname,
          birthdate: result[0].birthdate,
          genre: result[0].genre,
          email: result[0].email,
          phone_number: result[0].phone_number,
          avatar: result[0].avatar,
          province: {
            name: result[0].province,
            province_id: result[0].province_id,
          },
          city: {
            city_name: result[0].city,
            city_id: result[0].city_id,
            province_id: result[0].province_id,
          },
          user_type: result[0].user_type,
        };
        res.status(200).json(finalResult);
      }
    });
  };

  editOneUser = (req, res) => {
    if (!req.body) {
      return res
        .status(400)
        .json({ error: "No se recibieron datos en el cuerpo de la solicitud" });
    }

    let user = JSON.parse(req.body.user);
    const {
      user_id,
      name,
      surname,
      email,
      phone_number,
      genre,
      province,
      city,
    } = user;

    if (
      !user_id ||
      !name ||
      !surname ||
      !email ||
      !phone_number ||
      !province ||
      !city
    ) {
      return res.status(400).json({
        error: "Faltan datos necesarios en el cuerpo de la solicitud",
      });
    }

    let data = [
      name,
      surname,
      email,
      genre || null,
      phone_number,
      province.province_id,
      city.city_id,
      user_id,
    ];
    let sql = `UPDATE user SET name = ?, surname = ?, email = ?, genre = ?, phone_number = ?, province_id = ?, city_id = ? WHERE user_id = ?`;

    if (req.file) {
      data = [
        name,
        surname,
        email,
        genre || null,
        phone_number,
        province.province_id,
        city.city_id,
        req.file.filename,
        user_id,
      ];

      sql = `UPDATE user SET name = ?, surname = ?, email = ?, genre = ?, phone_number = ?, province_id = ?, city_id = ?, avatar = ? WHERE user_id = ?`;
    }

    connection.query(sql, data, (err, result) => {
      if (err) {
        if (req.file) {
          delFile(req.file.filename, "users");
        }
        return res.status(500).json(err);
      } else {
        if (req.file) {
          return res.status(200).json({ result, image: req.file.filename });
        } else {
          return res.status(200).json({ result });
        }
      }
    });
  };

  recoverPassword = (req, res) => {
    const { email } = req.body;

    let sql = `SELECT * FROM user WHERE email='${email}' AND is_disabled = 0 AND is_validated = 1`;
    connection.query(sql, (err, result) => {
      if (err) {
        return res.status(500).json(err);
      } else if (result.length === 0) {
        return res.status(401).json("No autorizado");
      } else {
        //Genera la contraseña de recuperacion
        const password = generator.generate({
          length: 8, // Longitud de la contraseña
          numbers: true, // Incluir números
          symbols: false, // Incluir símbolos
          uppercase: true, // Incluir letras mayúsculas
          lowercase: false, // Incluir letras minúsculas
        });
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
            return res.status(500).json(error);
          } else {
            let data = [hash, result[0].user_id];
            let sql2 =
              "UPDATE user SET password = ?, is_auto_generated = 1 WHERE user_id = ?";
            connection.query(sql2, data, (err, resultUpdate) => {
              if (err) {
                return res.status(500).json(err);
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

    const hashtoken = req.headers.authorization.split(" ")[1];
    const token = decryptToken(hashtoken, process.env.SECRET_KEY_3);

    const { id } = jwt.decode(token);

    let sql = `SELECT * FROM user WHERE user_id='${id}' AND is_disabled = 0 AND is_validated = 1`;
    connection.query(sql, (err, result) => {
      if (err) {
        return res.status(401).json("Credenciales incorrectas");
      } else {
        if (!result || result.length === 0) {
          return res.status(401).json("Credenciales incorrectas");
        } else {
          const hash = result[0].password;
          bcrypt.compare(oldPassword, hash, (errHash, resHash) => {
            if (errHash) {
              return resHash.status(500).json(errHash);
            } else {
              if (resHash) {
                let saltRounds = 10;
                bcrypt.hash(password, saltRounds, (error, hash) => {
                  if (error) {
                    return res.status(500).json(error);
                  } else {
                    let data = [hash, id];
                    let sql2 =
                      "UPDATE user SET password = ?, is_auto_generated = 0 WHERE user_id = ?";
                    connection.query(sql2, data, (errSelect, resultSelect) => {
                      if (errSelect) {
                        return res
                          .status(401)
                          .json({ status: 401, message: "No autorizado" });
                      } else {
                        if (!resultSelect || resultSelect.length === 0) {
                          return res.status(401).json("No autorizado");
                        } else {
                          const resultF = result[0].is_auto_generated;
                          if (result[0].is_auto_generated === 1) {
                            return res.status(200).json({ resultF });
                          } else {
                            return res.status(200).json({ resultF, hash });
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
