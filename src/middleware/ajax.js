import express from 'express'
import {videoList, videoDetail} from '../../src/module/database'

const router = express.Router()

router.get('/videos', (req, res) => {
  const initLimit = 20
  const initSkip = 0

  const limit = req.query.limit ? JSON.parse(req.query.limit) : initLimit
  const skip = req.query.skip ? JSON.parse(req.query.skip) : initSkip
  videoList({limit, skip}).then(
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

export default router