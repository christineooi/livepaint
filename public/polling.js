let timeoutID;
let sequenceNum = 0;
// Poll server every second for updated pixels.
function fetchUpdates(){
    const postRequestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({"clientupdates": clientupdates, "sequenceNum": sequenceNum}),
    }

    fetch('/updates', postRequestOptions)
    .then(response => response.json())
    .then(data => {
        let newestUpdates = data.updates;
        let latestSequenceNum = data.sequenceNum;
        // If there are new updates, replay to sync-up
        for(let i=0; i < newestUpdates.length; i++){
            bitmap.setColor(newestUpdates[i][0], newestUpdates[i][1], newestUpdates[i][2]);
        }
    
        // Reset clientupdates
        clientupdates = [];
        // Set sequence number to highest-seen index number
        sequenceNum = latestSequenceNum;
        // Poll the server every second for updates
        timeoutID = setTimeout(fetchUpdates, 1000);
    })
    .catch(error => {
        console.log("An error occured when attempted to fetch:", error);
        clearTimeout(timeoutID);
    })
}

fetchUpdates();