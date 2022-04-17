; (function (root, factory) {
  root.FORMS_EDITOR = factory()
})(this, function () {

  var FORMS_EDITOR = {};

  function addEntryToListInForm(formId, entry, questionName) {
    var form = FormApp.openById(formId);
    var items = form.getItems();
    for (var i in items) {
      if (items[i].getTitle() == questionName) {
        var listItem = items[i].asListItem();
        var choices = listItem.getChoices();
        choices.push(listItem.createChoice(entry));
        listItem.setChoices(choices)
        break;
      }
    }
  }

  function updateListInForm(formId, listOfEntries, questionName) {
    var form = FormApp.openById(formId);
    var items = form.getItems();
    for (var i in items) {
      if (items[i].getTitle() == questionName) {
        var listItem = items[i].asListItem();
        var choices = listItem.getChoices();
        listOfEntries.forEach(function (entry) {
          if (choices.indexOf(entry) == -1) {
            choices.push(listItem.createChoice(entry));
          }
        })
        listItem.setChoices(choices)
        break;
      }
    }
  }

  function batchUploadToForm(formId, sheetName) {
    const SSID = "18s0V2tOym5yQdOCbBbZGgmzO4KC7-o6QhmsuVZk7y8o";
    var form = FormApp.openById(formId);
    var batch = getBatch(SSID, sheetName);
    var questions = getQuestionItemsOnly(form);
    var formResponse = form.createResponse();
    batch.forEach(collectedResponse => {
      collectedResponse.forEach((question, j) => {
        var method = question.method;
        var methodClean = method.replace(")", "").replace("(", "");
        var value = question.value;
        var q = questions[j];
        var qt = q[methodClean]();
        //var qt = eval("q." + method);
        var qr = qt.createResponse(value);
        formResponse.withItemResponse(qr);
      })
    })
    formResponse.submit();
  }

  function getQuestionItemsOnly(form) {
    return form.getItems().filter(questionItem => {
      return questionItem.getType() != FormApp.ItemType.SECTION_HEADER && questionItem.getType() != FormApp.ItemType.SECTION_HEADER;
    })
  }

  function getBatch(ssid, sheetName) {
    var ss = SpreadsheetApp.openById(ssid);
    var sheet = ss.getSheetByName(sheetName);
    var dataRangeValues = sheet.getDataRange().getValues();
    var inputTypes = dataRangeValues.shift();
    var header = dataRangeValues.shift();
    var batch = [];
    dataRangeValues.forEach(row => {
      var rowArr = [];
      header.forEach((col, j) => {
        if (col == "") {
          return;
        }
        var colObj = {};
        colObj.value = row[j];
        colObj.method = inputTypes[j];
        rowArr.push(colObj)
      })
      batch.push(rowArr);
    })
    return batch;
  }


  FORMS_EDITOR.addEntryToListInForm = addEntryToListInForm;
  FORMS_EDITOR.updateListInForm = updateListInForm;
  FORMS_EDITOR.batchUploadToForm = batchUploadToForm;

  return FORMS_EDITOR
})

function uploadFromCompanies() {
  FORMS_EDITOR.batchUploadToForm("1LGkWnz1RU5t8gK0eh9UW8x2y_R4MVQjXP1_Kxclss4A", "Companies Batch Upload")
}

function uploadFromDevs() {
  FORMS_EDITOR.batchUploadToForm("1jvyBdkxbQ27g6KKT9F2OOIxciECSkL8miDROjvlqH8w", "Developers Batch Upload")
}
