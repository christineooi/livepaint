const express = require("express")
const port = 3000
const app = express()

app.use(express.static('public'))
app.use(express.json())

const updates = [];


// Fill in your request handlers here
app.post('/updates', function (req, res, next) {
    let newestUpdate = [];
    let clientupdates = req.body.clientupdates;
    let sequenceNum = req.body.sequenceNum;
    console.log("In server - clientupdates: ", clientupdates);
    console.log("sequenceNum: ", sequenceNum);
    console.log("updates array: ", updates);
    if (typeof clientupdates !== 'undefined' && clientupdates.length > 0){
        if (sequenceNum === -1){
            for(let i=0; i < updates.length; i++){
                newestUpdate.push(updates[i]);
            }
        } else {
            newestUpdate = updates.slice(sequenceNum+1);
        }
        for(let x=0; x<clientupdates.length; x++){
            console.log("clientupdates[x]:", clientupdates[x]);
            updates.push(clientupdates[x]);
        }
        // Update sequence number
        sequenceNum = updates.length-1; 
        console.log("updated sequenceNum: ", sequenceNum);
    }
    console.log("sending updates back to client");
    res.send({updates: newestUpdate, sequenceNum: sequenceNum});
})

app.listen(port)