import React, { useState } from 'react'
import { useHistory } from 'react-router';
import { createReservation } from '../utils/api'

function ReservationForm() {
    const history = useHistory()

    function goHome() { 
        history.push("/")
    }

    const initialFormState = {
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: 1
    }

    const [formData, setFormData] = useState({...initialFormState})

    const changeHandler = ({ target }) => {
        setFormData({
            ...formData,
            [target.name]: target.value,
        });
    }

    const submitHandler = async (event) => {
        event.preventDefault()
        await createReservation(formData)
        setFormData({...initialFormState})
        history.push("/")
    }

    return (
        <form onSubmit={submitHandler} className="card">
            <label>
                First Name:
                <input
                    id="first_name"
                    type="text"
                    name="first_name"
                    placeholder={formData.first_name || "First Name"}
                    onChange={changeHandler}
                    value={formData.first_name}
                    required
                />
            </label>
            <label>
                Last Name:
                <input
                    id="last_name"
                    type="text"
                    name="last_name"
                    placeholder={formData.last_name || "Last Name"}
                    onChange={changeHandler}
                    value={formData.last_name}
                    required
                />
            </label>
            <label>
                Mobile Number:
                <input
                    id="mobile_number"
                    type="text"
                    name="mobile_number"
                    placeholder={formData.mobile_number || "Mobile Number"}
                    onChange={changeHandler}
                    value={formData.mobile_number}
                    required
                />
            </label>
            <label>
                Reservation Date:
                <input
                    id="reservation_date"
                    type="text"
                    name="reservation_date"
                    placeholder={formData.reservation_date || "reservation_date"}
                    onChange={changeHandler}
                    value={formData.reservation_date}
                    required
                />
            </label>
            <label>
                Reservation Time:
                <input
                    id="resrvation_time"
                    type="text"
                    name="reservation_time"
                    placeholder={formData.reservation_time || "reservation_time"}
                    onChange={changeHandler}
                    value={formData.reservation_time}
                    required
                />
            </label>
            <label>
                Party Size:
                <input
                    id="people"
                    type="text"
                    name="people"
                    placeholder={formData.people || "Party Size"}
                    onChange={changeHandler}
                    value={formData.people}
                    required
                />
            </label>
            <button type="button" className="btn btn-secondary" onClick={goHome}>Cancel</button>
            <button type="submit button" className="btn btn-primary">Submit</button>
        </form>
    )
}

export default ReservationForm