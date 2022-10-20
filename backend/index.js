const connectToMongo = require('./db')
const express = require('express');
const cors = require('cors')

connectToMongo();

const app = express()
app.use(express.json())

app.use(cors());

app.use('/api', require('./routes/auth-route'));
app.use('/api', require('./routes/MoviesRoute'));

app.listen(5000, () => {
    console.log("Listening at port 5000")
})