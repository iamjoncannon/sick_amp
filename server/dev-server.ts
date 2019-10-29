'use strict'
const http = require('http');
const express = require('express')
const path = require('path')
const fs = require('fs')
const app = express()
const PORT = process.env.PORT || 3000
// const dummyData = require('./id3')

// body parsing middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// static middleware
app.use(express.static(path.join(__dirname, './public')))

app.get('/track/:fileName', (req, res, err) => {
  
  const filePath = path.resolve(__dirname, './public/tunes', req.params.fileName);
  const stat = fs.statSync(filePath);

  // res.writeHead(200, {
  //   'Content-Type': 'audio/mpeg',
  //   'Content-Length': stat.size
  // });

  const readStream = fs.createReadStream(filePath);

  // attach this stream with response stream
  readStream.pipe(res);
});


// static data and error handling 

app.get("/data", (req : any, res: any ) => {

  // const returnJason = require('./id3')
  
  res.send(JSON.stringify(require('./public/file_data.json')))
  res.end()
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
