const knex = require("../db/connection")

function list() {
    return knex("reservations").select("*")
}

function read(reservation_id) {
    return knex("reservations")
        .select("*")
        .where({ reservation_id: reservation_id })
        .first()
}

function create(reservation) {
    return knex("reservations")
        .insert(reservation)
        .returning("*")
        .then(createdRecords => createdRecords[0])
}

function update(updatedReservation) {
    return knex("reservations")
        .select("*")
        .where({ reservation_id: updatedReservation.reservation_id })
        .whereNot({ status: "finished" })
        .update(updatedReservation, "*")
        .then(updatedRecords => updatedRecords[0])
}

// function finishStatus(updatedReservation) {
//     return knex("reservations")
//         .select("*")
//         .where({ reservation_id: updatedReservation.reservation_id })
//         .update(updatedReservation, "*")
//         .then(updatedRecords => updatedRecords[0])
// }

function destroy(reservation_id) {
    return knex("reservations")
        .where({reservation_id})
        .del()
}

module.exports = {
    list,
    create,
    read,
    update,
    finishStatus: destroy
}