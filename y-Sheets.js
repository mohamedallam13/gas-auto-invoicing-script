;
(function (root, factory) {
  root.SHEETS = factory()
}(this, function () {
  const SHEETS = {};

  function getSheetObj(ssMan, sheetName, sheetParseObj) {
    var sheetPropObj = ssMan.sheets[sheetName];
    var sheetObj = readSheet(sheetPropObj, sheetParseObj);
    return sheetObj;
  }

  function readSheet(sheetPropObj, sheetParseObj) {
    var sheetObj = sheetPropObj.parseSheet(sheetParseObj);
    sheetObj.objectifyValues();
    return sheetObj
  }

  function createSheetManager(ssid, sheetNamesArr) {
    if (!Array.isArray(sheetNamesArr)) {
      sheetNamesArr = [sheetNamesArr];
    }
    return imp.createSpreadsheetManager(ssid).addSheets(sheetNamesArr);
  }

  function createWriteArr(processedCases, header) {
    var writeArr = processedCases.map(caseObj => {
      return runOverHeader(caseObj, header);
    })
    return writeArr;
  }

  function runOverHeader(caseObj, header) {
    var rowArr = header.map(col => {
      if (caseObj[col]) {
        return caseObj[col];
      }
      return null;
    })
    return rowArr;
  }

  function writeToSheet(writeArr, sheetObj, lastRow) {
    if (writeArr.length == 0) {
      return;
    }
    lastRow = lastRow || sheetObj.lastRow;
    var sheet = sheetObj.Sheet;
    sheet.getRange(lastRow + 1, 1, writeArr.length, writeArr[0].length).setValues(writeArr); //1 as a column here is the start column of the header
  }

  function writeAdvancedToSheet(writeArr, sheetObj, startHeader, startRow) {
    var header = sheetObj.header;
    var sheetName = sheetObj.sheetName;
    var ssid = sheetObj.ssid;
    if (startHeader) {
      var startColumn = header.indexOf(startHeader) + 1; //1 here is the start column of the header
    } else {
      var startColumn = 1;
    }
    var startColumnNumber = Utils.colNumToA1(startColumn);
    startRow = startRow || 1;
    var range = sheetName + '!' + startColumnNumber + startRow;
    Utils.writeDataAdv(writeArr, range, ssid);
  }

  function deleteFromSheet(creationSheet, processedCases) {
    var toDelete = getToDeleteArray(processedCases);
    deleteEntries(creationSheet, toDelete);
  }

  function getToDeleteArray(processedCases) {
    var toDelete = processedCases.map(caseObj => {
      return caseObj.rowInSheet;
    })
    toDelete = toDelete.sort(function (a, b) {
      return a - b
    });
    return toDelete;
  }

  function deleteEntries(creationSheet, toDelete) {
    var delCount = 1;
    var i;
    for (i = toDelete.length - 1; i >= 0; i--) {
      if (i > 0 && toDelete[i - 1] == toDelete[i] - 1) {
        delCount++;
        continue;
      } else {
        creationSheet.deleteRows(toDelete[i], delCount);
        delCount = 1;
      }
    }
  }
  SHEETS.createSheetManager = createSheetManager;
  SHEETS.getSheetObj = getSheetObj;
  SHEETS.createWriteArr = createWriteArr;
  SHEETS.deleteFromSheet = deleteFromSheet;
  SHEETS.writeToSheet = writeToSheet;
  SHEETS.writeAdvancedToSheet = writeAdvancedToSheet;
  SHEETS.runOverHeader = runOverHeader;
  return SHEETS
}))