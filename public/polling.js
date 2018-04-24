let timeoutID;
let sequenceNum = -1;
// Add logic to this script to poll server every second for updated pixels.
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
        console.log("In fetch - data: ", data);
        let newestUpdates = data.updates;
        let latestSequenceNum = data.sequenceNum;
        console.log("newestUpdates.length: ", newestUpdates.length);
        // If there are new updates, replay to sync-up
        if (newestUpdates.length > 0){
            for(let i=0; i < newestUpdates.length; i++){
                console.log("In loop to call setColor: ", newestUpdates[i][0], newestUpdates[i][1], newestUpdates[i][2]);
                bitmap.setColor(newestUpdates[i][0], newestUpdates[i][1], newestUpdates[i][2]);
            }
        }
        console.log("Resetting clientupdates...");
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