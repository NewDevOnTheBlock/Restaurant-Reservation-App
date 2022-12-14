import React, { useState } from 'react'
import { useHistory } from 'react-router'
import ReservationForm from './reservationForm'
import { createReservation } from '../utils/api'

function CreateReservation() {
    const history = useHistory()

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
        <section>
            <h2 className="d-flex">Create a Reservation:</h2>
            <ReservationForm 
                formData={formData}
                changeHandler={changeHandler}
                submitHandler={submitHandler}
            />
        </section>
    )
}

export default CreateReservation