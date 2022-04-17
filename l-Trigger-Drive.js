
// ; (function (root, factory) {
//   root.REMPTZ_MANAGER = factory()
// })(this, function () {

//   const REMPTZ_MANAGER = {}

//   const AUTO_INVOICE_TRIGGER_LABEL = "autoInvoiceTriggerId";
//   const SSID = "18s0V2tOym5yQdOCbBbZGgmzO4KC7-o6QhmsuVZk7y8o";
//   const SETUP_SHEETNAME = "Setup"

//   var nowObj

//   function setTrigger() {
//     initiateProperties();
//     var triggerInfo = getTriggerInfo();
//     deleteOldAutoInvoiceTrigger();
//     createAutoInvoiceTrigger(triggerInfo);
//   }

//   function initiateProperties() {
//     nowObj = new DateTimeObj();
//     scriptProperties = PropertiesService.getScriptProperties();
//   }

//   function DateTimeObj() {
//     var nowDate = new Date();
//     this.timestamp = Utilities.formatDate(nowDate, "Europe/Berlin", "dd.MM.YYYY");
//     this.currentMonth = nowDate.getMonth();
//     this.currentYear = nowDate.getFullYear();
//   }

//   function deleteOldAutoInvoiceTrigger() {
//     var triggerId = scriptProperties.getProperty(AUTO_INVOICE_TRIGGER_LABEL);
//     if (!triggerId) {
//       return;
//     }
//     var triggers = ScriptApp.getProjectTriggers()
//     for (i in triggers) {
//       if ((triggers[i].getUniqueId()) == triggerId) {
//         ScriptApp.deleteTrigger(triggers[i])
//         scriptProperties.deleteProperty(key)
//       }
//     }
//     //    console.log("Opertaion Complete")
//   }

//   function getTriggerInfo() {
//     var ss = SpreadsheetApp.openById(SSID);
//     var autoInvoiceDay = ss.getRange("autoInvoiceDay").getValue();
//     var autoInvoiceMonth = ss.getRange("autoInvoiceMonth").getValue();

//   }



//   function createAutoInvoiceTrigger(triggerInfo) {
//     var day = triggerInfo.day;
//     var triggerObj = ScriptApp.newTrigger(command).timeBased().onMonthDay(day).create();
//     var id = triggerObj.getUniqueId();
//     scriptProperties.setProperty(AUTO_INVOICE_TRIGGER_LABEL, id);
//   }


//   function init() {
//     getRunningInfo();
//   }

//   function getRunningInfo() {
//     getDate();
//     getCompanyInfo();
//   }

//   REMPTZ_MANAGER.setTrigger = setTrigger;
//   REMPTZ_MANAGER.init = init;

//   return REMPTZ_MANAGER
// })