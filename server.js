const fs = require('fs')
const util = require('util')
//requirement for npm express
const express = require('express')
//setting up common functions for express
const app = express();

//created PORT vairibale for .listen 
const PORT = 3002
const path = require('path');
const { title } = require('process');
const e = require('express');
//middleware
app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({extended: true}))

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

app.post('/api/notes', (req, res) => {
        console.log(req.body)
       const {title, text} = req.body

        if(title && text) {
            const newNote = {title, text}
        

        readFileAsync('./db/db.json','utf8').then((data)=>{
            data = JSON.parse(data)
        return [...data, newNote]
    }).then((data)=>{writeFileAsync('./db/db.json', JSON.stringify(data))}).then(
        ()=>{return res.json(newNote)}
    )
} else{throw new Error('note must conatain title and text')}
    
})


app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '/public/index.html'))
})



//set up for port to be listened to by local host
app.listen(PORT, ()=>
console.log(`Serving static asset routes at http://localhost:${PORT}`))