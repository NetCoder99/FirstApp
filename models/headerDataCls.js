var description;
var enabled;
var key;
var type;
var value;

module.exports = headerDataCls;

//function headerDataCls(description,enabled,key,type,value) {
//  this.description = description;
//  this.enabled = enabled;
//  this.key = key;
//  this.type = type;
//  this.value = value;
//}
function headerDataCls() {}
headerDataCls.prototype.setFields = function hdrSetFields(hdrData) {
  this.description = hdrData.description;
  this.enabled = hdrData.enabled;
  this.key = hdrData.key;
  this.type = hdrData.type;
  this.value = hdrData.value;
};

headerDataCls.prototype.toString = function hdrToString() {
  return "key:" + this.key + ", value:" + this.value + ", type:" + this.type; 
};