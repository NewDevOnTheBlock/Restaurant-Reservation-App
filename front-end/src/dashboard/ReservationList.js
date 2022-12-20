import React from "react";

function ReservationList({ reservation }) {
  const {
    reservation_id,
    first_name,
    last_name,
    mobile_number,
    reservation_date,
    reservation_time,
    people,
    status
  } = reservation

  if (status === "finished") {
    return null
  } else {
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
        <td data-reservation-id-status={reservation_id}>{status}</td>
        <td>
          {status === "booked" ? 
          <a href={`/reservations/${reservation_id}/seat`}>
            <button type="button" className="btn btn-primary">Seat</button>
          </a> :
          null}
        </td>
      </tr>
    );
  }

}

export default ReservationList;
