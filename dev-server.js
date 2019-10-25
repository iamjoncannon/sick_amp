'use strict'
const express = require('express')
const path = require('path')
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 3001

app.use(cors())

app.options('*', cors())

// body parsing middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// static middleware
app.use(express.static(path.join(__dirname, './public')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'))
}) // Send index.html for any other requests

// error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error')
})

app.listen(PORT, () => console.log(`serving on port ${PORT}`))
