const app = require('../config/server')

module.exports =()=> {
    const router = express.Router();
    
    router.get('/',function(req,res) {
        let reqPath = path.join(__dirname, '../../Client/views/index.html')
        res.sendFile(reqPath)
    })
    
    return router()
}