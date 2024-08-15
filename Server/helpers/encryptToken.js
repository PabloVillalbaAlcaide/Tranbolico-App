const CryptoJS = require("crypto-js");

// Función para convertir Base64 a Base64 URL Safe
function base64UrlSafe(base64) {
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

// Función para convertir Base64 URL Safe a Base64 estándar
function base64UrlUnsafe(base64UrlSafe) {
  return base64UrlSafe.replace(/-/g, "+").replace(/_/g, "/");
}

// Función para encriptar el token y convertirlo a hexadecimal
function encryptToken(token, key) {
  const encrypted = CryptoJS.AES.encrypt(token, key);
  const base64 = encrypted.toString();
  return base64UrlSafe(base64);
}

// Función para desencriptar el valor hexadecimal
function decryptToken(encryptedToken, key) {
  const base64 = base64UrlUnsafe(encryptedToken);
  const decrypted = CryptoJS.AES.decrypt(base64, key);
  return decrypted.toString(CryptoJS.enc.Utf8);
}

module.exports = { encryptToken, decryptToken };
