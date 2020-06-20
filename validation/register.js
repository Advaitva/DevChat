const isEmpty = require("./is-empty");
const validator = require("validator");
module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (isEmpty(data.name)) errors.name = "Please enter a name.";

  if (!validator.isLength(data.name, { min: 2, max: 30 }))
    errors.name = "Name must be between 2 to 30 characters.";

  if (isEmpty(data.email)) errors.email = "Please enter an email-id.";

  if (!validator.isEmail(data.email)) errors.email = "Invalid email-id";

  if (isEmpty(data.password)) errors.password = "Please enter a password.";

  if (!validator.isLength(data.password, { min: 6, max: 30 }))
    errors.password = "Password length must be between 6 and 30 .";

  if (isEmpty(data.password2))
    errors.password2 = "Re-enter the password below.";

  if (!validator.equals(data.password, data.password2))
    errors.password2 = "Passwords do not match.";

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
