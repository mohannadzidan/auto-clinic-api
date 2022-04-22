const { body } = require("express-validator")

/**
 *
 * @type {ValidationChain[]}
 */
exports.completeProfileValidator = [
    body("patentId").isString().withMessage("patentId is required is required to be a string"),
    body("name").isString().withMessage("name is required to be a string"),
    body("birthDate").isISO8601().withMessage("birthDate is required to be a ISO8601"),
    body("gender").isNumeric().withMessage("gender is required to be a number, 1 for male, 0 for female"), // xD
    body("phoneNumber").isString().withMessage("phoneNumber is required to be a string"),
    body("address").isString().withMessage("address is required to be a string"),
    body("hasHypertension").isBoolean().withMessage("hasHypertension is required to be a boolean"),
    body("hasDiabetes").isBoolean().withMessage("hasDiabetes is required to be a boolean"),
    body("hasObesity").isBoolean().withMessage("hasObesity is required to be a boolean"),
    body("hasAllergies").isBoolean().withMessage("hasAllergies is required to be a boolean"),
    body("hasCancer").isBoolean().withMessage("hasCancer is required to be a boolean"),
    body("isSmoker").isBoolean().withMessage("isSmoker is required to be a boolean"),
]
