const service = require("./reservations.service");
const hasProperties = require("../errors/hasProperties");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

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
    message: `Reservation '${reservationId}' does not exist.`,
  });
}

// validate people count is a number
async function validatePeople(req, res, next) {
  const { data = {} } = req.body;

  if (!data.people || data.people <= 0 || typeof data.people !== "number") {
    next({
      status: 400,
      message: "people must be a valid number of one or more",
    });
  }
  next();
}

// validate time is a time
async function validateTime(req, res, next) {
  const { data = {} } = req.body;
  const time = data.reservation_time
  if (!time.match(/^\d{1,2}:\d{2}([ap]m)?$/)) {
    next({
      status: 400,
      message: "reservation_time must be a valid time format!"
    })
  }
  next()
}

// validate date is a date
async function validateDate(req, res, next) {
  const { data = {} } = req.body;
  const date = data.reservation_date
  if (!Date.parse(date)) {
    next({
      status: 400,
      message: "reservation_date must be a valid date format!"
    })
  }
  next()
}

// list out all reservations in the system
async function list(req, res) {
  // filter based on date from query params
  // sort all reservations by time
  const queryDate = req.query.date;
  const data = await service.list();
  const newData = data.filter(
    ({ reservation_date: date }) =>
      JSON.stringify(date).slice(1, 11) == queryDate
  );
  newData.sort((a, b) => {
    let c = a.reservation_time
    let d = b.reservation_time
    if (c > d) {
      return 1
    } else if (c === d) {
      return 0
    } else {
      return -1
    }
  })
  res.json({ data: newData });
}

// read a single reservation in the system
async function read(req, res) {
  const { reservation } = res.locals;
  res.json({ data: reservation });
}

// adds a new reservation to the system
async function create(req, res) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
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
    asyncErrorBoundary(validatePeople),
    asyncErrorBoundary(validateDate),
    asyncErrorBoundary(validateTime),
    asyncErrorBoundary(create),
  ],
  read: [asyncErrorBoundary(reservationExists), read],
};
