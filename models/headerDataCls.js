var description;
var enabled;
var key;
var type;
var value;

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

module.exports = headerDataCls;

