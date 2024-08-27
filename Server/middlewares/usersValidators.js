const { body } = require('express-validator');

const validateRules = [
    body('name', 'el nombre no cumple los canones').exists().isLength({min:3, max:50}),
    body('surname', 'apellido no valido').exists().isLength({min:3, max:100}),
    body('email', 'email válido requerido').exists().isEmail(),
    body('birthdate', 'debe ser un numero').exists(),
    body('password', 'no es suficientemente segura').exists().custom(value => {
        if(!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(value)){
            throw new Error('La contraseña debe ser de más de 8 caracteres, contener al menos una mayúscula, una minúscula, y un número')
        }
        return true;
    }),
    body('phone_number', 'número requerido').exists().isNumeric(),
]

module.exports = {validateRules}