'use strict';

var db;
const dbName = "postman-app";
//const dbPath = "C:\Users\dughome002\AppData\Roaming\Postman\IndexedDB\file__0.indexeddb.leveldb"
const collectionsName = "collections";
const requestsName = "requests";

var headerDataCls = require("./models/headerDataCls");
var requestDataCls = require("./models/requestDataCls");


document.getElementById("btnDbOpen").addEventListener("click", () => {
  console.log("btnDbOpen clicked");
  OpenDatabase();
});

//document.getElementById("btnDbClose").addEventListener("click", () => {
//  console.log("btnDbClose clicked");
//  CloseDatabase();
//});

document.getElementById("btnDbReadCollections").addEventListener("click", () => {
  console.log("btnDbReadCollections clicked");
  console.log("------- Collections -------");
  listAllObjects("collection:", collectionsName);
});

document.getElementById("btnDbReadRequests").addEventListener("click", () => {
  console.log("btnDbReadRequests clicked");
  console.log("------- Requests -------");
  listAllRequests("requests:", requestsName);
});

document.getElementById("btnDbReadRequestsCollection").addEventListener("click", () => {
  console.log("btnDbReadRequestsCollection clicked");

  var txtBox = document.getElementById("txt_collection_id");
  console.log("txtBox value:" + txtBox.value);

  console.log("------- Collection -------");

  listAllRequestsByCollection("requests:", requestsName, txtBox.value);
});

async function listDbNames() {
  var result = await indexedDB.databases();
  for (var i = 0; i < result.length; i++) {
    console.log("DbName: " + result[i].name);
  }
}

function OpenDatabase() {
  console.log("Opening database");
  var request = indexedDB.open(dbName);
  request.onerror = function (event) {
    console.log("Why didn't you allow my web app to use IndexedDB?!");
  };
  request.onsuccess = function (event) {
    db = event.target.result;
    console.log("Database was opened!!!");
  };
}

function CloseDatabase() {
  if (db != null) { db.close(); }
}

function listObjectStores() {
  console.log(db.objectStoreNames);
}

//------------------------------------------------------------------------
function listAllObjects(objStoreDesc, objStoreName) {
  var objectStore = db.transaction(objStoreName, IDBTransaction.READ_ONLY).objectStore(objStoreName);
  objectStore.openCursor().onsuccess = function (event) {
    var cursor = event.target.result;
    if (cursor) {
      console.log(objStoreDesc + "  ::  key:" + cursor.key + ", name:" + cursor.value.name);
      //console.log("    headers: " + cursor.value.headerData); 

      if (!(cursor.value.headerData === undefined)) {
        console.log("    headerDataLength:" + cursor.value.headerData.length);
        cursor.value.headerData.forEach((hdrData) => {
          var header1 = new headerDataCls();
          header1.setFields(hdrData);
          console.log("      headerData: " + header1.toString());
        })
      }
      if (!(cursor.value.url === undefined)) { console.log("    url:" + cursor.value.url); }
      cursor.continue();
    }
  };
}
//------------------------------------------------------------------------
function listAllRequests(objStoreDesc, objStoreName) {
  var objectStore = db.transaction(objStoreName, IDBTransaction.READ_ONLY).objectStore(objStoreName);
  objectStore.openCursor().onerror = function (event) {
    console.log("++++  error:" + event);
  }
  objectStore.openCursor().onsuccess = function (event) {
    var cursor = event.target.result;
    if (cursor) {
      console.log(objStoreDesc + "  ::  key:" + cursor.key + ", name:" + cursor.value.name);

      if (!(cursor.value.headerData === undefined)) {
        console.log("    headerDataLength:" + cursor.value.headerData.length);
        cursor.value.headerData.forEach((hdrData) => {
          var header1 = new headerDataCls();
          header1.setFields(hdrData);
          console.log("      headerData: " + header1.toString());
        })
      }

      console.log("    url:" + cursor.value.url);
      console.log("    collection:" + cursor.value.collection);

      cursor.continue();

    }
  };
}

//------------------------------------------------------------------------
function listAllRequestsByCollection(objStoreDesc, objStoreName, collectionKey) {
  console.log("------- Requests for collection" + collectionKey + " -------");
  var objectStore = db.transaction(objStoreName, IDBTransaction.READ_ONLY).objectStore(objStoreName);
  objectStore.openCursor().onerror = function (event) { console.log("++++  error:" + event); }

  var dispIdx = 0;
  objectStore.openCursor().onsuccess = function (event) {
    var cursor = event.target.result;
    if (cursor) 
    {
      if (cursor.value.collection == collectionKey) 
      { 
        var requestDataObj = new requestDataCls();
        requestDataObj.setFields(cursor.value);
        dispIdx++;
        console.log(String("    " + dispIdx).slice(-3) + "   request:" + requestDataObj.toString()); 
      }
      cursor.continue();
    }
  };
}
