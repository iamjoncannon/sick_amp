'use strict'

const {  } = require('./../db/index')

const router = require('express').Router()
let fs = require('fs')

router.get('/', async (req, res, next)=>{
	
	res.json(JSON.stringify(blank))
	res.end()
})

router.use((req, res, next) => {
  const err = new Error('API route not found!')
  err.status = 404
  next(err)
})

module.exports = router
