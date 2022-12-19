const service = require("./tables.service");
const reservationService = require("../reservations/reservations.service")
const hasProperties = require("../errors/hasProperties");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// validation middleware

// verify table exists
async function tableExists(req, res, next) {
    const { table_id } = req.params;
    const table = await service.read(table_id)
    if (table) {
        res.locals.table = table
        return next()
    } else {
        next({
            status: 404,
            message: `could not find table with an id of ${table_id}`
        })
    }
    
}

// validate reservation id exists
async function reservationIdExists(req, res, next) {
    const { reservation_id } = req.body.data
    const reservation = await reservationService.read(reservation_id)
    if (reservation) {
        res.locals.reservation = reservation
        return next()
    }
    return next({
        status: 404,
        message: `${req.body.data.reservation_id} not found`
    })
}

// validate table_name length
function validateNameLength(req, res, next) {
    const { data = {} } = req.body
    if (data.table_name.length < 2) {
        next({
            status: 400,
            message: "table_name must be at least 2 characters long"
        })
    }
    next();
}
// validate capacity is integer
function validateCapacity(req, res, next) {
    const { data = {} } = req.body
    // console.log(data.capacity)
    if (!data.capacity || typeof data.capacity !== "number" || data.capacity < 1) {
        return next({
            status: 400,
            message: "capacity must be a number with a positive value"
        })
    }
    next()
}

// properties that the table must contain
const VALID_PROPERTIES = ["table_name", "capacity", "reservation_id"];
// check the valid fields
function hasValidFields(req, res, next) {
    const { data = {} } = req.body;
    const invalidFields = Object.keys(data).filter(
        (field) => !VALID_PROPERTIES.includes(field)
    );
  
    if (invalidFields.length) {
        return next({
            status: 400,
            message: `Invalid field(s): ${invalidFields.join(", ")}`,
        });
    }
    next();
}

// validate reservation party size is less than table capacity
function validateTableCapacity(req, res, next) {
    const { reservation } = res.locals
    const { table } = res.locals

    if (table.capacity < reservation.people) {
        return next({
            status: 400,
            message: "Party size is larger than the table capacity."
        })
    }
    next()
}

// validate table is not occupied
function validateOccupation(req, res, next) {
    const { table } = res.locals;

    if (table.reservation_id) {
        return next({
            status: 400,
            message: "Table is currently occupied, please choose another table."
        })
    }
    next();
}

// list all tables
async function list(req, res) {
    const data = await service.list()
    res.json({ data })
}

// read specific table
async function read(req, res) {
    res.json({ data: res.locals.table })
}

// create a new table
async function create(req, res) {
    const data = await service.create(req.body.data)
    res.status(201).json({ data })
}
// update the table with the reservation information
async function seatTable(req, res) {
    const { table } = res.locals
    const updatedInfo = {
        ...req.body.data,
        table_id: table.table_id
    }
    await service.seatTable(updatedInfo)
    res.json({ data: updatedInfo })
}

module.exports = {
    list: asyncErrorBoundary(list),
    create: [
        asyncErrorBoundary(hasProperties("table_name")),
        asyncErrorBoundary(hasProperties("capacity")),
        asyncErrorBoundary(hasValidFields),
        asyncErrorBoundary(validateNameLength),
        asyncErrorBoundary(validateCapacity),
        asyncErrorBoundary(create)
    ],
    read: [
        asyncErrorBoundary(tableExists),
        asyncErrorBoundary(read)
    ],
    seatTable: [
        asyncErrorBoundary(hasValidFields),
        asyncErrorBoundary(hasProperties("reservation_id")),
        asyncErrorBoundary(tableExists),
        asyncErrorBoundary(validateOccupation),
        asyncErrorBoundary(reservationIdExists),
        asyncErrorBoundary(validateTableCapacity),
        asyncErrorBoundary(seatTable)
    ]

}