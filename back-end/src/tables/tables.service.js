const knex = require("../db/connection")

function list() {
    return knex("tables")
        .select("*")
        .orderBy("table_name")
}

function create(newTable) {
    return knex("tables")
        .insert(newTable)
        .returning("*")
        .then(createdRecords => createdRecords[0])
}

function read(table_id) {
    return knex("tables")
        .select("*")
        .where({ table_id: table_id })
        .first()
}

function update(updatedTable) {
    return knex("tables")
        .select("*")
        .where({ table_id: updatedTable.table_id })
        .then(tableRecords => tableRecords[0])
}

module.exports = {
    list,
    create,
    read,
    update,
}