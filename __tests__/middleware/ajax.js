
import request from 'supertest'
import express from 'express'
import bodyParser from 'body-parser'

import ajaxMiddleware from '../../src/middleware/ajax'
import {initDB,videoDetail} from '../../src/module/database'

import {randomString} from '../../src/util/random'

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

test('GET: /videos`', (done) => {
    const exist = JSON.stringify({newTitle : false})

    request(app)
    .get(`/videos?exist=${exist}`)
    .expect(200)
    .end(function(err, res) {
        if (err) throw err;
        const result = res.body
        result.forEach( (obj) => {
            expect(obj.newTitle).toBeUndefined()
        })
        done()
    });
})

test('GET: /videos`', (done) => {
    const exist = JSON.stringify({newTitle : true})

    request(app)
    .get(`/videos?exist=${exist}`)
    .expect(200)
    .end(function(err, res) {
        if (err) throw err;
        const result = res.body
        result.forEach( (obj) => {
            expect(typeof obj.newTitle).toBe('string')
        })
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


test('PUT: /videos/:id', (done) => {
    const randomStr= randomString()
    const payload = {newTitle: randomStr}

    request(app)
    .put(`/videos/${videoId}`)
    .send(payload)
    .expect(200)
    .end(function(err, res) {
        videoDetail(videoId).then(
            (detail) => {
                expect(detail.newTitle).toBe(randomStr)
                done()
            }
        )
    });
})