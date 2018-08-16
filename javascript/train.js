var config = {
    apiKey: "AIzaSyDb7lZYEUNtAuEZbhyuoL3YtkN9-MjM2Ms",
    authDomain: "project2-4f94a.firebaseapp.com",
    databaseURL: "https://project2-4f94a.firebaseio.com",
    projectId: "project2-4f94a",
    storageBucket: "project2-4f94a.appspot.com",
    messagingSenderId: "243648788270"
}; 
firebase.initializeApp(config);

// Create a variable to reference the database.
var dataRef = firebase.database();
    
// Defining variables and initializing them
var name = "";
var destination = "";
var firstTrain = "";
var frequency = "";
var nextArival = "";
var minAway = "";

// click listener for the submit button
$("#submit").on("click", function(event) {
    // preventing page refreshing
    event.preventDefault();
    
    // getting the value of input data, trimming the possible additional spaces and the end, and storing them in the predefined variable
    name = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    firstTrain = $("#first-train").val().trim();
    frequency = $("#frequency").val().trim();
  
    // Pushing the variables in the firebase database
    dataRef.ref().push({    
        name: name,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    });
});

// Firebase watcher + initial loader ; everytime that a child is added to the database, a snapshot of that child will be taken of the    database, and the function will be executed using that snapshot values.
dataRef.ref().on("child_added", function(childSnapshot) {
    // var nextArival;
    // clearInterval(nextArival);
    // nextArival = setInterval (nextTrainUpdate ,60000);
    // setInterval(displayUpdate , 60000);   

    var nextArival = nextTrainUpdate (childSnapshot.val().firstTrain , childSnapshot.val().frequency);
    console.log("nextArival  ", nextArival);
    var minAway = MinsAwayUpdate (nextArival);

    console.log("freq "  + childSnapshot.val().frequency)

    var newRow = $("<tr>");
    newRow.append(  "<td>" + childSnapshot.val().name           + "</td>"   +
                    "<td>" + childSnapshot.val().destination    + "</td>"   +
                    "<td>" + childSnapshot.val().frequency      + "</td>"   +
                    "<td>" + childSnapshot.val().nextArival     + "</td>"   +
                    "<td>" + childSnapshot.val().minAway        + "</td>"   );   
    $("#data-row").append(newRow);
    // function nextTrainUpdate(){
    //     var nextTrain = childSnapshot.val().startTrain;
    //     var freq = childSnapshot.val().frequency;
    //     while (moment(nextTrain, "hhmm").isBefore(moment())) {
    //         nextTrain += freq;    
    //     }
    //     return nextTrain;
    // }

    // function displayUpdate () {

    // }



    // var time = childSnapshot.val().firstTrain;
    // var timeFormat = moment (time , "hhmmss").format("hhmm");
    // console.log(timeFormat);
    // var current = moment().format("hhmm");
    // var differ = moment(time , "hhmmss").diff(moment(), 'minutes');
    // console.log(differ);



 
  
  // Handle the errors
}, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
});
    
dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
  // Change the HTML to reflect
  $("#train-name-display").text(snapshot.val().name);
  $("#destination-display").text(snapshot.val().destination);
//   $("#first-train-display").text(snapshot.val().firstTrain);
  $("#frequency-display").text(snapshot.val().frequency);
});


function nextTrainUpdate (startTime , frequ){
    console.log("frequ   "+frequ)
    var nextTrain = startTime;
    console.log("next train " + nextTrain);
    var condition = moment(nextTrain, "hh:mm").isBefore(moment());
    console.log("condition " + condition);
    // while (condition) {
        var nextTrain1 = moment(nextTrain, 'hh:mm').add(frequ, 'm');
        console.log("inside the wile loop");
        condition = moment(nextTrain, "hh:mm").isBefore(moment());  
        console.log("condition " + condition);
    // }
    console.log("nextTrain1  "  +  nextTrain1); 
    return nextTrain;
}

// function that calculates how many minutes away is the train which schedueled for the arrival at time t 
function MinsAwayUpdate ( t ) {   
    // if next arival time is after current time, calculate the time difference and return the value
    if (moment(t, "hh:mm").isAfter(moment())){
        var minAway = moment(t, "hh:mm").diff(moment(), "minutes");
        console.log("nextTrain comes in " + minAway + " minutes");
        return minAway;
    } 
    // if time t == right now return 0 meaning train is here right now
    else if(moment(t, "hh:mm").isSame(moment())){
        console.log("Train is here");
        return "is here right now";
    } // otherwise return the string "already departed"
    else {
        console.log('OOOPS! This train has already departed , checkout the future arrivals');
        return "already departed";
    }
}

