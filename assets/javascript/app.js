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

// onclick function to add train information when submit is clicked

$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  var trainName = $("#traininput").val().trim();                                          // user input
  var trainD = $("#destinput").val().trim();
  var trainF = moment($("#firstTrainTime").val().trim()).format('HH:mm');
  var trainMin = $("#freqinput").val().trim();

  
  var newTrain = {                                                                      // creates variable called newTrain which is an object to hold data
    name: trainName,
    dest: trainD,
    first: trainF,
    min: trainMin
  };
 




  database.ref().push(newTrain);                                                    // uploads into database

 
  console.log(newTrain.name);
  console.log(newTrain.dest);
  console.log(newTrain.first);                                                  // holds console information for verification
  console.log(newTrain.min);

  

  $("#traininput").val("");
  $("#destinput").val("");                                                        // clears text boxes from userinput after they submit information
  $("#firstTrainTime").val("");
  $("#freqinput").val("");
});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

                                                                                            // Store everything into a firefox variable
  var trainName = childSnapshot.val().name;
  var trainD = childSnapshot.val().dest;
  var trainF = childSnapshot.val().first;
  var trainMin = childSnapshot.val().min;


  console.log(trainName);
  console.log(trainD);                                                                      // train info
  console.log(trainF);
  console.log(trainMin);

  var firstTime = "03:30";

                                                                                          // calculations to give train arrival information
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

