import express from 'express'
import PageModel from '../module/dataBase/page'

const router = express.Router()

router.get('/ajax/pages', (req, res) => {  
  const initLimit = 20
  const initSkip = 0
  const initSortBy = '-createdAt'
  const initField = {feq: {$ne : undefined}}
  
  const limit = req.query.limit ? JSON.parse(req.query.limit) : initLimit
  const skip = req.query.skip ? JSON.parse(req.query.skip) : initSkip
  const sort = req.query.sort ? req.query.sort : initSortBy
  
  const field= req.query.field ? 
        (JSON.parse(req.query.field).feq !=='ALL')? JSON.parse(req.query.field):initField 
        : initField

  const exist= req.query.exist ? JSON.parse(req.query.exist) : {}

  PageModel.getList({limit, skip, sort}, field, exist).then(
    result => res.json(result),
    err => {
      console.log(' +*+*+*+*+* /ajax/videos +*+*+*+*+* ', err)      
      res.json(err)
    }
  )
})

export default router