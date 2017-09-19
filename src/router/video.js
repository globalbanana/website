import express from 'express'
import {videoList, videoDetail, videoCount, videoUpdate} from '../../src/module/dataBase'
import {uploadLocalFile} from '../../src/module/s3'

const multiparty = require('multiparty');
const fs = require('fs');

var bodyParser = require('body-parser')
const router = express.Router()

router.use(bodyParser.json())

router.get('/ajax/videos', (req, res) => {  
  const initLimit = 20
  const initSkip = 0
  const initSortBy = '-createdAt'
  const initField = {status: {$ne : "DELETED"}}

  const limit = req.query.limit ? JSON.parse(req.query.limit) : initLimit
  const skip = req.query.skip ? JSON.parse(req.query.skip) : initSkip
  const sort = req.query.sort ? req.query.sort : initSortBy

  const field= req.query.field ? JSON.parse(req.query.field) : initField
  const exist= req.query.exist ? JSON.parse(req.query.exist) : {}

  console.log(' +*+*+*+*+* /field +*+*+*+*+* ', field)      
  

  videoList({limit, skip, sort}, field, exist).then(
    result =>  res.json(result),
    err => {
      console.log(' +*+*+*+*+* /ajax/videos +*+*+*+*+* ', err)      
      res.json(err)
    }
  )
})

router.get('/ajax/videos/:id', (req, res) => {
  const videoId = req.params.id
  videoDetail(videoId).then(
    result => res.json(result),
    err => res.json(err)
  )
})

router.put('/ajax/videos/:id', (req, res) => {  
  const videoId = req.params.id
  const condition = {_id: videoId}
  const payload = (req.body)
  
  videoUpdate(condition, payload).then(
    result => res.json(result),
    err => res.json(err)
  )
})

router.get('/ajax/system', (req, res) => {  
  const initField = {status: {$ne : "DELETED"}}
  const field= req.query.field ? JSON.parse(req.query.field) : initField
  
  videoCount(field).then(
    count => res.json({count}),
    err => res.json(err)
  )
})


const downloadFileToLocal = (fromPath, toPath) => 
  new Promise( (resolve, reject) => {
    fs.readFile(fromPath, (err, data) => {
      fs.writeFile(toPath, data, (err) => {
        fs.unlink(fromPath, () => {
          resolve()
        });
      }); 
    }); 
  })

router.post('/ajax/upload', (req, res) => {
  let form = new multiparty.Form();

  form.parse(req, (err, fields, files) => {
    let {path: tempPath, originalFilename} = files.file[0];
    let copyToPath = "./download/" + originalFilename;

    downloadFileToLocal (tempPath, copyToPath).then(
      () => uploadLocalFile(copyToPath)
    ).then(
      result => res.json({url: result})
    )
  })
})

export default router
