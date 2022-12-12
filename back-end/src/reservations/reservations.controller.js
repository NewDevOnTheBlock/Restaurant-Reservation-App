const service = require('./reservations.service')
const hasProperties = require('../errors/hasProperties')
const asyncErrorBoundary = require('../errors/asyncErrorBoundary')

// validation middleware

//validate reservation existence
async function reservationExists(req, res, next) {
  const { reservationId } = req.params;
  const reservation = await service.read(reservationId);
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({
    status: 404,
    message: `Reservation '${reservationId}' does not exist.`
  })
}

// validate people count is a number

// validate time is a time

// validate date is a date

// list out all reservations in the system
async function list(req, res) {
  // filter based on date from query params
  // sort all reservations by time
  const data = await service.list()
  res.json({ data })
}

// read a single reservation in the system
async function read(req, res) {
  const { reservation } = res.locals
  res.json({ data: reservation })
}

// adds a new reservation to the system
async function create(req, res) {
  const data = await service.create(req.body.data)
  res.status(201).json({ data })
}

// exported functions
module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    asyncErrorBoundary(hasProperties("first_name")),
    asyncErrorBoundary(hasProperties("last_name")),
    asyncErrorBoundary(hasProperties("mobile_number")),
    asyncErrorBoundary(hasProperties("reservation_date")),
    asyncErrorBoundary(hasProperties("reservation_time")),
    asyncErrorBoundary(hasProperties("people")),
    asyncErrorBoundary(create)
  ],
  read: [
    asyncErrorBoundary(reservationExists), 
    read
  ],
};
