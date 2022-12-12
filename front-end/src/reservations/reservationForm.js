import React from 'react'
import { useHistory } from 'react-router';


function ReservationForm({ formData, changeHandler, submitHandler }) {
    const history = useHistory()

    function goHome() { 
        history.push("/")
    }

    return (
        <form onSubmit={submitHandler} className="card" style={{padding: "24px"}}>
            <label htmlFor="first_name" >
                First Name:
                <input
                    id="first_name"
                    type="text"
                    name="first_name"
                    placeholder={formData.first_name || "First Name"}
                    onChange={changeHandler}
                    value={formData.first_name}
                    required
                    style={{width: "200px", marginLeft: "12px"}}
                />
            </label>
            <label htmlFor="last_name" className="d-flex flex-column">
                Last Name:
                <input
                    id="last_name"
                    type="text"
                    name="last_name"
                    placeholder={formData.last_name || "Last Name"}
                    onChange={changeHandler}
                    value={formData.last_name}
                    required
                    style={{width: "200px"}}
                />
            </label>
            <label htmlFor="mobile_number" className="d-flex flex-column">
                Mobile Number:
                <input
                    id="mobile_number"
                    type="text"
                    name="mobile_number"
                    placeholder={formData.mobile_number || "(xxx) xxx-xxxx"}
                    onChange={changeHandler}
                    value={formData.mobile_number}
                    required
                    style={{width: "200px"}}
                />
            </label>
            <label htmlFor="reservation_date" className="d-flex flex-column">
                Reservation Date:
                <input
                    id="reservation_date"
                    type="date"
                    name="reservation_date"
                    placeholder={formData.reservation_date || "yyyy/mm/dd"}
                    onChange={changeHandler}
                    value={formData.reservation_date}
                    required
                    style={{width: "200px"}}
                />
            </label>
            <label htmlFor="reservation_time" className="d-flex flex-column">
                Reservation Time:
                <input
                    id="reservation_time"
                    type="time"
                    name="reservation_time"
                    placeholder={formData.reservation_time || "Reservation Time"}
                    onChange={changeHandler}
                    value={formData.reservation_time}
                    required
                    style={{width: "200px"}}
                />
            </label>
            <label htmlFor="people" className="d-flex flex-column">
                Party Size:
                <input
                    id="people"
                    type="number"
                    name="people"
                    placeholder={formData.people || "Party Size"}
                    onChange={changeHandler}
                    value={formData.people}
                    required
                    style={{width: "200px"}}
                />
            </label>
            <div className="d-flex" style={{margin: "12px"}}>
                <button 
                    type="button" 
                    className="btn btn-secondary" 
                    style={{marginRight: "12px"}}
                    onClick={goHome}>
                        Cancel
                </button>
                <button 
                    type="submit button" 
                    className="btn btn-primary"
                    style={{marginLeft: "12px"}}>
                        Submit
                </button>
            </div>
            
        </form>
    )
}

export default ReservationForm