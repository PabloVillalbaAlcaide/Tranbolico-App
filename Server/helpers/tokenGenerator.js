const jwt = require("jsonwebtoken");

//Función para generar un Token
const tokenGenerator = (Tid,key,time) =>{
  const token = jwt.sign(
    {id: Tid},
    key,
    {expiresIn:`${time}d`}
    )
    return token
}

module.exports = tokenGenerator;