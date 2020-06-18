const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  const errors = {};
  data.handle = !isEmpty(data.handle) ? data.handle : ""; //handle is not a string
  data.status = !isEmpty(data.status) ? data.status : ""; //status is not a string
  data.skills = !isEmpty(data.skills) ? data.skills : ""; //Skills is not a string

  if (!validator.isLength(data.handle, { min: 2, max: 20 }))
    errors.handle = "Handle needs to be between 2 and 40 characters";
  if (validator.isEmpty(data.status)) errors.status = "Status is required.";
  if (validator.isEmpty(data.skills)) errors.skills = "Skills is required.";

  if (!isEmpty(data.website)) {
    if (!validator.isURL(data.website)) errors.website = "Invalid URL";
  }

  if (!isEmpty(data.twitter)) {
    if (!validator.isURL(data.twitter)) errors.twitter = "Invalid twitter";
  }

  if (!isEmpty(data.youtube)) {
    if (!validator.isURL(data.youtube)) errors.youtube = "Invalid youtube";
  }

  if (!isEmpty(data.facebook)) {
    if (!validator.isURL(data.facebook)) errors.facebook = "Invalid facebook";
  }

  if (!isEmpty(data.linkedin)) {
    if (!validator.isURL(data.linkedin)) errors.linkedin = "Invalid linkedin";
  }
  if (!isEmpty(data.instagram)) {
    if (!validator.isURL(data.instagram))
      errors.instagram = "Invalid instagram";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
