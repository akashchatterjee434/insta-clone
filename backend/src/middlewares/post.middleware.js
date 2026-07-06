const jwt = require("jsonwebtoken")
async function identifyUser(req, res, next){
     const token = req.cookies.token
    
        if (!token) {
            return res.status(401).json({
                message: "Token not provieded, unauthorized access"
            })
        }
        let decoded = null
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET)// yeh line user ki id deta hain
    
        } catch (err) {
    
            return res.status(401).json({
                message: "user not fucking authorized"
            })
        }
        
        req.user = decoded

       
        

        next()
}

module.exports = identifyUser