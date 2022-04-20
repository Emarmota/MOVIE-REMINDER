const {Schema, model } = require("mongoose");
let bcrypt = require("bcrypt")

const UserSchema = Schema({
    user_name: String,
    email: String,
    password: String,
    user_id: String,
    movie_list: []
})

UserSchema.methods.encryptPassword = function(password){
    return bcrypt.hashSync(password,10)
}

UserSchema.methods.validatePassword = function(userpassword){
    return bcrypt.compareSync(userpassword, this.password)
}

module.exports = model('users',UserSchema)