const jwt = require("jsonwebtoken");
require("dotenv").config();
const { decryptToken } = require("../helpers/encryptToken");
const connection = require("../config/db");

const verifyAdmin = (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth) {
    res.status(401).json({ status: 401, message: "No autorizado 1" });
  }

  let token = auth.split(" ")[1];

  if (!token) {
    res.status(401).json({ status: 401, message: "No autorizado 2" });
  }

  token = decryptToken(token, process.env.SECRET_KEY_3);
  
  jwt.verify(token, process.env.SECRET_KEY, (error,decode) => {
    if (error) {
      res.status(401).json({ status: 401, message: "No autorizado 3" });
    }else{
      let data = [decode.id];
      let sql ='SELECT user_type FROM user WHERE user_id = ?'
      connection.query(sql, data, (err, result) =>{       
        if (err) {
          res.status(401).json({ status: 401, message: "No autorizado 4" });
        } else {
          if(result[0].user_type !== 1){
            res.status(401).json({ status: 401, message: "No autorizado 5" });
          }
        }
      })
    }
  });
  
  console.log("Verificado");
  
  next();
};

module.exports = verifyAdmin;