const knex = require("../db/connection")

function list() {
    return knex("tables")
        .select("*")
}

function create(table) {
    return knex("tables")
        .insert(table)
        .returning("*")
        .then(createdRecords => createdRecords[0])
}

function read(table_id) {
    return knex("tables")
        .select("*")
        .where({ table_id: table_id })
        .first()
}

function update(table_id) {
    return knex("tables")
        .select("*")
        .where({ table_id: table_id })
        .then(tableRecords => tableRecords[0])
}

module.exports = {
    list,
    create,
    read,
    update,
}