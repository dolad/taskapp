const jwt = require('jsonwebtoken');
const User = require('../models/users');

const auth = async (req, res, next) => {
    try {
        // get token from bearer
        const token = req.header('Authorization').replace('Bearer ', '');
      
        // verify the token
        const decoded = jwt.verify(token, 'thisisfornode');
        // use the id from the verify to find user that has stored token
        const user = await User.findOne({_id : decoded._id, "tokens.token": token})

        if(!user){
            throw new Error()
        }
        req.token = token
        req.user = user;
        next();
    } catch (e) {
        res.status(401).send({error:'Please authenticate'})
    }
}

module.exports = auth