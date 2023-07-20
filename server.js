const express = require('express');
require('dotenv').config();
const { v4 } = require("uuid")
const session = require('express-session');
const config = require('../auth/src/config/config')
const {createClient} = require("redis")
const sql = require('mssql');
// const bodyParser = require('body-parser');
const cors = require('cors')
const RedisStore = require('connect-redis').default;




// const {rediss}= require ('../auth/src/middlewares/middlewares')
const UserRoutes = require('./src/routers/UserRouters')
const Router = require('./src/routers/routers')


const app = express();
app.use(express.json());

const corsOptions = {

  origin: 'http://localhost:5173',

  credentials: true,

  optionSuccessStatus: 200,

};

app.use(cors(corsOptions));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));





async function startApp(){
  try {
      const pool = await sql.connect(config)
      console.log("App Connected to database");
  
      const redisClient =  createClient();
      redisClient.connect()
      console.log("Connected to Redis")
      
      const redisStore = new RedisStore({
          client: redisClient,
          prefix: ''
      })
      const oneDay = 60 * 60 * 1000 * 24;
  app.use((req, res, next)=>{req.pool = pool; next()})
  app.use(session({
      store: redisStore,
      secret: 'SECRET',
      saveUninitialized: false,
      genid: ()=>v4(),
      resave: false,
      rolling: true,
      unset: 'destroy',
      cookie:{
          httpOnly: true,
          maxAge: oneDay,
          secure: false,
          domain: 'localhost'
      }
  }))

  app.get('/',(req, res) =>{
    res.send("christagram")
    })
    app.use(UserRoutes)
    app.use(Router)
    // app.use(rediss)
    

console.log(process.env.DB_USER);
const port = 5000;


app.listen(port, ()=>{
  console.log(`server is running on port ${port}`);
})

} catch (error) {
  console.log("Error connecting to database")
  console.log(error)
}
}

startApp();




