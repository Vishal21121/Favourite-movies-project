const mongoose = require('mongoose')
const mongoUri = 'mongodb://127.0.0.1:27017/moviesDB'

const connectToMongo = ()=>{
    mongoose.connect(mongoUri,()=>{
        console.log("Connected to mongoose successfully")
    },e=>console.error(e)
    )
}
module.exports = connectToMongo;