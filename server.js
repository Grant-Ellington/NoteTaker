
//requirement for npm express
const express = require('express')
//setting up common functions for exporess
const app = express();

//created PORT vairibale for .listen 
const PORT = 3002
const path = require('path')
//middleware
app.use(express.static('public'))

app.get('*', (req, res)=>{
    res.sendFile.apply(path.join(__dirname, '/public/index.html'))
})

app.get('/api/notes', (req, res)=>{
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})

//set up for port to be listened to by local host
app.listen(PORT, ()=>
console.log(`Serving static asset routes at http://localhost:${PORT}!`))