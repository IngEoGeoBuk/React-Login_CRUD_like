// node index.js
// nodemon --watch index.js

const express = require('express')
const app = express()
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'qkdgkahr7365',
    database: 'fifa'
}); 

////// 게시물부분 //////

app.post('/create', (req, res) => {
    const email = req.body.email;
    const title = req.body.title;
    const contents = req.body.contents;

    db.query(
        'INSERT INTO post (email, title, contents) VALUES(?, ?, ?)', 
        [email, title, contents], 
        (err, result) => {
            if(err) {
                console.log(err)
            } else {
                res.send("Values Inserted")
            }
        }
    );
});

app.get('/read', (req, res) => {
    db.query("SELECT * FROM post", (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
}) 

// 개념글 컷 높이고 싶으면 HAVING liked >= ? 숫자 건드리세요.
app.get('/readBest', (req, res) => {
  db.query(
    `SELECT p.id, p.title, COUNT(l.liked) AS liked 
    FROM post as p 
    JOIN like_dislike as l 
    ON p.id = l.po_id
    WHERE liked = 1 
    GROUP BY p.id
    HAVING liked >= 3
    ORDER BY p.id;`, 
    (err, result) => {
      if (err) {
          console.log(err)
      } else {
          res.send(result)
      }
  })
}) 


app.get('/readOne/:id', (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM post WHERE id = ?", id, 
  (err, result) => {
      if (err) {
          console.log(err)
      } else {
          res.send(result)
      }
  })
}) 

app.put("/update/:id", (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  const contents = req.body.contents;

  db.query(
    "UPDATE post SET title = ?, contents = ? WHERE id = ?",
    [title, contents, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

  
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM post WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//////////////////////////////////



//////// 댓글부분 ///////////


app.post('/createComment', (req, res) => {
  const poId = req.body.poId;
  const email = req.body.email;
  const context = req.body.context;
  const time = req.body.time;

  db.query(
      'INSERT INTO comments (po_id, email, context, time) VALUES(?, ?, ?, ?)', 
      [poId, email, context, time], 
      (err, result) => {
          if(err) {
              console.log(err)
          } else {
              res.send("Values Inserted")
          }
      }
  );
});


app.get('/readComment/:id', (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM comments WHERE po_id = ?", id, 
  (err, result) => {
      if (err) {
          console.log(err)
      } else {
          res.send(result)
      }
  })
}) 

app.delete("/deleteComment/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM comments WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});


app.put("/updateComment/:updateTargetCommentId", (req, res) => {
  const updateTargetCommentId = req.params.updateTargetCommentId;
  const context = req.body.newContext;
  const time = req.body.time;
  
  db.query(
    "UPDATE comments SET context = ?,  time = ? WHERE id = ?",
    [context, time, updateTargetCommentId],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

////////////////////////////



//////// 좋아요 & 싫어요 부분 //////////
app.post('/upLike', (req, res) => {
  const poId = req.body.poId;
  const email = req.body.email;

  db.query(
      'INSERT INTO like_dislike (po_id, email, liked, disliked) VALUES(?, ?, ?, ?)', 
      [poId, email, 1, 0], 
      (err, result) => {
          if(err) {
              console.log(err)
          } else {
              res.send("Values Inserted")
          }
      }
  );
});

app.delete("/unLike/:likeId", (req, res) => {
  const likeId = req.params.likeId;
  db.query("DELETE FROM like_dislike WHERE id = ?", likeId, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post('/upDislike', (req, res) => {
  const poId = req.body.poId;
  const email = req.body.email;
  db.query(
      'INSERT INTO like_dislike (po_id, email, liked, disliked) VALUES(?, ?, ?, ?)', 
      [poId, email, 0, 1], 
      (err, result) => {
          if(err) {
              console.log(err)
          } else {
              res.send("Values Inserted")
          }
      }
  );
});

app.delete("/unDislike/:likeId", (req, res) => {
  const likeId = req.params.likeId;
  db.query("DELETE FROM like_dislike WHERE id = ?", likeId, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get('/readYourLike/:poId/:email', (req, res) => {
  const email = req.params.email;
  const poId = req.params.poId;
  db.query(`SELECT * FROM like_dislike WHERE po_id=${poId} AND email='${email}'`, 
  (err, result) => {
      if (err) {
          console.log(err)
      } else {
          res.send(result)
      }
  })
}) 

//// 좋아요 싫어요 읽어오는 부분 

app.get('/readLike/:poId', (req, res) => {
  const poId = req.params.poId;
  db.query(`SELECT count(*) as count FROM like_dislike WHERE po_id=${poId} AND liked=1`, 
  (err, result) => {
      if (err) {
          console.log(err)
      } else {
          res.send(result)
      }
  })
}) 

app.get('/readDislike/:poId', (req, res) => {
  const poId = req.params.poId;
  db.query(`SELECT count(id) as count FROM like_dislike WHERE po_id=${poId} AND disliked=1`, 
  (err, result) => {
      if (err) {
          console.log(err)
      } else {
          res.send(result)
      }
  })
}) 

//////////////////////////////////////////

app.listen(5000, () => {
    console.log("yey, server is running on port 5000");
})