const express = require("express")
const router = express.Router()

const reservationController = require("../controllers/reservation.controller")
const { validate } = require("../middlewares/validators/wrapper.validator")
const {
    completeReservationValidator
} = require("../middlewares/validators/reservations.validation")

router.get("/api/reservations/:id", reservationController.reservation)
router.post("/api/reservations", validate(completeReservationValidator), reservationController.reservationPost)

module.exports = router
