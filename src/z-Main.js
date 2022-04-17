; (function (root, factory) {
  root.REMPTZ_AUTOINVOICING = factory()
})(this, function () {

  const REMPTZ_AUTOINVOICING = {}

  const SSID = "18s0V2tOym5yQdOCbBbZGgmzO4KC7-o6QhmsuVZk7y8o";

  const UID = "UID";

  const SHEETS_PROP_OBJ = {
    companies: {
      sheetName: "Companies",
      indexOn: "company_name",
      parseObj: {
        headerRow: 1,
        skipRows: 1
      }
    },
    developers: {
      sheetName: "Developers",
      indexOn: "dev_email",
      parseObj: {
        headerRow: 1,
        skipRows: 1
      }
    },
    setup: {
      sheetName: "Setup",
      parseObj: {
        headerRow: 1,
        skipRows: 1
      }
    },
    allCompanyInvoicesURLs: {
      sheetName: "All Company Invoices URLs",
      indexOn: UID,
      parseObj: {
        headerRow: 6
      }
    },
    allCompanyInvoicesIds: {
      sheetName: "All Company Invoices Ids",
      indexOn: UID,
      parseObj: {
        headerRow: 6
      }
    },
    allDevInvoicesURLs: {
      sheetName: "All Dev Invoices URLs",
      indexOn: UID,
      parseObj: {
        headerRow: 6
      }
    },
    allDevInvoicesIds: {
      sheetName: "All Dev Invoices Ids",
      indexOn: UID,
      parseObj: {
        headerRow: 6
      }
    },
    companiesEmailsCheck: {
      sheetName: "Companies Emails Check",
      indexOn: UID,
      parseObj: {
        headerRow: 6
      }
    },
    devEmailsCheck: {
      sheetName: "Developers Emails Check",
      indexOn: UID,
      parseObj: {
        headerRow: 6
      }
    }
  }

  //const INV_NUM_FILE_ID = "";

  const COMPANY_INV_FOLDER_ID = "1ezd-RM_OBdWhhLYQrB0UJMKjngGJvCNX";
  const DEV_INV_FOLDER_ID = "1mc1enkd5cgU4CgG9Kyi1wCrP19USYJ78";

  var sheetsObj = {}
  var companyInfoObj;
  var contentAllLangObj;

  var toCompanyInvoiceArr
  var toDeveloperInvoiceArr

  var companiesInvoiceIdsObjForThisPeriod
  var companiesEmailsCheckObjForThisPeriod
  var devInvoiceIdsObjForThisPeriod
  var devEmailsCheckObjForThisPeriod

  var toCompanyEmailArr = [];
  var toDevEmailArr = [];

  var writeBackArrayCompanies
  var writeBackArrayDev

  var ss
  var invoicingDateObj;
  var nowObj;
  var months;
  var period;
  var euCountries;

  function createInvoices(invDateObj) {
    invoicingDateObj = invDateObj || createNowObj();
    getReferences();
    getAllSheets();
    createInvoicesArrays();
    processCompanyInvoices();
    processDevInvoices();
  }

  function sendOutInvoicesEmails(invDateObj) {
    invoicingDateObj = invDateObj || createNowObj();
    getReferences();
    getAllSheets();
    combineData();
    sendOutEmailsToCompanies();
    sendOutEmailsToDev();
  }

  function combineData() {
    combineCompanyData();
    combineDevData();
  }

  function combineCompanyData() {
    var companinesValues = sheetsObj.companies.objectifiedValues.filter(row => row.company_timestamp != "");;
    var companiesInvoiceFileIdsIndexed = sheetsObj.allCompanyInvoicesIds.indexedValues;
    var companiesEmailsCheckIndexed = sheetsObj.companiesEmailsCheck.indexedValues;
    addFullObjToEmailArr(companinesValues, companiesInvoiceFileIdsIndexed, companiesEmailsCheckIndexed, "company_name", toCompanyEmailArr);
  }

  function combineDevData() {
    var devValues = sheetsObj.developers.objectifiedValues.filter(row => row.dev_timestamp != "");
    var devInvoiceFileIdsIndexed = sheetsObj.allDevInvoicesIds.indexedValues;
    var devEmailsCheckIndexed = sheetsObj.devEmailsCheck.indexedValues;
    addFullObjToEmailArr(devValues, devInvoiceFileIdsIndexed, devEmailsCheckIndexed, "dev_email", toDevEmailArr);
  }

  function addFullObjToEmailArr(objectifiedvalues, fileIdIndexedValues, emailSentIndexedValues, uidHeader, toEmailArr) {
    objectifiedvalues.forEach(row => {
      var uid = row[uidHeader];
      var fileIdIndexObj = fileIdIndexedValues[uid];
      var emailRecordsIndexObj = emailSentIndexedValues[uid];
      var fileId = fileIdIndexObj[period];
      if (!fileIdIndexObj[period]) {
        return;
      }
      if (emailRecordsIndexObj[period] && emailRecordsIndexObj[period] != "") {
        return;
      }
      var invoiceFileObj = DriveApp.getFileById(fileId);
      row.invoiceFileObj = invoiceFileObj;
      row.pdfFile = invoiceFileObj.getAs(MimeType.PDF);
      var language = row.language || "EN";
      var contentObj = contentAllLangObj[language];
      var fullObj = Object.assign({}, row, companyInfoObj, contentObj)
      toEmailArr.push(fullObj);
    })
  }

  function sendOutEmailsToCompanies() {
    var sheetObj = sheetsObj.companiesEmailsCheck;
    var companiesEmailsCheckIndexed = sheetObj.indexedValues;
    var uidHeader = "company_name";
    toCompanyEmailArr.forEach(companyObj => {
      companyObj.email = companyObj.company_contactperson_email;
      companyObj.subject = companyObj.email_subject_company
      companyObj.body = companyObj.email_body_text_company
      var uid = companyObj[uidHeader];
      var response = EMAIL.sendOutEmail(companyObj);
      if (!response) {
        companiesEmailsCheckIndexed[uid][period] = nowObj.timestamp;
      } else {
        companiesEmailsCheckIndexed[uid][period] = response;
      }
    })
    writeBackToEmailChecks(companiesEmailsCheckIndexed, sheetObj);
  }

  function sendOutEmailsToDev() {
    var sheetObj = sheetsObj.devEmailsCheck;
    var devEmailsCheckIndexed = sheetObj.indexedValues;
    var uidHeader = "dev_email";
    toDevEmailArr.forEach(devObj => {
      devObj.email = devObj.dev_email;
      devObj.subject = devObj.email_subject_dev
      devObj.body = devObj.email_body_text_dev
      var uid = devObj[uidHeader];
      var response = EMAIL.sendOutEmail(devObj);
      if (!response) {
        devEmailsCheckIndexed[uid][period] = nowObj.timestamp;
      } else {
        devEmailsCheckIndexed[uid][period] = response;
      }
    })
    writeBackToEmailChecks(devEmailsCheckIndexed, sheetObj);
  }

  function writeBackToEmailChecks(emailsCheckedIndexed, sheetObj) {
    var header = sheetObj.header.slice(0);
    if (!header.includes(period)) {
      header.push(period);
    }else{
      //Do something if the emailing period already exists;
    }
    var emailChecksObjArr = [];
    var uids = Object.keys(emailsCheckedIndexed);
    uids.forEach(uid => {
      var emailsCheckedObj = emailsCheckedIndexed[uid];
      emailsCheckedObj[uid] = null;
      emailChecksObjArr.push(emailsCheckedObj);
    })
    var writeArr = SHEETS.createWriteArr(emailChecksObjArr, header);
    writeArr.unshift(header);
    SHEETS.writeAdvancedToSheet(writeArr, sheetObj, UID, sheetObj.headerRow);
  }

  /*
    function combineData() {
      companiesInvoiceIdsObjForThisPeriod = sheetsObj.allCompanyInvoicesIds.indexedValues[period];
      var companiesIndexedValues = sheetsObj.companies.indexedValues;
      companiesEmailsCheckObjForThisPeriod = sheetsObj.companiesEmailsCheck.indexedValues[period];
      devInvoiceIdsObjForThisPeriod = sheetsObj.allDevInvoicesIds.indexedValues[period];
      var devIndexedValues = sheetsObj.developers.indexedValues;
      devEmailsCheckObjForThisPeriod = sheetsObj.devEmailsCheck.indexedValues[period];
      combineOnPeriod(companiesInvoiceIdsObjForThisPeriod, companiesIndexedValues, companiesEmailsCheckObjForThisPeriod, toCompanyEmailArr)
      combineOnPeriod(devInvoiceIdsObjForThisPeriod, devIndexedValues, devEmailsCheckObjForThisPeriod, toDevEmailArr)
    }
  
    function combineOnPeriod(invoicesIdsObj, mainIndexedValues, emailsCheckObj, toEmailArr) {
      if (!invoicesIdsObj) {
        return;
      }
      var uids = Object.keys(invoicesIdsObj);
      uids.forEach(uid => {
        if (uid == "Period") {
          return;
        }
        var id = invoicesIdsObj ? invoicesIdsObj[uid] : "";
        if (id == "") {
          return;
        }
        var emailSent = emailsCheckObj ? emailsCheckObj[uid] : "";
        if (emailSent != "") {
          return;
        }
        var invoiceFileObj = DriveApp.getFileById(id);
        var mainValueObj = mainIndexedValues[uid];
        mainValueObj.invoiceFileObj = invoiceFileObj;
        mainValueObj.pdfFile = invoiceFileObj.getAs(MimeType.PDF);
        var language = mainValueObj.language || "EN";
        var conentObj = contentAllLangObj[language];
        var fullObj = Object.assign({}, mainValueObj, companyInfoObj, conentObj)
        toEmailArr.push(fullObj);
      })
    }
  
    */

  function processCompanyInvoices() {
    produceInvoicesPDFs(toCompanyInvoiceArr, "companyInvoiceTemplate", "company_language");
    saveInvoicesToFolders(toCompanyInvoiceArr, COMPANY_INV_FOLDER_ID);
    writeToAllCompanyInvoicesSheets();
    updateCompanySheet();

    // sendOutEmails(toCompanyInvoiceArr);
    // writeToEmailsCheck();

  }

  function processDevInvoices() {
    produceInvoicesPDFs(toDeveloperInvoiceArr, "devInvoiceTemplate");
    saveInvoicesToFolders(toDeveloperInvoiceArr, DEV_INV_FOLDER_ID);
    writeToAllDevInvoicesSheets();
    updateDevsSheet();

    // sendOutEmails(toDeveloperInvoiceArr);
  }

  function getAllSheets() {
    var sheetLabelArr = Object.keys(SHEETS_PROP_OBJ);
    var sheetNamesArr = sheetLabelArr.map(sheetLabel => SHEETS_PROP_OBJ[sheetLabel].sheetName)
    var ssMan = SHEETS.createSheetManager(SSID, sheetNamesArr);
    sheetLabelArr.forEach(sheetLabel => {
      var sheetPropObj = SHEETS_PROP_OBJ[sheetLabel];
      sheetsObj[sheetLabel] = SHEETS.getSheetObj(ssMan, sheetPropObj.sheetName, sheetPropObj.parseObj);
      sheetsObj[sheetLabel].ssid = SSID;
      sheetsObj[sheetLabel].sheetName = sheetPropObj.sheetName;
      if (sheetPropObj.indexOn) {
        sheetsObj[sheetLabel].indexObjectifiedValues(sheetPropObj.indexOn);
      }
    })
  }

  function createNowObj() {
    return new Utils.DateTimeObj();
  }

  function getReferences() {
    SpreadsheetApp.flush();
    getNow();
    getSS();
    getEU();
    getMonths();
    getPeriod();
    getCompanyInfo();
    getInvoiceContent();
    getUniqueFileMarker();
  }

  function getNow() {
    nowObj = new Utils.DateTimeObj();
  }

  function getSS() {
    ss = SpreadsheetApp.openById(SSID);
  }

  function getEU() {
    euCountries = ["Austria", "Belgium", "Bulgaria", "Croatia", "Cyprus", "Czech Republic", "Denmark", "Estonia", "Finland", "France", "Germany", "Greece", "Hungary", "Ireland", "Italy", 'Latvia', "Lithuania", "Luxembourg", "Malta", "Netherlands", 'Poland', "Portugal", "Romania", "Slovakia", 'Slovenia', 'Spain', "Sweden"]
  }

  function getMonths() {
    months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  }

  function getPeriod() {
    period = months[invoicingDateObj.month] + " " + invoicingDateObj.fullYear;
  }

  function getCompanyInfo() {
    var companyInfoRangeValues = ss.getRange("companyInfoRange").getValues();
    companyInfoObj = new ObjectifyDefinedVerticalTableValues(companyInfoRangeValues);
  }

  function ObjectifyDefinedVerticalTableValues(values) {
    var self = this;
    values.forEach(row => {
      if (row[0] == "") {
        return;
      }
      self[row[1]] = row[2];
    })
  }

  function getInvoiceContent() {
    var values = ss.getRange("invoicesContent").getValues();
    var transposedValues = Utils.transpose(values);
    var header = transposedValues.shift();
    contentAllLangObj = createIndexed(header, transposedValues, "Language");
  }

  function createIndexed(header, transposedValues, indexOn) {
    var indexOnIndex = header.indexOf(indexOn);
    var indexedObj = {};
    transposedValues.forEach(row => {
      if (row[indexOnIndex] == "") {
        return;
      }
      if (!indexedObj[row[indexOnIndex]]) {
        indexedObj[row[indexOnIndex]] = {};
      }
      header.forEach((col, j) => {
        indexedObj[row[indexOnIndex]][header[j]] = row[j];
      })
    })
    return indexedObj;
  }

  function getUniqueFileMarker() {

  }

  function createInvoicesArrays() {
    var companiesObjValues = sheetsObj.companies.objectifiedValues.filter(row => row.company_timestamp != "");
    var devObjValues = sheetsObj.developers.objectifiedValues.filter(row => row.dev_timestamp != "");
    var companiesHeader = sheetsObj.companies.header;
    var devHeader = sheetsObj.developers.header;
    createWriteBackArrays();
    var invoicesArraysObj = REMPTZ_INVOICING_LOGIC.createInvoicesArrays(companiesObjValues, devObjValues, companiesHeader, devHeader, invoicingDateObj, nowObj, euCountries, writeBackArrayCompanies, writeBackArrayDev);
    toCompanyInvoiceArr = invoicesArraysObj.toCompanyInvoiceArr;
    toDeveloperInvoiceArr = invoicesArraysObj.toDeveloperInvoiceArr;
  }

  function createWriteBackArrays() {
    writeBackArrayCompanies = createWriteBackArray(sheetsObj.companies);
    writeBackArrayDev = createWriteBackArray(sheetsObj.developers);
  }

  function createWriteBackArray(sheetObj) {
    var width = sheetObj.header.length;
    var length = sheetObj.lastRow;
    var rowsArr = new Array(length).fill(null);
    var updateArr = rowsArr.map(row => new Array(width).fill(null))
    return updateArr;
  }

  function produceInvoicesPDFs(invoiceObjArr, templateName, languageField) {
    invoiceObjArr.forEach(invoiceObj => {
      var language = invoiceObj[languageField] || "EN";
      var contentObj = contentAllLangObj[language];
      Object.assign(invoiceObj, companyInfoObj, contentObj)
      var pdfFile = TEMPLATES.createTemplate(invoiceObj, templateName);
      invoiceObj.pdfFile = pdfFile;
    })
  }

  function saveInvoicesToFolders(invoiceObjArr, folderId) {
    invoiceObjArr.forEach(invoiceObj => {
      var invNum = invoiceObj.invNum;
      var pdfFile = invoiceObj.pdfFile;
      var date = new Date(invoicingDateObj.date);
      var name = invoiceObj.name;
      var fileObj = FILES.addToDrive(pdfFile, date, name, invNum, folderId);
      var fileURL = fileObj.getUrl();
      var fileId = fileObj.getId();
      invoiceObj.fileURL = fileURL;
      invoiceObj.fileId = fileId;
    })
  }

  function sendOutEmails(invoiceObjArr) {
    EMAIL.sendOutEmails(invoiceObjArr)
  }


  function writeToAllCompanyInvoicesSheets() {
    writeToIndexSheet(sheetsObj.allCompanyInvoicesURLs, toCompanyInvoiceArr, "company_name", "fileURL");
    writeToIndexSheet(sheetsObj.allCompanyInvoicesIds, toCompanyInvoiceArr, "company_name", "fileId");
  }

  function writeToAllDevInvoicesSheets() {
    writeToIndexSheet(sheetsObj.allDevInvoicesURLs, toDeveloperInvoiceArr, "dev_email", "fileURL");
    writeToIndexSheet(sheetsObj.allDevInvoicesIds, toDeveloperInvoiceArr, "dev_email", "fileId");
  }

  function writeToIndexSheet(sheetObj, invoiceObjArr, uidHeader, targetParamter) {
    var currentValues = sheetObj.objectifiedValues.slice(0);
    currentValues.forEach(row => {
      var uid = row[UID];
      var targetEntry = getTragetEntry(uidHeader, uid, invoiceObjArr);
      if (targetEntry) {
        row[period] = targetEntry[targetParamter];
      } else {
        row[period] = null;
      }
      row[UID] = null;
    })
    writeBackToIndexSheets(currentValues, sheetObj);
  }

  function getTragetEntry(uidHeader, uid, invoiceObjArr) {
    for (let i = 0; i < invoiceObjArr.length; i++) {
      var invoiceObj = invoiceObjArr[i];
      if (invoiceObj[uidHeader] == uid) {
        return invoiceObj;
      }
    }
  }

  function writeBackToIndexSheets(currentValues, sheetObj) {
    var header = sheetObj.header.slice(0);
    if (!header.includes(period)) {
      header.push(period);
    } else {
      archiveOldInvoices();
    }
    var writeArr = SHEETS.createWriteArr(currentValues, header);
    writeArr.unshift(header);
    SHEETS.writeAdvancedToSheet(writeArr, sheetObj, UID, sheetObj.headerRow)
  }


  function archiveOldInvoices() {

  }


  /*
  
  Old Write downwards
  
    function writeToAllCompanyInvoicesSheets() {
      var uniqueId = "company_name"
      var sheetsArr = [
        {
          sheetObj: sheetsObj.allCompanyInvoicesURLs,
          sheetParamter: "fileURL"
        },
        {
          sheetObj: sheetsObj.allCompanyInvoicesIds,
          sheetParamter: "fileId"
        }
      ];
      updateInvoicesSheets(toCompanyInvoiceArr, sheetsArr, uniqueId)
    }
  
    function writeToAllDevInvoicesSheets() {
      var uniqueId = "dev_email"
      var sheetsArr = [
        {
          sheetObj: sheetsObj.allDevInvoicesURLs,
          sheetParamter: "fileURL"
        },
        {
          sheetObj: sheetsObj.allDevInvoicesIds,
          sheetParamter: "fileId"
        }
      ];
      updateInvoicesSheets(toDeveloperInvoiceArr, sheetsArr, uniqueId)
    }
  
    function updateInvoicesSheets(invoiceObjArr, sheetsArr, uniqueId) {
      sheetsArr.forEach(sheetArrObj => {
        var sheetObj = sheetArrObj.sheetObj;
        var sheetParamter = sheetArrObj.sheetParamter;
        var header = sheetObj.header;
        var indexedValues = sheetObj.indexedValues;
        var updateArr = getWriteArray(header, invoiceObjArr, sheetParamter, uniqueId);
        if (indexedValues[period]) {
          archiveOldInvoices();
          var lastRow = indexedValues[period].rowInSheet - 2;
          SHEETS.writeToSheet(updateArr, sheetObj, lastRow);
        } else {
          SHEETS.writeToSheet(updateArr, sheetObj);
        }
      })
    }
  
    function archiveOldInvoices() {
  
    }
  
    function getWriteArray(header, invoiceObjArr, sheetParamter, uniqueId) {
      var updateRow = new Array(header.length).fill(null);
      updateRow[0] = period;
      invoiceObjArr.forEach(invoiceObj => {
        var uid = invoiceObj[uniqueId];
        var headIndex = header.indexOf(uid);
        updateRow[headIndex] = invoiceObj[sheetParamter];
      })
      return [updateRow];
    }
  
  */
  function updateCompanySheet() {
    SHEETS.writeAdvancedToSheet(writeBackArrayCompanies, sheetsObj.companies);
  }

  function updateDevsSheet() {
    SHEETS.writeAdvancedToSheet(writeBackArrayDev, sheetsObj.developers);
  }

  REMPTZ_AUTOINVOICING.createInvoices = createInvoices;
  REMPTZ_AUTOINVOICING.sendOutInvoicesEmails = sendOutInvoicesEmails;

  return REMPTZ_AUTOINVOICING
})

function createInvoicesTesting() {
  REMPTZ_AUTOINVOICING.createInvoices();
}

function sendOutEmailsTesting() {
  REMPTZ_AUTOINVOICING.sendOutInvoicesEmails();
}

