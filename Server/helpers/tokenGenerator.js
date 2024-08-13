const jwt = require("jsonwebtoken");

const tokenGenerator = (Tid,key,time) =>{
  const token = jwt.sign(
    {id: Tid},
    key,
    {expiresIn:`${time}d`}
    )
    return token
}

module.exports = tokenGenerator;