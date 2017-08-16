import express from 'express'
import {videoList, videoDetail, videoCount, videoUpdate} from '../../src/module/database'
var bodyParser = require('body-parser')

const router = express.Router()

router.use(bodyParser.json())

router.get('/videos', (req, res) => {
  const initLimit = 20
  const initSkip = 0
  const initSortBy = '-createdAt'

  const limit = req.query.limit ? JSON.parse(req.query.limit) : initLimit
  const skip = req.query.skip ? JSON.parse(req.query.skip) : initSkip
  const sort = req.query.sort ? req.query.sort : initSortBy

  videoList({limit, skip, sort}).then(
    result => res.json(result),
    err => res.json(err)
  )
})

router.get('/videos/:id', (req, res) => {
  const videoId = req.params.id
  videoDetail(videoId).then(
    result => res.json(result),
    err => res.json(err)
  )
})


router.put('/videos/:id', (req, res) => {
  const videoId = req.params.id
  const condition = {_id: videoId}
  const payload = (req.body)

  videoUpdate(condition, payload).then(
    result => res.json(result),
    err => res.json(err)
  )
})

router.get('/system', (req, res) => {
  videoCount().then(
    count => res.json({count}),
    err => res.json(err)
  )
})

export default router
