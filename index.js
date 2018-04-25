const express = require("express")
const port = 3000
const app = express()

app.use(express.static('public'))
app.use(express.json())

let updates = [];


// Fill in your request handlers here
app.post('/updates', function (req, res, next) {
    let newestUpdate = [];
    let clientupdates = req.body.clientupdates;
    let sequenceNum = req.body.sequenceNum;

    if (clientupdates.length > 0){
        // Adds latest updates to updates array
        updates = updates.concat(clientupdates);
        // adds latest updates to newestUpdate array
        newestUpdate = updates.slice(sequenceNum);
      
        // Update sequence number
        sequenceNum = updates.length;
    }
    res.send({updates: updates, sequenceNum: sequenceNum});
})

app.listen(port)