const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateExperienceInput(data) {
  const errors = {};

  data.school = !isEmpty(data.school) ? data.school : "";
  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.fieldOfStudy = !isEmpty(data.fieldOfStudy) ? data.fieldOfStudy : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  if (validator.isEmpty(data.school)) errors.school = "No school entered.";
  if (validator.isEmpty(data.degree))
    errors.degree = "Company feild cannot be empty.";
  if (validator.isEmpty(data.from)) errors.from = "from feild cannot be empty.";
  if (validator.isEmpty(data.fieldOfStudy))
    errors.fieldOfStudy = "fieldOfStudy feild cannot be empty.";
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
