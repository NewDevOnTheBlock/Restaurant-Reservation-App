const knex = require("../db/connection")

function list() {
    return knex("reservations").select("*")
}

function read(reservationId) {
    return knex("reservations")
        .select("*")
        .where({ reservation_id: reservationId })
        .first()
}

function create(reservation) {
    return knex("reservations")
        .insert(reservation)
        .returning("*")
        .then(createdRecords => createdRecords[0])
}

module.exports = {
    list,
    create,
    read
}