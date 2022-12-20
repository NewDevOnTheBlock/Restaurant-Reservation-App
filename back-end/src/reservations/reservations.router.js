const router = require("express").Router();
const controller = require("./reservations.controller");
const methodNotAllowed = require("../errors/methodNotAllowed")

//check the status of a specific reservation ID
router.route("/:reservation_id/status")
    .get(controller.read)
    .put(controller.updateStatus)
    .all(methodNotAllowed)

// look at a specific reservation by ID
router.route("/:reservation_id")
    .get(controller.read)
    .put(controller.update)
    .all(methodNotAllowed)

// list out all reservations
router.route("/")
    .get(controller.list)
    .post(controller.create)
    .all(methodNotAllowed)

module.exports = router;
