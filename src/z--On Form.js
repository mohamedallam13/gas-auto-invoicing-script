function onFormSubmit(e) {
  console.log(e)
  const DEV_FORM_ID = "1jvyBdkxbQ27g6KKT9F2OOIxciECSkL8miDROjvlqH8w";
  var qNameInCompanyForm = "Company Name";
  var qNameInDevForm = "Hiring Company";
  var latestEntry = e.namedValues[qNameInCompanyForm][0];
  FORMS_EDITOR.addEntryToListInForm(DEV_FORM_ID, latestEntry, qNameInDevForm)
}

function sayGoodMorning() {
  const SSID = "18s0V2tOym5yQdOCbBbZGgmzO4KC7-o6QhmsuVZk7y8o";
  var ss = SpreadsheetApp.openById(SSID);
  var user = Session.getActiveUser().getEmail();
  var usersTable = ss.getRange("usersTable").getValues();
  var userObj = {};
  usersTable.forEach(row => {
    if (row[0] == user) {
      userObj.email = row[0];
      userObj.firstName = row[1];
      userObj.lastName = row[2];
    }
  })
  var now = new Date();
  var hour = now.getHours();
  var greetingByTimeOfDay = "Good " + (hour < 12 && "Morning" || hour < 18 && "Afternoon" || "Evening")
  var message = greetingByTimeOfDay + (userObj.firstName && (", " + userObj.firstName + "!") || "!");
  var formatedDate = Utilities.formatDate(now, "Europe/Berlin", "EEE, MMM d, ''yy h:mm a");
  ss.getRange("goodMorningRange").setValue(message);
  ss.getRange("startDateTimeRange").setValue(formatedDate);
}

function permission() {
  SpreadsheetApp.getActive();
}

