const mongoose = require('mongoose')
const mongoUri = 'mongodb://localhost:27017/moviesDB'

const connectToMongo = ()=>{
    mongoose.connect(mongoUri,()=>{
        console.log("Connected to mongoose successfully")
    },e=>console.log(e)
    )
}

module.exports = connectToMongo;