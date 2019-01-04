$(document).ready(function () {
    // var trainRef = firebase.database().ref("trains/");
    // trainRef.set(songArray);

    var minutesLeft;
    var milTime;
    readFromDatabase();

    function readFromDatabase() {
        var database = firebase.database();
        database.ref().on("child_added", function(snapshot) {
            console.log(snapshot.val());
          
            // Store everything into a variable.
            var trainName = snapshot.val().name;
            var destination = snapshot.val().destination;
            var firstTrain = snapshot.val().time;
            var freq = snapshot.val().freq;

            var newRow = $("<tr>").append(
                $("<th>").text(trainName),
                $("<td>").text(destination),
                //$("<td>").text(firstTrain),
                $("<td>").text(freq),
              );

              $("#trainTable > tbody").append(newRow);
        });
          
    }

    // var randomDate = "02/23/1999";
    // var randomFormat = "MM/DD/YYYY";
    // var convertedDate = moment(randomDate, randomFormat);

    // // Using scripts from moment.js write code below to complete each of the following.
    // // Console.log to confirm the code changes you made worked.

    // // 1 ...to convert the randomDate into three other date formats
    // console.log(convertedDate.format("MM/DD/YY"));
    // console.log(convertedDate.format("MMM Do, YYYY hh:mm:ss"));
    // console.log(convertedDate.format("X"));
    // console.log("----------------------------------------");

    // console.log(convertedDate.toNow())
    // console.log(convertedDate.diff(moment(), "years"), "years");
    // console.log(convertedDate.diff(moment(), "months"), "months");
    // console.log(convertedDate.diff(moment(), "days"), "days");
    // console.log(convertedDate.diff(moment(), "minutes"), "min");
    // console.log("----------------------------------------");

    // // 3 ...to determine the number of days between the randomDate and 02/14/2001
    // var newDate = moment("02/14/2001", randomFormat);
    // console.log(convertedDate.diff(newDate, "days"));

    // // 4 ...to convert the randomDate to unix time (be sure to look up what unix time even is!!!)
    // console.log(convertedDate.format("X"));
    // console.log("----------------------------------------");

    // // 5 ...to determine what day of the week and what week of the year this randomDate falls on.
    // console.log(convertedDate.format("DDD"));
    // console.log(convertedDate.format("dddd"));
    // console.log(moment(convertedDate).fromNow());

    console.log(moment().format("hh:mm"));

    var timeOfFirst = "13:15";
    var convertedTime = moment(timeOfFirst, "HH:mm");
    console.log(convertedTime.format("HH:mm"));




    $('#submit').on("click", function (e) {

        e.preventDefault();

        var trainName = $('#trainName').val().trim();
        var destination = $('#destination').val();
        var firstTrain = $('#firstTrain').val();

        var frequency = $('#frequency').val();
        frequency = Number(frequency);

        //console.log (trainName + destination + firstTrain + frequency);
        $('#errorHeader1').empty();
        $('#errorHeader2').empty();
        var validTime = false;
        var validFreq = false;
        validateForm();


        function validateForm() {
            if (trainName === '' || destination === '' || firstTrain === '' || frequency === 0) {
                $('#errorHeader1').text("All fields are required.");
            }
            else {
                console.log("all fields filled out");
                validateTime();
                validateFreq();

                if (validTime && validFreq) {
                    console.log("All fields valid.")
                    writeToDatabase()
                }
                else {
                    console.log("Form invalid.")
                }
            }

        }
        function validateFreq() {

            if (isNaN(frequency)) {
                $('#errorHeader1').text("You must enter the frequency as a valid number.");
                validFreq = false;

            }
            else {
                validFreq = true;
            }

        };

        function validateTime() {
            var isTime = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(firstTrain);
            if (isTime) {
                validTime = true;
            }
            else {
                $('#errorHeader2').text("You must enter the time of first train in valid format (HH:mm).");
                validTime = false;
            }
        };

        function writeToDatabase() {
            var trainRef = firebase.database().ref().push("Trains/");
            trainRef.set({
                name: trainName,
                destination: destination,
                time: firstTrain,
                freq: frequency
            });
        }

    });









});