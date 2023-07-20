
require('dotenv').config();

const {createClient} = require("redis")
// const {redis}= require ('../auth/src/middlewares/middlewares')
const RedisStore = require('connect-redis').default;

async function rediss (req, res, next){
    const redisClient = createClient();
        redisClient.connect();
        console.log("Connected to Redis")
        const redisStore = new RedisStore({
            client: redisClient,
            prefix: ''
        })
    let cookie = req.headers['cookie']
    let sessionID = cookie.substring(16, 52)
    let session = await redisClient.get(sessionID)
    if(session){
        let real_session = JSON.parse(session)
        console.log(real_session);
        next()
    }else{
        res.status(403).json({
            success:false,
            message: "login to proceed"
        })
    }
}
module.exports ={
    rediss
}