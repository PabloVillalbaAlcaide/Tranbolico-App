const connection = require("../config/db");

class IndexController {
  searchProvinceOrCity = (req, res) => {
    const { type } = req.params;
    const { query } = req.query;

    if (!query) {
      return res.status(400);
    }

    if (type !== 'province' && type !== 'city') {
      return res.status(400).json;
    }

    const col = type === 'province' ? 'name' : 'city_name';
    const data = [type, col, `${query}%`];
    const sql = `SELECT * FROM ?? WHERE ?? LIKE ?`;

    connection.query(sql, data, (error, results) => {
      if (error) {
        console.error('Database query error:', error);
        return res.status(500).json({ error: 'Database query error' });
      }

      res.json(results);
    });
  };
}

module.exports = new IndexController();