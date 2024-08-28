const connection = require("../config/db");

class IndexController {
  searchProvinceOrCity = (req, res) => {
    const { type } = req.params;
    const { query, province } = req.query;

    if (!query || (type !== "province" && type !== "city")) {
      return res.status(400);
    }

    const col = type === "province" ? "name" : "city_name";

    let data = [type, col, `${query}%`];
    let sql = `SELECT * FROM ?? WHERE ?? LIKE ?`;
    if (type === "city") {
      data = [type, col, `${query}%`, province];
      sql = `SELECT * FROM ?? WHERE ?? LIKE ? AND province_id = ?`;
    }
    connection.query(sql, data, (error, results) => {
      if (error) {
        return res.status(500).json({ error: "Database query error" });
      }

      res.json(results);
    });
  };
}

module.exports = new IndexController();
