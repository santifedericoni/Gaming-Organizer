const express = require("express");
const router = express.Router();

module.exports = db => {
  router.post("/", (req, res) => {
    const name = req.body.form.name;
    const lastName = req.body.form.lastName;
    const email = req.body.form.email;
    const password = req.body.form.password;

    const values = [name, lastName, email, password];
    let query = `
      INSERT INTO users (name, lastname , email , password)
      VALUES ($1, $2, $3, $4) RETURNING *;
      `;
    db.query(query, values)
      .then(data => {
        const user = data.rows;
        res.json({ user });
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });

  // router.post("/login", (req, res) => {
  //   const email = req.body.form.email;
  //   const password = req.body.form.password;
  //   const values = [email, password];
  //   let query = `
  //     SELECT * FROM users WHERE email = $1 and password = $2;
  //     `;

  //   db.query(query, values)
  //     .then(data => {
  //       const user = data.rows;
  //       res.json({ user });
  //     })
  //     .catch(err => {
  //       res.status(500).json({ error: err.message });
  //     });
  // });

  router.post("/:user_id", (req, res) => {
    const values = [
      req.params.user_id,
      req.body.form.name,
      req.body.form.lastName,
      req.body.form.email,
      req.body.form.password,
    ];
    let query = `
        UPDATE users
        SET name = $2, lastname  = $3, email=$4, password =$5
        WHERE id = $1;
        `;
    db.query(query, values)
      .then(() => {
        res.send("hi user");
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
