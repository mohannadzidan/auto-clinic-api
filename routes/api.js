const express = require("express")
const router = express.Router()

const profilesController = require("../controllers/profiles.controller")
const { validate } = require("../middlewares/validators/wrapper.validator")
const {
    completeProfileValidator
} = require("../middlewares/validators/profiles.validation")

router.get("/api/profiles/:id", profilesController.profile)
router.post("/api/profiles", validate(completeProfileValidator), profilesController.profilePost)

module.exports = router
