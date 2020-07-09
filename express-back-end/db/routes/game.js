const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.post('/addList', (req, res) => {
    //   console.log(req.body)
    console.log(req.body.platformState.platform,'platforms')
    console.log(req.body.data.name,'game')

    // const name = req.body.form.name;
    // const lastName = req.body.form.lastName;
    // const email = req.body.form.email;
    // const password = req.body.form.password;

    // const values = [name, lastName, email, password];
    // let query = `
    //   INSERT INTO users (name, lastname , email , password)
    //   VALUES ($1, $2, $3, $4) RETURNING *;
    //   `;
    // db.query(query, values)
    //   .then((data) => {
    //     const user = data.rows;
    //     res.json({ user });
    //   })
    //   .catch((err) => {
    //     res.status(500).json({ error: err.message });
    //   });
  });

  router.post('/addWishList', (req, res) => {
    //   console.log(req.body)
    console.log('wishlist')

    // const name = req.body.form.name;
    // const lastName = req.body.form.lastName;
    // const email = req.body.form.email;
    // const password = req.body.form.password;

    // const values = [name, lastName, email, password];
    // let query = `
    //   INSERT INTO users (name, lastname , email , password)
    //   VALUES ($1, $2, $3, $4) RETURNING *;
    //   `;
    // db.query(query, values)
    //   .then((data) => {
    //     const user = data.rows;
    //     res.json({ user });
    //   })
    //   .catch((err) => {
    //     res.status(500).json({ error: err.message });
    //   });
  });


  return router;
};
