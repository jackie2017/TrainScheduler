$(document).ready(function()

{
				var config = {
    			apiKey: "AIzaSyDsIyfAghfH8B4rYtv-BMb0WwB_JrklxC4",
    			authDomain: "trainscheduler-3f474.firebaseapp.com",
    			databaseURL: "https://trainscheduler-3f474.firebaseio.com",
    			storageBucket: "trainscheduler-3f474.appspot.com",
    			messagingSenderId: "648123629560"
  				};
  				firebase.initializeApp(config);
  				// getting fb db started and the time displayed//
  				var database = firebase.database();

  				  var userTime = moment().format('MMM Do YYY, h:mm:ss a');
            var date = '2010-06-30';
            var result = moment(date).endof('week');
            console.log(result);

  				$("#userTime").append(userTime)

  				//values to be used//
  				var trainName = "";
  				var destiNation = "";
  				var freQuency = 0;
  				var firsttrainTime = 0;
  				var initialTime = [];

  				//to create button//
  				$("add-another").on("click", function(){

  					//do not need to refresh page//
  					event.preventDefault();

  					//setup values for firebase//
  					trainName = $("#nm-input").val().trim();
  					destiNation = $("#dest-input").val().trim();
  					firsttrainTime = moment($("#firtratim-input").val().trim(), "HH:mm").format("X");
  					freQuency = $("#freq-input").val().trim();


  					//database push//
  					database.ref("/transits").push({
  						trainName: trainName,
  						Desination: destiNation,
  						firsttrainTime: firsttrainTime,
  						freQuency: freQuency,

  						dateAdded:
  		firebase.database.ServerValue.TIMESTAMP,
  						});

  					//emptying form//
  					$("#nm-input").val(" ");
  					$("#dest-input").val(" ");
  					$("#firtratim-input").val(" ");
  					$("#freq-input").val(" ");

  				});


          database.ref("/trains").on("child_added",
      function(childsnapshot) {
  //start//
          var tName = childsnapshot.val().trainName;
          var tDestination = childsnapshot.val()Desination;
          var tFreQuency = childsnapshot.val()freQuency;
          var tFirstTrain =
      childsnapshot.val().firsttrainTime;

      {
        //current time calculation and substract the first train//
          var differTimes = 
      moment().diff(moment.unix(tFirstTrain), "minutes");
          var tReminder = 
      moment().diff(moment.unix(tFirstTrain), "minutes") %
      tFreQuency;
          var tMinutes = tFreQuency - tReminder

      //arrival time to minutes to train to current time//
          var tArrival = moment().add(tMinutes
      "m").format("hh:mm A");

            if (tMinutes <= 5 ) {
            $("#5min").append(
                "<tr>" +
                "<td>" + tName + "</td>" +
                "<td>" + tDestination + "</td>" +
                "<td>" + tFreQuency + "</td>" +
                "<td>" + tArrival + "</td>" +
                "<td><font color='blue'>" + tMinutes +
        "</td></font>" + "</tr>");
              return;      
          } 


        //DOM//
          $("#tTable").append(
              "<tr>" +
              "<td>" + tName + "</td>" +
              "<td>" + tDestination + "</td>" +
              "<td>" + tFreQuency + "</td>" +
              "<td>" + tArrival + "</td>" +
              "<td>" + tMinutes + "</td>" + "</tr>"
          );

        }, function(errorObject) {
            console.log("Errors handled: " + errorObject.code);

        });

    });








}