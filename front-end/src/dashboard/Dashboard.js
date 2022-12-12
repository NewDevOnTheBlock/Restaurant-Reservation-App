import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { useHistory } from "react-router-dom";

import ReservationList from "./ReservationList";
import { previous, today, next } from "../utils/date-time";
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

  const history = useHistory()
  const now = today()
  const yesterday = previous(today())
  const tomorrow = next(today())
  
  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date</h4>
      </div>
      <div className="d-flex">
          <button 
            className="btn btn-danger" 
            onClick={() => history.go(`/reservations?date=${yesterday}`)}>
              Yesterday
          </button>

          <button 
            className="btn btn-primary" 
            onClick={() => history.push(`/reservations?date=${now}`)}>
              Today
          </button>

          <button 
            className="btn btn-secondary" 
            onClick={() => history.push(`/reservations?date=${tomorrow}`)}>
              Tomorrow
          </button>
      </div>
      <ErrorAlert error={reservationsError} />
      <ReservationList reservations={reservations}/>
    </main>
  );
}

export default Dashboard;
