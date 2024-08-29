const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "eilkiriaxogos@gmail.com",
    pass: "zjrd hbos cazf kbeb",
  },
});

const sendMailRecover = (email, name, newPassword, token) => {
  let mensajeHtml = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bienvenid@ a Tranbólico</title>
</head>
<body>
    <h1>Recuperación de contraseña</h1>
    <h3>¡Hola ${name}!</h3>
    <p>Hemos recibido tu solicitud de recuperar contraseña. Tu nueva contraseña es la siguiente: </p>
    <p>${newPassword}</p>
    

    <p>Por favor, ir al siguiente enlace para restablecer tu contraseña:</p>
    <a href="http://localhost:5173/resetPassword/${token}">http://localhost:5173/resetPassword</a>
    <p>Si tienes alguna pregunta, contáctanos en [email de soporte].</p>
    <p>¡Saludos!</p>
    <p>El equipo de Tranbólico</p>
</body>
</html>`;

  const info = transporter.sendMail({
    from: ' "Tranbólico" <ProyectoTranbolico@gmail.com>',
    to: email,
    subject: "Recuperación de Contraseña",
    html: mensajeHtml,
  });
  info.then((res) => console.log(res)).catch((err) => console.log(err));
};

module.exports = sendMailRecover;
