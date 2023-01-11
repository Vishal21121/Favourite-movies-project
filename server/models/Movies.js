const mongoose = require('mongoose')

const moviesSchema = mongoose.Schema({
    img: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    rank: {
        type: String,
        required: true
    },

    personId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
    }
})

module.exports = mongoose.model('Movies', moviesSchema);