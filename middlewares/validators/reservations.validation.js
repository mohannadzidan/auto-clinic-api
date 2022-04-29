const { body } = require("express-validator")
const { isNationalId } = require('./national-id');
const availableCities = ['cairo,egypt'];
/**
 *
 * @type {ValidationChain[]}
 */
exports.completeReservationValidator = [
    body("name").isString().isLength({ min: 5, max: 30 }).withMessage("name is required to be a string, and with length between 5 to 30 characters."),
    body("nationalId").custom(isNationalId).withMessage("ERROR_INVALID_NATIONAL_ID"),
    body("birthDate").isISO8601().withMessage("birthDate is required to be ISO8601"),
    body("gender").isIn(['male', 'female']).withMessage("gender is required one of [male, female]"), // xD
    body("city").isString().isIn(availableCities).withMessage("city is required to be a one of [" + availableCities.join(', ') + ']'),
    body("phoneNumber").isMobilePhone().withMessage("phoneNumber is required to be a phone number"),
    body("hasDiabetic").default(false).isBoolean().withMessage("hasDiabetes is required to be a boolean"),
    body("hasHypertension").default(false).isBoolean().withMessage("hasHypertension is required to be a boolean"),
    body("hasHeartDisease").default(false).isBoolean().withMessage("hasHeartDisease is required to be a boolean"),
    body("hasObesity").default(false).isBoolean().withMessage("hasObesity is required to be a boolean"),
    body("hasCancer").default(false).isBoolean().withMessage("hasCancer is required to be a boolean"),
    body("hasAsthma").default(false).isBoolean().withMessage("hasAsthma is required to be a boolean"),
    body("hasFever").default(false).isBoolean().withMessage("hasFever is required to be a boolean"),
    body("hasCough").default(false).isBoolean().withMessage("hasCough is required to be a boolean"),
    body("hasTiredness").default(false).isBoolean().withMessage("hasTiredness is required to be a boolean"),
    body("hasLossOfTasteOrSmell").default(false).isBoolean().withMessage("hasLossOfTasteOrSmell is required to be a boolean"),
    body("hasSoreThroat").default(false).isBoolean().withMessage("hasSoreThroat is required to be a boolean"),
    body("hasHeadache").default(false).isBoolean().withMessage("hasHeadache is required to be a boolean"),
    body("hasAchesAndPains").default(false).isBoolean().withMessage("hasAchesAndPains is required to be a boolean"),
    body("hasDiarrhea").default(false).isBoolean().withMessage("hasAchesAndPains is required to be a boolean"),
    body("hasRedOrIrritatedEyes").default(false).isBoolean().withMessage("hasRedOrIrritatedEyes is required to be a boolean"),
    body("isSmoking").default(false).isBoolean().withMessage("isSmoking is required to be a boolean"),
    body("date").isISO8601().withMessage("date is required to be ISO8601"),
]
