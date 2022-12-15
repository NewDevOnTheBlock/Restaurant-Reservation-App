const router = require("express").Router();
const controller = require("./reservations.controller");
const methodNotAllowed = require("../errors/methodNotAllowed")

// look at a specific reservation by ID
router.route("/:reservation_id")
    .get(controller.read)
    .all(methodNotAllowed)

// list out all reservations
router.route("/")
    .get(controller.list)
    .post(controller.create)
    .all(methodNotAllowed)

module.exports = router;
