
import request from 'supertest'
import express from 'express'

import pageMiddleware from '../../src/router/page'
import {initDB} from '../../src/module/dataBase'

import {randomString} from '../../src/util/random'
import querystring from 'querystring'

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

// {feq: 'DAY'}
test('GET: /ajax/pages?field=%7B%22feq%22%3A%22DAY%22%7D', (done) => {
    const field = JSON.stringify({feq:'DAY'})
    const params = {field}
    request(app)
    .get(`/ajax/pages?${querystring.stringify(params)}`)
    .expect(200)
    .end(function(err, res) {
        if (err) throw err;
        const verify = item => expect(item.feq).toBe('DAY')
        res.body.forEach( verify )
        done()
    });
})

// {feq: 'ALL'}
test.only('GET: /ajax/pages?limit=99&field=%7B%22feq%22%3A%22ALL%22%7D', (done) => {
    const field = JSON.stringify({feq:'ALL'})
    const limit = 200
    const params = {limit, field}
    request(app)
    .get(`/ajax/pages?${querystring.stringify(params)}`)
    .expect(200)
    .end(function(err, res) {
        if (err) throw err;

        const day = res.body.some( item => item.feq ==='DAY')
        const week =res.body.some( item => item.feq ==='WEEK')
        const search_large =res.body.some( item => item.feq ==='SEARCH_LARGE')

        expect(day).toBe(true)
        expect(week).toBe(true)
        expect(search_large).toBe(true)

        done()
    });
})
