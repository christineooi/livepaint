let timeoutID;
let sequenceNum = 0;
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
        

        console.log("Resetting clientupdates...");
        // Reset clientupdates
        clientupdates = [];
        // Poll the server every second for updates
        timeoutID = setTimeout(fetchUpdates, 1000);
    })
    .catch(error => {
        console.log("An error occured when attempted to fetch:", error);
        clearTimeout(timeoutID);
    })
}

fetchUpdates();