const connection = require("../config/db");

class AdminController {
  getAdmin = (req, res) => {};

  createRoute = (req, res) => {
    //crear una ruta
    const {
      departure_province_id,
      departure_city_id,
      arrival_province_id,
      arrival_city_id,
      text,
    } = req.body;
    //validado datos de entrada
    if (
      !departure_province_id ||
      !departure_city_id ||
      !arrival_province_id ||
      !arrival_city_id ||
      !text
    ) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios" });
    }
    //crear ruta nueva
    const sql = `INSERT INTO route (departure_province_id, departure_city_id, arrival_province_id, arrival_city_id, text) VALUES (?, ?, ?, ?, ?)`;

    connection.query(
      sql,
      [
        departure_province_id,
        departure_city_id,
        arrival_province_id,
        arrival_city_id,
        text,
      ],
      (err, result) => {
        if (err) {
          console.log("Error al crear la ruta", err);
          return res.status(500).json({ error: "Error al crear la ruta" });
        }
        res.status(201).json({
          message: "Ruta creada correctamente",
          routeId: result.insertId,
        });
      }
    );
  };
  //editar una ruta
  editRoute = (req, res) => {
    const { id } = req.params;
    const {
      departure_province_id,
      departure_city_id,
      arrival_province_id,
      arrival_city_id,
      text,
    } = req.body;
    //validado datos de entrada
    if (
      !departure_province_id ||
      !departure_city_id ||
      !arrival_province_id ||
      !arrival_city_id ||
      !text
    ) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios" });
    }

    const sql = `UPDATE route SET departure_province_id = ?, departure_city_id = ?, arrival_province_id = ?, arrival_city_id = ?, text = ? WHERE route_id = ?`;

    connection.query(
      sql,
      [
        departure_province_id,
        departure_city_id,
        arrival_province_id,
        arrival_city_id,
        text,
        id,
      ],
      (err, result) => {
        if (err) {
          console.error("error en editar la ruta", err);
          return res.status(500).json({ error: "error en editar la ruta" });
        }
        res
          .status(200)
          .json({ message: `Ruta con ID ${id} editada exitosamente` });
      }
    );
  };

  //ver usuarios
  viewUser = (req, res) => {
    const sql = `SELECT user_id, name, surname, email, phone_number, user_type, is_disabled FROM user`;

    connection.query(sql, (err, result) => {
      if (err) {
        console.error("error en traer usuario", err);
        return res.status(500).json({ error: "error en traer usuario" });
      }
      res.status(200).json(result);
    });
  };
  //deshabilitar usuarios
  disableUser = (req, res) => {
    const { id } = req.params;
    const sql = `UPDATE user SET is_disabled = TRUE WHERE user_id = ?;`;

    connection.query(sql, [id], (err, result) => {
      if (err) {
        console.log("error al deshabilitar usuario");
        return res
          .status(500)
          .json({ error: "Error al deshabilitar al usuario" });
      }
      res
        .status(200)
        .json({ message: `Usuario con ID ${id} está deshabilitado` });
    });
  };
}
module.exports = new AdminController();
