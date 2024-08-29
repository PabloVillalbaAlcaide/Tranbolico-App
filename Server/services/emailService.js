const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "eilkiriaxogos@gmail.com",
        pass: "zjrd hbos cazf kbeb"
    }
})

const sendMail = (email, name, registerToken) =>{

    let mensajeHtml = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bienvenid@ a Tranbólico</title>
</head>
<body>
    <h1>Bienvenid@ a Tranbólico</h1>
    <h3>¡Hola ${name}!</h3>
    <p>Gracias por unirte a Tranbólico. Por favor, verifica tu email haciendo clic en el siguiente enlace:</p>
    <a href="http://localhost:5173/MsgVerifyEmail/${registerToken}">http://localhost:5173/MsgVerifyEmail/${registerToken}</a>
    <p>Si tienes alguna pregunta, contáctanos en [email de soporte].</p>
    <p>¡Saludos!</p>
    <p>El equipo de Tranbólico</p>
</body>
</html>`

    const info = transporter.sendMail({
        from: ' "Tranbólico" <ProyectoTranbolico@gmail.com>',
        to: email,
        subject: "Bienvenida a Tranbólico",
        html: mensajeHtml
    })
    info
        .then(res=>console.log(res))
        .catch(err=>console.log(err))

}

module.exports = sendMail;