; (function (root, factory) {
  root.SHEETS_UI = factory()
})(this, function () {

  var SHEETS_UI = {};

  function popoutErrorMessges(title, message) {
    var ui = SpreadsheetApp.getUi(); // Same variations.
    var result = ui.alert(
      title,
      message,
      ui.ButtonSet.OK);
    return result;
  }

  function yesNoMessage(title, message) {
    var ui = SpreadsheetApp.getUi(); // Same variations.
    var result = ui.alert(
      title,
      message,
      ui.ButtonSet.YES_NO);
    if (result == ui.Button.YES) {
      return true;
    }
    return false;
  }

  function popupText(message) {
    var input = Browser.inputBox(message);
    return input;
  }

  function createSimpleListPopup(title, width, height, list) {
    var html = "<!DOCTYPE html>" +
      "<html>" +
      "  <head>" +
      "    <base target=\"_top\">" +
      "  </head>" +
      "  <body>" +
      "    <select id=\"mySelect\" onchange=\"selectChange(this)\">" +
      "    </select>" +
      "    <script>" +
      "      function selectChange(select) {" +
      "        google.script.run.changeSheet(select.value);" +
      "      }" +
      "      function sheetNames(names) {" +
      "        var select = document.getElementById(\"mySelect\");" +
      "        for( var i=0; i<names.length; i++ ) {" +
      "          var option = document.createElement(\"option\");" +
      "          option.text = names[i];" +
      "          select.add(option);" +
      "        }" +
      "      }" +
      "      (function () { google.script.run.withSuccessHandler(sheetNames).getSheets(); }());" +
      "    </script>" +
      "  </body>" +
      "</html>";

    var htmlOutput = HtmlService
      .createHtmlOutput(html)
    // .setWidth(width)
    // .setHeight(height);
    SpreadsheetApp.getUi().showModelessDialog(htmlOutput, title);
  }


  SHEETS_UI.popoutErrorMessges = popoutErrorMessges;
  SHEETS_UI.yesNoMessage = yesNoMessage;
  SHEETS_UI.popupText = popupText;
  SHEETS_UI.createSimpleListPopup = createSimpleListPopup;

  return SHEETS_UI
})


function getSheets() {
  try {
    var sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();
    var names = [];
    for (var i = 0; i < sheets.length; i++) {
      names.push(sheets[i].getName());
    }
    return names;
  }
  catch (err) {
    Logger.log(err);
  }
}

function changeSheet(name) {
  try {
    var spread = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = spread.getSheetByName(name);
    SpreadsheetApp.getActiveSpreadsheet().setActiveSheet(sheet);
  }
  catch (err) {
    Logger.log(err);
  }
}
