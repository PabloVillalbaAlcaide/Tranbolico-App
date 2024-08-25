const express = require('express');
const router = express.Router();
const verifyToken = require('./verifyToken');
const verifyTokenAdmin = require('./verifyAdmin');

// Middleware para decidir qué verificación usar
const verifyAuth = (req, res, next) => {
    if (Object.keys(req.params).length > 0) {
        verifyToken(req, res, next);
    } else if (Object.keys(req.query).length > 0) {
        verifyTokenAdmin(req, res, next);
    } else {
      res.status(401).json('No autorizado');
    }
};

module.exports = verifyAuth;