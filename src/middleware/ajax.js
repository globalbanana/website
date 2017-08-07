import express from 'express'
import {videoCreate, videoList, videoDetail} from '../../src/module/database'

const router = express.Router()

router.get('/videos', (req, res) => {
    const limit = (req.query.limit) ? JSON.parse(req.query.limit) : 20
    const skip = (req.query.skip) ? JSON.parse(req.query.skip) : 0
    videoList({limit:2, skip:2}).then(
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
