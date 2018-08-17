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

// Create a variable to check if inputs are not empty upon submittion.
var isEmpty = true;
    
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

    // check if all inputs are filled in
    if (name !== "" &&  destination!== "" &&  firstTrain!== "" &&   frequency!== "") {
        isEmpty = false;
    } 
    // if all inuts are filled in , the push the inputs to the firebase database
    if (!isEmpty) {
        // Pushing the variables in the firebase database
        dataRef.ref().push({    
        name: name,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    });
    // if at least one input feild left blank the predefined boolean variable "isEmpty" sets back to true
    } else {
        console.log("some of the feilds are empty");
        isEmpty = true;
    }
  

});

// Firebase watcher + initial loader ; everytime that a child is added to the database, a snapshot of that child will be taken of the    database, and the function will be executed using that snapshot values.
dataRef.ref().on("child_added", function(childSnapshot) {
    nextTrainUpdate (childSnapshot.val().firstTrain , childSnapshot.val().frequency);    
    var newRow = $("<tr class='text-center'>");
    newRow.html(  "<td>" + childSnapshot.val().name           + "</td>"   +
                    "<td>" + childSnapshot.val().destination    + "</td>"   +
                    "<td>" + childSnapshot.val().frequency      + "</td>"   +
                    "<td>" + moment(nextArival).format("hh:mm A") + "</td>"   +
                    "<td>" + moment(minAway).format("mm")  + "</td>"
                );   
    //appending the new row to DOM
    $("#data-row").append(newRow);

    // clearing the form feilds after appending data to the DOM
    $( '#train-form' ).each(function(){
        this.reset();
    });

  // Handle the errors
}, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
});
    
dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
  // Change the HTML to reflect the added data
  $("#train-name-display").text(snapshot.val().name);
  $("#destination-display").text(snapshot.val().destination);
  $("#frequency-display").text(snapshot.val().frequency);
});

// function that takes the start time of the train and the frequency and calculates the next train and the minutes away from the next arrival
function nextTrainUpdate (startTime , freq){

    var firstTrain = startTime;   
    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTrainConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
    // Current Time
    var currentTime = moment();
    // Difference between the times in minutes
    var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
    // Time apart (remainder)
    var tRemainder = diffTime % freq;
    // Minute Until Train
    var tMinutesTillTrain = freq - tRemainder;
    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");    
    nextArival = nextTrain;
    minAway = moment(tMinutesTillTrain,"m");
    return nextTrain;
}
