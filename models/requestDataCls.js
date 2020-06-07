var description;
var url;
var collection;

module.exports = requestDataCls;

function requestDataCls() {}
requestDataCls.prototype.setFields = function rqstSetFields(rqstData) {
  this.description = rqstData.description;
  this.url         = rqstData.url;
  this.collection  = rqstData.collection;
};

headerDataCls.prototype.toString = function hdrToString() {
  return "url:" + this.url + ", description:" + this.description + ", collection:" + this.collection; 
};