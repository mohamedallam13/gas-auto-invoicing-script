function onOpen(){
  
  var ui = SpreadsheetApp.getUi();
  var mainMenu = ui.createMenu("Actions");
  
   var importMenu = ui.createMenu("Batch Upload")
   .addItem("Import Companies", "uploadFromCompanies")
   .addItem("Import Developers", "uploadFromDevs")
  
// //  var manageStandardEmails = ui.createMenu("Standard Emails")
// //  .addItem("Load Template", "loadTemplate")
// //  .addItem("Save Template", "saveTemplate")
// //  
// //  var updateTemplates = ui.createMenu("Update Templates")
// //  .addItem("Update All Templates", "updateAllTemplates")
  
  
  mainMenu.addSubMenu(importMenu)
  .addSeparator()
  .addItem("Create Invoices", "createInvoicesTesting")
  .addSeparator()
  .addItem("Send Out Emails", "sendOutEmailsTesting")
//  .addSubMenu(manageStandardEmails)
//  .addSeparator()
//  .addSubMenu(updateTemplates)
//  .addSeparator()
//  .addItem("Save All to DB", "saveAlltoDBFile")
  .addToUi()
  
}