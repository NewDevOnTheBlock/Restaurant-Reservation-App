import React from 'react'

function ReservationList({ reservations }) {
    const listAllReservations = reservations.map((reservation, index) => {
        return (
          <section key={index} className="card" style={{margin: "8px", padding: "8px"}}>
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
        <article>
            {listAllReservations}
        </article>
    )
}

export default ReservationList