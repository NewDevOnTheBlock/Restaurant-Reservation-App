import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { useHistory } from "react-router-dom";
import TableList from "./TableList"
import ReservationList from "./ReservationList";
import { previous, today, next } from "../utils/date-time";
/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
*/

function Dashboard({ date }) {
  const history = useHistory()

  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  const [tables, setTables] = useState([])
  const [tablesError, setTablesError] = useState(null)

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);

    listTables(abortController.signal)
      .then(setTables)
      .catch(setTablesError)
    return () => abortController.abort();
  }

  const listAllReservations = reservations.map(reservation => {
    return (
      <ReservationList reservation={reservation} key={reservation.reservation_id}/>
    )
  })

  const listAllTables = tables.map(table => {
    return (
      <TableList table={table} key={table.table_id}/>
    )
  })

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {date}</h4>
      </div>
      <div className="d-flex">
          <button className="btn btn-danger" onClick={() => history.push(`?date=${previous(date)}`)}>Previous</button>
          <button className="btn btn-primary" onClick={() => history.push(`?date=${today(date)}`)}>Today</button>
          <button className="btn btn-secondary" onClick={() => history.push(`?date=${next(date)}`)}>Next</button>
      </div>
      <ErrorAlert error={reservationsError} />
      <ErrorAlert error={tablesError} />
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Mobile</th>
            <th scope="col">Date</th>
            <th scope="col">Time</th>
            <th scope="col">Party Size</th>
            <th scope="col">Seat Table</th>
          </tr>
        </thead>
        <tbody>
          {listAllReservations}
        </tbody>
      </table>
      <br />
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Number</th>
            <th>Table Capacity</th>
            <th>Availability</th>
            <th>Meal Status</th>
          </tr>
        </thead>
        <tbody>
          {listAllTables}
        </tbody>
      </table>
    </main>
  );


}

export default Dashboard;
