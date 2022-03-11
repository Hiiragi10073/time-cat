module.exports.isDef = function isDef(v) {
  return v !== undefined && v !== null;
};

module.exports.isUnDef = function isUnDef(v) {
  return v === undefined || v === null;
};

module.exports.isDate = function isDate(d) {
  const D = new Date(d);
  return !D.toString().includes('Invalid');
};
