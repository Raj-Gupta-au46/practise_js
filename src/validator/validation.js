const mongoose = require("mongoose");

/*-----------------------------------NAME VALIDATION-----------------------------------------------------*/

const isValidName = function (name) {
  const nameRegex = /^[a-zA-Z]+(([a-zA-Z ])?[a-zA-Z]*)*$/;
  return nameRegex.test(name);
};

/*-----------------------------------EMAIL VALIDATION-----------------------------------------------------*/

const isValidEmail = function (email) {
  const emailRegex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
  return emailRegex.test(email);
};

/*-----------------------------------------PASSWORD VALIDATION-----------------------------------------------*/

const isValidPassword = function (password) {
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  return passwordRegex.test(password);
};

/*---------------------------------------------VALUE VALIDATION-------------------------------------------*/

const isEmpty = function (value) {
  if (typeof value === "undefined" || value === null) return false;
  if (typeof value === "string" && value.trim().length === 0) return false;
  return true;
};

/*---------------------------------------------OBJECT-ID VALIDATION-------------------------------------------*/

const isValidObjectId = (objectId) => {
  return mongoose.Types.ObjectId.isValid(objectId);
};

module.exports = {
  isEmpty,
  isValidName,
  isValidEmail,
  isValidPassword,
  isValidObjectId,
};
