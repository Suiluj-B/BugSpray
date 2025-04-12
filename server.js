const express = require('express');
const cors = require('cors') //To satisfy CORS Policy
app = express();
/////
app.use(cors())
app.use(express.json())
const bodyParser = require('body-parser');
app.use(bodyParser.json({ extended: true }));
// handling CORS
//app.use((req, res, next) => {
//    res.header("Access-Control-Allow-Origin", 
//               "http://localhost:4200");
//    res.header("Access-Control-Allow-Headers", 
//               "Origin, X-Requested-With, Content-Type, Accept");
//    next();
//});



var allBugs = []
var bugCounter = 0
var newBug = ''

app.post('/bugs', (req, res) => {
    const bugData = JSON.stringify(req.body)
    const bugID = bugCounter.toString()
    const time = new Date()

    const newBug = {id: bugID, data: bugData, time: time}
    
    allBugs.push(newBug)
    console.log(allBugs)
    bugCounter += 1
    res.sendStatus(200)

    //allBugs = {newBug, ...allBugs}
    //console.log(newBug)

    
    //console.log(JSON.stringify(allBugs))

    //console.log(req.body)
    
    //console.log(currentBugs = JSON.parse(allBugs))
    //test = req.body
    //count = JSON.stringify(bugCounter)
    //allBugs.push({test})
    //console.log(allBugs)
    
    
    //console.log(res.json({requestHeaders: req.Headers.}))
    //res.json({requestBody: req.body})
    //allOldBugsObj = JSON.parse(req),
    //console.log(test)

    //completeBugs = allOldBugsObj.push(newBug),
    //allBugs = JSON.stringify(completeBugs)
})


// route for handling requests from the Angular client
app.get('/bugs', (req, res) => {
    console.log("Server: Sent all Bugs")
    res.json({allBugs});
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
