
import request from 'supertest'
import express from 'express'

import pageMiddleware from '../../src/router/page'
import {initDB} from '../../src/module/dataBase'

import {randomString} from '../../src/util/random'

const app = express();

app.use(pageMiddleware)
initDB()

test('GET: /ajax/pages', (done) => {
    request(app)
    .get('/ajax/pages')
    .expect(200)
    .end(function(err, res) {
        if (err) throw err;
        expect(res.body.length).toBe(20)
        done()
    });
})
