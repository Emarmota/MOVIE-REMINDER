const {Schema, model } = require("mongoose");

const UserSchema = Schema({
    user_name: String,
    email: String,
    password: String,
    user_id: String,
    movie_list: []
})

module.exports = model('users',UserSchema)