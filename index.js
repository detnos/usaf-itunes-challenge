const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const beatles = require('./beatles.json') //Call that pulled the file info: https://itunes.apple.com/search?term=beatles&entity=musicTrack

app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Retrieves a list of all song names and displays as an array
app.get('/', (req, res) => {
    let songArr = [];
    for(var i = 0; i < beatles.length; i++){
        songArr[i] = beatles[i].trackName
    }
    res.send(songArr)
});

//Retrieves entire API
app.get('/all', (req, res) => {
    res.send(beatles)
});

//Retrieves song track and collection name for a given track ID
app.get('/trackId/:id', (req, res) => {
    let value = req.params.id
    let songObj = beatles.filter(song => song['trackId'].toString().includes(value)) 
    let song = [];
    for(var i = 0; i < songObj.length; i++){
        song[i] = {
            "trackName": songObj[i]['trackName'],
            "collectionName": songObj[i]['collectionName']
        }
    }
    res.send(song)
});


//Retrieves song track and collection name for a given track name keyword (word like "the" will pull song "come together")
app.get('/trackName/:keyword', (req, res) => {
    let value = req.params.keyword
    let songObj = beatles.filter(song => song['trackName'].toLowerCase().includes(value)) 
    let song = [];
    for(var i = 0; i < songObj.length; i++){
        song[i] = {
            "trackName": songObj[i]['trackName'],
            "collectionName": songObj[i]['collectionName']
        }
    }
    res.send(song)
});

//Retrieves song track and collection name for a given collection ID
app.get('/collectionId/:id', (req, res) => {
    let value = req.params.id
    let songObj = beatles.filter(song => song['collectionId'].toString().includes(value)) 
    let song = [];
    for(var i = 0; i < songObj.length; i++){
        song[i] = {
            "trackName": songObj[i]['trackName'],
            "collectionName": songObj[i]['collectionName']
        }
    }
    res.send(song)
});

//Retrieves song track and collection name for a given collection name keyword (also accepts numbers)
app.get('/collectionName/:keyword', (req, res) => {
    let value = req.params.keyword
    let songObj = beatles.filter(song => song['collectionName'].toLowerCase().includes(value)) 
    let song = [];
    for(var i = 0; i < songObj.length; i++){
        song[i] = {
            "trackName": songObj[i]['trackName'],
            "collectionName": songObj[i]['collectionName']
        }
    }
    res.send(song)
});

//Updates song information (track and collection name) by track ID 
app.patch('/update/:id', (req, res) => {
    let trackId = req.params.id

    let songObj = {
        "trackName": req.body.trackName,
        "collectionName": req.body.collectionName
    }
    
    let value = 0;
    for(var i = 0; i < beatles.length; i++){
        if(beatles[i]['trackId'].toString() === trackId){
            beatles[i] = {...beatles[i], ...songObj}
            value = i;
        }
    }
    res.send(beatles[value])
})

//Adds a new song entry (just kind, track name, collection name, and artist name )
app.post('/add', (req, res) =>{
    let songObj = {
        "kind": req.body.kind,
        "artistName": req.body.artistName,
        "collectionName": req.body.collectionName,
        "trackName": req.body.trackName
    }

    beatles.push(songObj)
    res.send(beatles[beatles.length-1])
})


const port = 3000
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

