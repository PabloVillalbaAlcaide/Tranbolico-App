const jwt = require("jsonwebtoken");
require("dotenv").config();
const { decryptToken } = require("../helpers/encryptToken");

const verifyToken = (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth) {
    res.status(401).json({ status: 401, message: "No autorizado 1" });
  }

  let token = auth.split(" ")[1];

  if (!token) {
    res.status(401).json({ status: 401, message: "No autorizado 2" });
  }

  token = decryptToken(token, process.env.SECRET_KEY_3);
  
  jwt.verify(token, process.env.SECRET_KEY, (error) => {
    if (error) {
      res.status(401).json({ status: 401, message: "No autorizado 3" });
    }
  });
  
  console.log("Verificado");
  
  next();
};

module.exports = verifyToken;
