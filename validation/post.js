const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePostInput(data) {
  const errors = {};

  data.text = !isEmpty(data.text) ? data.text : "";

  if (!validator.isLength(data.text, { min: 1, max: 300 }))
    errors.text = "Post must be between 1 and 300 characters";

  if (validator.isEmpty(data.text)) errors.text = "Post must not be empty.";

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
