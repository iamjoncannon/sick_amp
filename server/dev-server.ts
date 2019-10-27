'use strict'
const express = require('express')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 3001
const dummyData = require('./id3')

// body parsing middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// static middleware
app.use(express.static(path.join(__dirname, './public')))

app.get("/data", (req : any, res: any ) => {

  const returnJason = require('./id3')
  
  res.send(JSON.stringify(returnJason))
  res.end
  
}) 

app.get('*', (req : any, res: any ) => {
  res.sendFile(path.join(__dirname, './public/index.html'))
}) // Send index.html for any other requests

// error handling middleware
app.use((err : any, req: any, res : any , next: any) => {
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error')
})

app.listen(PORT, () => console.log(`serving on port ${PORT}`))