const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = 3000;
const SECRET_KEY ='secret_key';


function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(403);
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(404);
    req.user = user;
    next();
  });
}

app.get('/testing', (req,res) => {
  res.send('¡Hola Desarrollador!')
})

app.post('/signup' , (req,res) => {
  const id  = req.body.id;
  const username = req.body.username;
  const password = req.body.password;

  /*
    Here we are creating a token with the user id and a secret key.
   */
  jwt.sign(id , SECRET_KEY , (err,token) => {
    if(err){
      res.status(400).send({msg : 'Error'})
    }
    else {
      res.send({msg:'success' , token: token})
    }
  })
})


app.post('/login' , verifyToken , (req,res) => {
  res.send('You are Authorized!')
})



app.listen(PORT,() =>  {
    console.log('Server is running on port' , PORT);
});


