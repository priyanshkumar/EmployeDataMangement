$(document).ready(function() {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAtoD4dWM9Esoh0Yvsoa-3TaDj04K0JNtY",
    authDomain: "employeedatamanagement-e1ada.firebaseapp.com",
    databaseURL: "https://employeedatamanagement-e1ada.firebaseio.com",
    projectId: "employeedatamanagement-e1ada",
    storageBucket: "employeedatamanagement-e1ada.appspot.com",
    messagingSenderId: "895571185977"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  var name = "";
  var role = "";
  var startDate = "";
  var monthlyRate = 0;

  $("#btn-submit").on("click", function() {
    name = $("#employee-name")
      .val()
      .trim();
    role = $("#employee-role")
      .val()
      .trim();
    startDate = $("#start-date")
      .val()
      .trim();
    monthlyRate = $("#monthly-rate")
      .val()
      .trim();

    database.ref().push({
      name: name,
      role: role,
      startDate: startDate,
      monthlyRate: monthlyRate
    });
  });

  database.ref().on("child_added", function(response) {
    var res = response.val();

    var firstdate = moment(res.startDate, "YYYY/MM/DD");
    var months = Math.floor(
      moment.duration(moment().diff(firstdate)).asMonths()
    );

    var tr = $("<tr>");

    var tdName = $("<td>");
    tdName.text(res.name);

    var tdRole = $("<td>");
    tdRole.text(res.role);

    var tdStartDate = $("<td>");
    tdStartDate.text(res.startDate);

    var tdMonthsWork = $("<td>");
    tdMonthsWork.text(months);

    var tdMonthlyRate = $("<td>");
    tdMonthlyRate.text(res.monthlyRate);

    var tdBilled = $("<td>");
    tdBilled.text(months * res.monthlyRate);

    tr.append(
      tdName,
      tdRole,
      tdStartDate,
      tdMonthsWork,
      tdMonthlyRate,
      tdBilled
    );
    $("#employee-details").append(tr);
  });
});
