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
    
// Initial Values
var name = "";
var destination = "";
var firstTrain = 0;
var frequency = "";

// Capture Button Click
$("#submit").on("click", function(event) {
  event.preventDefault();
  
  // YOUR TASK!!!
  // Code in the logic for storing and retrieving the most recent user.
  // Don't forget to provide initial data to your Firebase database.
  name = $("#train-name").val().trim();
  destination = $("#destination").val().trim();
  firstTrain = $("#first-train").val().trim();
  frequency = $("#frequency").val().trim();
  
  // Code for the push
  dataRef.ref().push({
    
    name: name,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency
    // dateAdded: firebase.database.ServerValue.TIMESTAMP()
  });
});
var counter = 0;
// Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
dataRef.ref().on("child_added", function(childSnapshot) {
  counter += 1;
  console.log("Counter: " + counter);
  // Log everything that's coming out of snapshot
  console.log(childSnapshot.val().name);
  console.log(childSnapshot.val().name);
  console.log(childSnapshot.val().destination);
  console.log(childSnapshot.val().firstTrain);
  console.log(childSnapshot.val().frequency);
 
  
  // full list of items to the well
  $("#full-member-list").append("<div class='well'><span class='member-name'> " + counter + "." +  childSnapshot.val().name +
    " </span><span class='member-destination'> " + childSnapshot.val().destination +
      " </span><span class='member-first-train'> " + childSnapshot.val().firstTrain +
        " </span><span class='member-frequency'> " + childSnapshot.val().frequency + " </span></div>");
        
  // Handle the errors
}, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
});
    
dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
  // Change the HTML to reflect
  $("#name-display").text(snapshot.val().name);
  $("#destination-display").text(snapshot.val().destination);
  $("#first-train-display").text(snapshot.val().firstTrain);
  $("#frequency-display").text(snapshot.val().frequency);
});



