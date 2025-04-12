const express = require('express');
const cors = require('cors') //To satisfy CORS Policy
app = express();
/////
app.use(cors())
app.use(express.json())
const bodyParser = require('body-parser');
app.use(bodyParser.json({ extended: true }));

var allBugs = []
var bugCounter = 0
var newBug = ''

// I should probably put some of these steps into an extra function for better readability?
app.post('/bugs', (req, res) => {
    //bugData reported by user
    const bugData = JSON.stringify(req.body)
    //bugID given by the system (naively with a counter).
    const bugID = bugCounter.toString()
    //time of report -- is decided by server, which is a plus.
    const time = new Date()

    //update the Object to contain all data
    const newBug = {id: bugID, data: bugData, createdAt: time}
    
    //push newBug to the "Database"
    allBugs.push(newBug)
    console.log(allBugs)
    //used for ID of bug report
    bugCounter += 1
    //#trustme im always good
    res.sendStatus(200)

})

// route for handling requests from the Angular client.
app.get('/bugs', (req, res) => {
    console.log("Server: Sent all Bugs")
    //that was the easy part.
    res.json({allBugs});
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
