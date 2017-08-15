
import request from 'supertest'
import express from 'express'
import bodyParser from 'body-parser'

import ajaxMiddleware from '../../src/middleware/ajax'
import {initDB} from '../../src/module/database'

const app = express();
 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(ajaxMiddleware)
initDB()

let videoId = ''

test('GET: /videos?limit=20&skip=0', (done) => {
    request(app)
    .get('/videos?limit=20&skip=0')
    .expect(200)
    .end(function(err, res) {
        if (err) throw err;
        videoId = res.body[0]._id
        done()
    });
})

test('GET: /videos', (done) => {
    request(app)
    .get('/videos?sort="-description"')
    .expect(200)
    .end(function(err, res) {
        if (err) throw err;        
        let pre = null
        res.body.forEach((vObj) => {
            const cur = vObj.description[0]
            // if(pre)
            //    expect( cur > pre).toBe(false)
            pre = cur
        })
        done()
    });
})

test('GET: /videos/:id', (done) => {
    console.log('Going to test videoId: ', videoId)
    request(app)
    .get(`/videos/${videoId}`)
    .expect(200)
    .end(function(err, res) {
        if (err) throw err;
        expect(res.body._id).toBe(videoId)
        done()
    });
})

test('GET: /system', (done) => {
    request(app)
    .get(`/system`)
    .expect(200)
    .end(function(err, res) {
        if (err) throw err;
        expect(typeof res.body.count).toBe('number')
        done()
    });
})