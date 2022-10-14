import { check, validationResult } from "express-validator";
// const {check, validationResult} = require( 'express-validator');

export const userValidation = [
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email")
    .normalizeEmail(),

  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long!")
    .not()
    .isUppercase()
    .withMessage("It must contain one lowercase character")
    .not()
    .isLowercase()
    .withMessage("It must contain one UPPERCASE character")
    .not()
    .isAlphanumeric()
    // .isAlpha()
    .withMessage(" It must contain a number and special character."),

  check("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required!")
    .isLength({ min: 3, max: 20 })
    .withMessage("Name must be 3 to 20 characteres long!"),

  check("avatarURL")
    .trim()
    // .notEmpty()
    // .withMessage('Name is required!')
    .optional()
    .isURL()
    .withMessage("Invalid URL"),
];

export const userValidationResult = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const error = result.array()[0].msg;
    return res.status(400).json({ success: false, error: error });
  }
  next();
};
