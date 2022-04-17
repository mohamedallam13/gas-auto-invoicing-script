
; (function (root, factory) {
  root.REMPTZ_MANAGER = factory()
})(this, function () {

  const REMPTZ_MANAGER = {}

  const SSID = "18s0V2tOym5yQdOCbBbZGgmzO4KC7-o6QhmsuVZk7y8o";
  const SETUP_SHEETNAME = "Setup"

  var nowObj
  var triggerObj;
  var ss;

  function init(invoicingDateObj) {
    getRunningInfo();
    invoicingDateObj = invoicingDateObj || autoInvoice();
    if (!invoicingDateObj) {
      return;
    }
    REMPTZ_AUTOINVOICING.createInvoices(invoicingDateObj);
  }

  function getRunningInfo() {
    getDate();
    getSS();
    getTriggerInfo();
  }

  function autoInvoice() {
    var timeToTriggerCheck = checkTriggerOnDate();
    if (!timeToTriggerCheck) {
      return;
    }
    var invoicingDateObj = getInvoicingDateObjBasedOnPreference();
    return invoicingDateObj;
  }

  function getSS() {
    ss = SpreadsheetApp.openById(SSID);
  }

  function getDate() {
    nowObj = new Utils.DateTimeObj();
  }

  function getTriggerInfo() {
    triggerObj = new TriggerInfoObj();

  }

  function TriggerInfoObj() {
    this.autoInvoiceDay = ss.getRange("autoInvoiceDay").getValue();
    this.autoInvoiceMonth = ss.getRange("autoInvoiceMonth").getValue();
    this.autoInvoicingStatus = ss.getRange("autoInvoicingStatus").getValue();
  }

  function checkTriggerOnDate() {
    if (triggerObj.autoInvoicingStatus == "OFF") {
      return;
    }
    if (triggerObj.autoInvoiceMonth == "") {
      console.log("No Invoicing Month Preferences Provided");
      return;
    }
    if (triggerObj.autoInvoiceDay == "") {
      console.log("No Invoicing Day Preferences Provided");
      return;
    }
    if (triggerObj.autoInvoiceDay == nowObj.day) {
      return true;
    }
  }

  function getInvoicingDateObjBasedOnPreference() {
    var invoicingMonthString = triggerObj.autoInvoiceMonth.replace("+", "-").replace("Same Month", nowObj.month);
    var invoicingMonth = Utils.addbits(invoicingMonthString);
    invoicingMonth = invoicingMonth < 0 ? 12 + invoicingMonth : invoicingMonth;
    var invoicingYear = invoicingMonth < 0 ? fullYear - 1 : nowObj.fullYear;
    var dateString = invoicingYear + "-" + _.padStart((parseInt(invoicingMonth) + 1).toString(), 2, "0") + "-" + "01";
    var invoicingDateObj = new Utils.DateTimeObj("dd.MM.YYYY", dateString);
    return invoicingDateObj;
  }

  REMPTZ_MANAGER.init = init;

  return REMPTZ_MANAGER
})

function createInvoicesForSelectedMonth() {
  // Display a modeless dialog box with custom HtmlService content.

  SHEETS_UI.createSimpleListPopup("title")


  // var htmlOutput = HtmlService
  //     .createHtmlOutput('<p>A change of speed, a change of style...</p>')
  //     .setWidth(250)
  //     .setHeight(300);
  // SpreadsheetApp.getUi().showModelessDialog(htmlOutput, 'My add-on');
}



function createTriggerAutoInvoices() {
  REMPTZ_MANAGER.init();
}

// function test() {
//   var string = "Same Month"
//   var replaced = string.replace("+", "-").replace("Same Month", 0);
//   var parsed = Utils.addbits(replaced);
//   console.log(parsed);
// }