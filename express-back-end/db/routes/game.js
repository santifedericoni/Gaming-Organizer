const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.post('/addList', (req, res) => {
    // console.log(req.body.platforms,'<platforms>')
    // console.log(req.body.data,'<game>')
    // console.log(req.body.userId,'<user>')
    console.log(req.body.data)
    const name = req.body.data.name;
    const id_api = req.body.data.id;
    const user_id = req.body.userId;
    const genre = req.body.data.genres[0].name;
    const description = req.body.data.description_raw;
    const photo = req.body.data.background_image;


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

    const values = [name, id_api, user_id, genre, description, false, true,photo];
    let query = `
      INSERT INTO games (user_id, api_id , name , genre , description, wish_list, active,photo)
      VALUES ($3, $2, $1, $4, $5, $6, $7, $8) RETURNING *;
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

    const values = [name, id_api, user_id, genre, description, true, true];
    let query = `
      INSERT INTO games (user_id, api_id , name , genre , description, wish_list, active)
      VALUES ($3, $2, $1, $4, $5, $6, $7) RETURNING *;
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

  router.post('/', (req,res) => {
    if (req.body.gameData !== undefined){
      let query = `
      SELECT * FROM games WHERE user_id = ${req.user.id} AND api_id = '${req.body.gameData.id}'
      `;
      db.query(query)
        .then(data => {
          res.json({ data });
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
      }
    });

    router.get('/user', (req,res) => {
        let query = `
        SELECT * FROM games WHERE user_id = ${req.user.id}
        `;
      console.log(query)
        db.query(query)
          .then(data => {
            console.log(data)
            res.json({ data });
          })
          .catch(err => {
            res
              .status(500)
              .json({ error: err.message });
          });
      });

      router.post("/delete", (req, res) => {
        const values = [req.body.val];
        const query = `UPDATE characters
        SET active = false
        WHERE id= $1;`
        db.query(query, values)
        .then((result) => {
    
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
      })
  return router;
};
