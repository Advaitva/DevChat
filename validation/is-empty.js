module.exports = function isEmpty(obj) {
  return (
    obj === undefined || // check for undefined
    obj === null || // check for null
    (typeof obj === "object" && Object.keys(obj).length === 0) || // check for empty object values
    (typeof obj === "string" && obj.trim().length === 0) // check for emoty string
  );
};
