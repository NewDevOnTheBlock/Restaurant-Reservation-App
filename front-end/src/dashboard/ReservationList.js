import React from "react";
import { Link } from "react-router-dom";

function ReservationList({ reservation }) {
  const {
    reservation_id,
    first_name,
    last_name,
    mobile_number,
    reservation_date,
    reservation_time,
    people
  } = reservation

  return (
    <tr>
      <td>{reservation_id}</td>
      <td>
        {last_name}, {first_name}
      </td>
      <td>{mobile_number}</td>
      <td>{reservation_date}</td>
      <td>{reservation_time}</td>
      <td>{people}</td>
      <td>
        <a 
          href={`/reservations/${reservation_id}/seat`}
        >
          <button type="button" className="btn btn-primary">Seat</button>
        </a>
      </td>
    </tr>
  );
}

export default ReservationList;
