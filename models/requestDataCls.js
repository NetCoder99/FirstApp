//auth        : null
//collection  : "78b0ac4c-047e-4a66-b1c5-3726651320be"
//createdAt   : 1586706978233
//updatedAt   : 1586708528742
//data        : null
//dataMode    : null
//dataOptions : null
//description : ""
//folder      : null
//id          : "0c76ba6d-38cb-47ad-8466-72c2785594cb"
//method      : "GET"
//name        : "Get Employees"
//url         : "http://localhost:8080/GetData?source=Employee"
//protocolProfileBehavior: {disableBodyPruning: true}
//queryParams : Array(1)
//0: {key: "source", value: "Employee", description: "", type: "text", enabled: true}

var auth;
var collection;
var createdAt;
var updatedAt;
var data;
var dataMode;
var dataOptions;
var description;
var folder;
var id;
var method;
var name;
var url;
var protocolProfileBehavior;

module.exports = requestDataCls;

function requestDataCls() {}
requestDataCls.prototype.setFields = function rqstSetFields(rqstData) {
  this.auth = rqstData.auth;
  this.collection = rqstData.collection;
  this.createdAt = rqstData.createdAt;
  this.updatedAt = rqstData.updatedAt;
  this.data = rqstData.data;
  this.dataMode = rqstData.dataMode;
  this.dataOptions = rqstData.dataOptions;
  this.description = rqstData.description;
  this.folder = rqstData.folder;
  this.id = rqstData.id;
  this.method = rqstData.method;
  this.name = rqstData.name;
  this.url = rqstData.url;
  this.protocolProfileBehavior = rqstData.protocolProfileBehavior;
};

requestDataCls.prototype.toString = function rqstToString() {
  return "method:" + this.method + ", name:" + this.name + ", url:" + this.url + ", collection:" + this.collection; 
};