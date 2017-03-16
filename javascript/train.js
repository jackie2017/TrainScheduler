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

  				$("#userTime").append(userTime)

  				//values to be used//
  				var trainName = "";
  				var destiNation = "";
  				var freQuency = 0;
  				var firsttrainTime = 0;
  				var initialTime = [];

  				//to create button//
  				$("another-train").on("click", function(){

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
  					$("#nm-input").val("");
  					$("#dest-input").val("");
  					$("#firtratim-input").val("");
  					$("#freq-input").val("");

  				}



}