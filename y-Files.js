; (function (root, factory) {
  root.FILES = factory()
})(this, function () {

  const FILES = {}

  function addToDrive(pdfFile, date, name, invNum, parentFolderId) {
    var pathArr = getPathArr(name, date);
    var writeFolderId = getFolderAtPathEnd(pathArr, parentFolderId);
    var writeFolder = Utils.getFolder(writeFolderId);
    var fileObj = Utils.createPdf(pdfFile, invNum, writeFolder);
    return fileObj;
  }

  function getPathArr(name, date) {
    var pathArr = [name, date.getFullYear()]; // Folders by year
    //   var pathArr = [name, date.getFullYear(), date.getMonth() + 1]; // Folders by month
    //   var pathArr = [name, date.getFullYear(), date.getMonth() + 1, date.getDate()]; // Folders by day
    return pathArr;
  }

  function getFolderAtPathEnd(pathArr, parentFolderId) {
    var parentId = parentFolderId;
    for (var i = 0; i < pathArr.length; i++) {
      var folder;
      var nameArr = [],
        idArr = [];
      var folders = Utils.getFolder(parentId).getFolders();
      while (folders.hasNext()) {
        folder = folders.next();
        nameArr.push(folder.getName());
        idArr.push(folder.getId());
      }
      var nameIndex = nameArr.indexOf([pathArr[i]].toString());
      if (nameIndex == -1) {
        parentId = createFolder(parentId, pathArr[i]);
      } else {
        parentId = idArr[nameIndex];
      }
    }
    return parentId;
  }

  function createFolder(parentId, name) {
    var parentFolder = Utils.getFolder(parentId);
    var newFolder = parentFolder.createFolder(name);
    var newFolderId = newFolder.getId();
    return newFolderId;
  }

  FILES.addToDrive = addToDrive;

  return FILES
})