const router = require("express").Router();
const controller = require("./reservations.controller");

router.route("/new")
    .post(controller.create)
    //.all()

router.route("/")
    .get(controller.list)
    //.all()

module.exports = router;
