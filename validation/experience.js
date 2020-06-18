const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateExperienceInput(data) {
  const errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.company = !isEmpty(data.company) ? data.company : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  if (validator.isEmpty(data.title)) errors.title = "No title entered.";
  if (validator.isEmpty(data.company))
    errors.company = "Company feild cannot be empty.";
  if (validator.isEmpty(data.from)) errors.from = "from feild cannot be empty.";

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
