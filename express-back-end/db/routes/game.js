const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.post('/addList', (req, res) => {
    // console.log(req.body.platforms,'<platforms>')
    // console.log(req.body.data,'<game>')
    // console.log(req.body.userId,'<user>')
    const name = req.body.data.name;
    const id_api = req.body.data.id;
    const user_id = req.body.userId;
    const genre = req.body.data.genres[0].name;
    const description = req.body.data.description_raw;


    const insertGamePlatform = function (platforms,gameId){
      let insertValue = '';
      let suffix = ",";
      for (const platform in platforms) {
        if (parseInt(platform) === platforms.length - 1) {
          suffix = ";";
        }
        insertValue += `(${gameId}, ${platforms[platform].id})${suffix}`;
      }
        let query = `      
        INSERT INTO games_platforms (game_id, platform_id )
        VALUES ${insertValue}`;
              
        db.query(query)
        .then((data) => {
        })
        .catch((err) => {
        })
    }

    const getPlatformsID = function (gameID){
        let insertPlatform = ''
        for (let i= 0; i < req.body.platforms.length; i++ ){
          if (i === req.body.platforms.length - 1){
            insertPlatform += "'" + req.body.platforms[i] + "'";
          } else {
            insertPlatform += "'" + req.body.platforms[i] + "'" + ","; 
          }
        }
        let query2 = `select id from platforms where name in (${insertPlatform});` 
        db.query(query2)
              .then((data) => {
                  insertGamePlatform(data.rows,gameID)
          })
          .catch((err) => {
            res.status(500).json({ error: err.message });
          });
    }

    const values = [name, id_api, user_id, genre, description];
    let query = `
      INSERT INTO games (user_id, api_id , name , genre , description)
      VALUES ($3, $2, $1, $4, $5) RETURNING *;
      `;
    db.query(query, values)
      .then((data) => {
        getPlatformsID(data.rows[0].id);
        const game = data.rows;
        res.json({ game });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
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
