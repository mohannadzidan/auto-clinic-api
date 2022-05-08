const express = require("express")
const { param } = require('express-validator');
const router = express.Router()

const reservationController = require("../controllers/reservation.controller")
const { validate } = require("../middlewares/validators/wrapper.validator")
const {
    completeReservationValidator
} = require("../middlewares/validators/reservations.validation")

router.get("/api/reservations/:id", reservationController.reservation)
router.post("/api/reservations", validate(completeReservationValidator), reservationController.reservationPost)
router.get("/api/reservations::lookup/:nationalId",
    validate([param('nationalId').exists().isNumeric().withMessage('nationalId param is required')]),
    reservationController.findReservationsByNationalID)

module.exports = router
