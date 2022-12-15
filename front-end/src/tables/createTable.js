import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { createTable } from '../utils/api'
import TableForm from './tableForm'

function CreateTable() {
    const history = useHistory()

    const initialFormState = {
        table_name: "",
        capacity: ""
    }

    const [formData, setFormData] = useState({...initialFormState})

    const changeHandler = ({ target }) => {
        setFormData({
            ...formData,
            [target.name]: target.value,
        })
    }

    const submitHandler = async (event) => {
        event.preventDefault()
        await createTable(formData)
        setFormData({...initialFormState})
        history.push("/")
    }

    return (
        <section>
            <h2 className="d-flex">Create a Table:</h2>
            <TableForm
                formData={formData}
                changeHandler={changeHandler}
                submitHandler={submitHandler}
            />
        </section>
    )
}

export default CreateTable