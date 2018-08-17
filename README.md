
# Take the Dream Train any time any where!

<!-- Put a description of what the project is -->

This fun project is using javaScript, jQuery, and wondeful firebase to create dynamic websites!

Using the sweet language of javascript and the rich library of jQuery and its powerful built-in functions, I created this train achedueling website in which DOM is manipulated in real-time based on the user input and its realtime communication with the associated database stored in the sweet firebase. 
Take your dream trip now and ENJOY!
 

# Link to deployed site
<!-- make a link to the deployed site --> 
<!-- [What the user will see](the link to the deployed site) -->

[Take the Dream Train any time any where](https://nasibnia.github.io/trainActivity/)


# Images
<!-- take a picture of the image and add it into the readme  -->
<!-- ![image title](path or link to image) -->
![wire frame](assets/images/rail2.jpg)



# technology used
<!-- make a list of technology used -->
<!-- what you used for this web app, like html css -->

<!-- 
1. First ordered list item
2. Another item
⋅⋅* Unordered sub-list. 
1. Actual numbers don't matter, just that it's a number
⋅⋅1. Ordered sub-list
4. And another item. 
-->
- HTML
- css
- Bootstrap
- jquery
- javascript
- firebase



# code snippets
<!-- put snippets of code inside ``` ``` so it will look like code -->
<!-- if you want to put blockquotes use a > -->

The first block of the code defines what happens every time that submit button is pushed. It will first check to see if all the inputs are filled in by the user and if so it reads the data and pushes them to the firebase database to be used later on.

upon each push to the database a new child is added to the parent folder of database and ,hence, the second block of the following code gets examined.

```
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

    if (!isEmpty) {
        // Pushing the variables in the firebase database
        dataRef.ref().push({    
        name: name,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    });
    
    } else {
        console.log("some of the feilds are empty");
        isEmpty = true;
    }
});


dataRef.ref().on("child_added", function(childSnapshot) {
    nextTrainUpdate (childSnapshot.val().firstTrain , childSnapshot.val().frequency);    
    var newRow = $("<tr class='text-center'>");
    newRow.html(  "<td>" + childSnapshot.val().name           + "</td>"   +
                    "<td>" + childSnapshot.val().destination    + "</td>"   +
                    "<td>" + childSnapshot.val().frequency      + "</td>"   +
                    "<td>" + moment(nextArival).format("hh:mm A") + "</td>"   +
                    "<td>" + moment(minAway).format("mm")  + "</td>"
                );   
    $("#data-row").append(newRow);

    // clearing the form feilds after appending data to the DOM
    $( '#train-form' ).each(function(){
        this.reset();
    });

  // Handle the errors
}, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
});


```


# Learning points
<!-- Learning points where you would write what you thought was helpful -->
- html
- css
- Bootstrap
- event listening functions
- on-click events
- jquery
- javascript
- DOM manipulation
- firebase database




# Author 
<!-- make a link to the deployed site and have your name as the link -->
Nasibeh Nourbakhshnia
(www.linkedin.com/in/nasibehnourbakhshnia)

# License