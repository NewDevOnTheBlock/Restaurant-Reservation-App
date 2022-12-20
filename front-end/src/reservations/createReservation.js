import React, { useState } from 'react'
import { useHistory } from 'react-router'
import ReservationForm from './reservationForm'
import { createReservation } from '../utils/api'
import ErrorAlert from '../layout/ErrorAlert'

function CreateReservation() {
    const history = useHistory()

    const initialFormState = {
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: 1,
        status: "booked"
    }

    const [formData, setFormData] = useState({...initialFormState})
    const [formError, setFormError] = useState(null)
    const changeHandler = ({ target }) => {
        setFormData({
            ...formData,
            [target.name]: target.value,
        });
    }

    const submitHandler = async (event) => {
        event.preventDefault()
        try {
            await createReservation({
                ...formData,
                people: Number(formData.people)
            })
            setFormData({...initialFormState})
            history.push("/")
        } catch(error) {
            setFormError(error)
        }
    }

    return (
        <section>
            <h2 className="d-flex">Create a Reservation:</h2>
            <ErrorAlert error={formError} />
            <ReservationForm 
                formData={formData}
                changeHandler={changeHandler}
                submitHandler={submitHandler}
            />
        </section>
    )
}

export default CreateReservation