import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
*/

function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  const listAllReservations = reservations.map(reservation => {
    return (
      <section className="card" style={{margin: "8px", padding: "8px"}}>
        <div className="d-flex justify-content-between" style={{margin: "8px"}}>
          <h3>{reservation.first_name + " " + reservation.last_name}</h3>
          <h4>{reservation.reservation_id}</h4>
        </div>
        <p style={{margin: "8px"}}>Mobile: {reservation.mobile_number}</p>
        <div className="d-flex">
          <p style={{margin: "8px"}}>Date: {reservation.reservation_date}</p>
          <p style={{margin: "8px"}}>time: {reservation.reservation_time}</p>
          <p style={{margin: "8px"}}>Party Size: {reservation.people}</p>
        </div>
      </section>
    )
  })

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      {listAllReservations}
    </main>
  );
}

export default Dashboard;
