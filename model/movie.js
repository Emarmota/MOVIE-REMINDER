const {Schema, model } = require("mongoose")

const MovieSchema = Schema({
    movieId: String,
    coverUrl: String
})

module.exports = model('movie', MovieSchema)