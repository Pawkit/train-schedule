// initialize firebase
  var config = {
    apiKey: "AIzaSyAG5_N0J-ba3DPXqj2cO7RPkOEDOLdhd1k",
    authDomain: "unique-asdf.firebaseapp.com",
    databaseURL: "https://unique-asdf.firebaseio.com",
    projectId: "unique-asdf",
    storageBucket: "unique-asdf.appspot.com",
    messagingSenderId: "735417965660"
  };
  firebase.initializeApp(config);

var database = firebase.database();

// click function to add train information when submit is clicked
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

// user input
  var trainName = $("#traininput").val().trim();
  var trainD = $("#destinput").val().trim();
  var trainF = moment($("#firstTrainTime").val().trim()).format('HH:mm');
  var trainMin = $("#freqinput").val().trim();

// creates variable newTrain to hold data
  var newTrain = {
    name: trainName,
    dest: trainD,
    first: trainF,
    min: trainMin
  };

// uploads into database
  database.ref().push(newTrain);                

// debugger station
  console.log(newTrain.name);
  console.log(newTrain.dest);
  console.log(newTrain.first);                                                  
  console.log(newTrain.min);

// clears text boxes after submit
  $("#traininput").val("");
  $("#destinput").val("");                                                        
  $("#firstTrainTime").val("");
  $("#freqinput").val("");
});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

// store everything into variables
  var trainName = childSnapshot.val().name;
  var trainD = childSnapshot.val().dest;
  var trainF = childSnapshot.val().first;
  var trainMin = childSnapshot.val().min;

// train info
  console.log(trainName);
  console.log(trainD);                                                                      
  console.log(trainF);
  console.log(trainMin);

  var firstTime = "03:30";

// calculations for train arrival information
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log("First TIme" + firstTimeConverted);


    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    
    var tRemainder = diffTime % trainMin;
    console.log("TRemainder" + tRemainder);

    var tMinutesTillTrain = trainMin - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));


// Add each train's data into the table

  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainD + "</td><td>" + trainMin + "</td><td>" + tMinutesTillTrain + "</td><td>" + moment(nextTrain).format("HH:mm") + "</td></tr>");
});