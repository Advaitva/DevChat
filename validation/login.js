const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  const errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (isEmpty(data.email)) errors.email = "No email entered.";

  if (!validator.isEmail(data.email)) errors.email = "Enter a valid email.";

  if (isEmpty(data.password)) errors.password = "No password entered";

  return {
    errors,
    isValid: errors,
  };
};
