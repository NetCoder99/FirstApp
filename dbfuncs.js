'use strict';

var db;
const dbName = "postman-app";
const dbPath = "C:\Users\dughome002\AppData\Roaming\Postman\IndexedDB\file__0.indexeddb.leveldb"
const collectionsName   = "collections";
const requestsName      = "requests";

var headerDataCls = require("./models/headerDataCls");
var User = require('./models/user');

const DataTables_Tests_ID  = "78b0ac4c-047e-4a66-b1c5-3726651320be"

//document.getElementById("btnDbStat4us").addEventListener("click", () => {
//  console.log("btnDbStatus clicked");
//});

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

//document.getElementById("btnDbReadCollections").addEventListener("click", () => {
//  console.log("btnDbReadCollections clicked");
//  //console.log(db);  
//  listDbNames();
//  //console.log("--- Object Stores ---");  
//  //console.log(db.objectStoreNames);  
//  console.log("------- Collections -------");  
//  listAllObjects("collection:", collectionsName);
//  //console.log("------- Requests -------");  
//  //listAllObjects("request:", requestsName);
//});

////------------------------------------------------------------------------
//function ListObjectStoreKeys(objectStoreName)
//{
//  var transaction = db.transaction(['contactsList'], 'readonly');
//  var objectStore = transaction.objectStore('contactsList');
//}

async function listDbNames() {
    var result = await indexedDB.databases();
    for (var i = 0; i < result.length; i++) {
      console.log("DbName: " + result[i].name);
    }
}

function OpenDatabase(){
  console.log("Opening database");
  var request = indexedDB.open(dbName);
  request.onerror = function(event) {
    console.log("Why didn't you allow my web app to use IndexedDB?!");
  };
  request.onsuccess = function(event) {
    db = event.target.result;
    console.log("Database was opened!!!");
  };
}

function CloseDatabase(){
  if (db != null)
  { db.close(); }
}

function listObjectStores(){
  console.log(db.objectStoreNames);  
}

//------------------------------------------------------------------------
function listAllObjects(objStoreDesc, objStoreName) {
  var objectStore = db.transaction(objStoreName, IDBTransaction.READ_ONLY).objectStore(objStoreName);
  objectStore.openCursor().onsuccess = function(event) {
     var cursor = event.target.result;
     if (cursor) {
        console.log(objStoreDesc + "  ::  key:" + cursor.key + ", name:" + cursor.value.name);  
        //console.log("    headers: " + cursor.value.headerData); 

        if (!(cursor.value.headerData === undefined))
        {
          console.log("    headerDataLength:" + cursor.value.headerData.length);  
          cursor.value.headerData.forEach((hdrData) => {
            var header1 = new headerDataCls();
            header1.setFields(hdrData);
            console.log("      headerData: " + header1.toString());
            //var header1 = new headerDataCls(
            //  hdrData.description,
            //  hdrData.enabled,
            //  hdrData.key,
            //  hdrData.type,
            //  hdrData.value
            //);
            //console.log("headerData: " + header1.toString());

            //header1.setFields(hdrData);

          })          
        }

        if (!(cursor.value.url === undefined))
        {console.log("    url:" + cursor.value.url);  }
        cursor.continue();
     }
  };
}
//------------------------------------------------------------------------
function listAllRequests(objStoreDesc, objStoreName) {
  var objectStore = db.transaction(objStoreName, IDBTransaction.READ_ONLY).objectStore(objStoreName);
  objectStore.openCursor().onsuccess = function(event) {
     var cursor = event.target.result;
     if (cursor) {
        console.log(objStoreDesc + "  ::  key:" + cursor.key + ", name:" + cursor.value.name);  

        if (!(cursor.value.headerData === undefined))
        {
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