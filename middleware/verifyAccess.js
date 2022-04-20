let jwt = require("jsonwebtoken")

function verifyToken(req,res,next){


    let token = req.cookies.token || '' ;

    if (!token) {

        if (!token){
            return res.redirect('/login')
        }
        else {

        }
    }
}

module.exports = verifyToken