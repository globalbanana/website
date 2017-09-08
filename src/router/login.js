import express from 'express'
import {isAdmin, extendToken} from '../module/facebook'
import UserModel from '../module/database/user'

const router = express.Router()

var cookieParser = require('cookie-parser')
router.use(cookieParser())

var bodyParser = require('body-parser')
router.use(bodyParser.json())

router.get('/', (req,res) => {
    var path    = require("path");
    res.sendFile(path.join(__dirname+'/../htmlView/login.html'));
})

router.get('/redirect', async (req,res) => {
    try{

        const id = req.query.id
        const name = req.query.name
        const email = req.query.email

        const _token = req.cookies.fbAccessToken    
        const _isAdmin = await isAdmin(_token)

        if(_isAdmin){
            const longLiveToken = (await extendToken(_token)).access_token

            const payload = {
                fbId: id,
                fbName: name,
                email: email,
                shortToken: _token,
                longToken: longLiveToken
              }
                        
            UserModel.create(payload).then(
                res => console.log(name , "'s token is saved to DB")
            )

            res.redirect('/videos')
        }
        else 
        res.send('Admin is required')

    } catch(err){ res.send('exception : ' + err) }
})

export default router
