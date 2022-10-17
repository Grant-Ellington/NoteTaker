const fs = require('fs')
const util = require('util')
//requirement for npm express
const express = require('express')
//setting up common functions for exporess
const app = express();

//created PORT vairibale for .listen 
const PORT = 3002
const path = require('path')
//middleware
app.use(express.static('public'))

const readFileAsync = util.promisify(fs.readFile)
const writeFileAsync = util.promisify(fs.writeFile)
app.get('/notes', (req, res)=>{
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})

app.get('/api/notes', (req, res) => {
    readFileAsync('./db/db.json', 'utf8').then(data => {
        //console.log(data)
        let activeNotes;
        activeNotes = [].concat(JSON.parse(data));
        return res.json(activeNotes)
    })
})

app.post('./api/notes', (req, res) => {
    writeFileAsync('./db/db.json', 'utf8').then(data => {
        let saveNote = [].concat(JSON.parse(data))
        return req.json(saveNote)
    })
})


app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '/public/index.html'))
})



//set up for port to be listened to by local host
app.listen(PORT, ()=>
console.log(`Serving static asset routes at http://localhost:${PORT}`))