const signUpSchema  = require('../userController/joi')

const Authentication = (req, res) => {
    console.log(req.body)
}

module.exports = {
    Authentication
}