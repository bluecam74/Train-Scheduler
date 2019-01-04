$(document).ready(function () {

    function readFromDatabase() {
        var database = firebase.database();
        database.ref().on("child_added", function (snapshot) {

            var trainName1 = snapshot.val().name;
            var destination1 = snapshot.val().destination;
            var firstTrain1 = snapshot.val().time;
            var freq1 = snapshot.val().freq;

            var firstTrain1Converted = moment(firstTrain1, "HH:mm").subtract(1, "years");

            var diffTime = moment().diff(moment(firstTrain1Converted), "minutes");

            var tRemainder = diffTime % freq1;

            var tMinutesTillTrain = freq1 - tRemainder;

            var nextTrain = moment().add(tMinutesTillTrain, "minutes");

            var newRow = $("<tr>").append(
                $("<th>").text(trainName1),
                $("<td>").text(destination1),
                $("<td>").text(freq1),
                $("<td>").text(moment(nextTrain).format("hh:mm")),
                $("<td>").text(tMinutesTillTrain),
            );

            $("#trainTable > tbody").append(newRow);
        });

    }

    $('#submit').on("click", function (e) {

        e.preventDefault();

        var trainName = $('#trainName').val().trim();
        var destination = $('#destination').val();
        var firstTrain = $('#firstTrain').val();
        var frequency = $('#frequency').val();
        frequency = Number(frequency);

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
                validateTime();
                validateFreq();

                if (validTime && validFreq) {
                    writeToDatabase();
                }
                else {
                    return;
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

    readFromDatabase();
});