import express from 'express'
import {isAdmin} from '../module/facebook'

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

        const name = req.query.name
        const email = req.query.email

        const _token = req.cookies.fbAccessToken    
        const _isAdmin = await isAdmin(_token)
        
        console.log('       name: ', name)
        console.log('       email: ', email)

        if(_isAdmin)
        res.redirect('/videos')
        else 
        res.send('Admin is required')

    } catch(err){ res.send('exception : ' + err) }
})

export default router
