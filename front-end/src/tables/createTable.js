import React, { useState } from 'react'
import { useHistory } from 'react-router'
import ErrorAlert from '../layout/ErrorAlert'
import { createTable } from '../utils/api'
import TableForm from './tableForm'

function CreateTable() {
    const history = useHistory()

    const initialFormState = {
        table_name: "",
        capacity: ""
    }

    const [formData, setFormData] = useState({...initialFormState})
    const [formError, setFormError] = useState(null)

    const changeHandler = ({ target }) => {
        setFormData({
            ...formData,
            [target.name]: target.value,
        })
    }

    const submitHandler = async (event) => {
        event.preventDefault()
        try {
            await createTable({
                ...formData,
                capacity: Number(formData.capacity)
            })
            setFormData({...initialFormState})
            history.push("/")
        } catch (error) {
            setFormError(error)
        }
    }

    return (
        <section>
            <h2 className="d-flex">Create a Table:</h2>
            <ErrorAlert error={formError} />
            <TableForm
                formData={formData}
                changeHandler={changeHandler}
                submitHandler={submitHandler}
            />
        </section>
    )
}

export default CreateTable