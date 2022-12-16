import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import ErrorAlert from '../layout/ErrorAlert'
import { listTables } from '../utils/api'

function SeatTable() {
    const history = useHistory()
    const { reservation_id } = useParams()
    const reservationId = Number(reservation_id)

    const [tables, setTables] = useState([])
    const [updateTableError, setUpdateTableError] = useState(null)

    useEffect(loadTables, [reservationId])

    function loadTables() {
        const abortController = new AbortController()
        setUpdateTableError(null)
        listTables(abortController.signal)
            .then(setTables)
            .catch(setUpdateTableError)
        return () => abortController.abort()
    }

    const selectOptions = tables.map(table => {
        return (
            <option key={table.table_id} value={table.table_id}>
                {table.table_name} - {table.capacity}
            </option>
        )
    })

    return (
        <section>
            <h2>Seat a Table</h2>
            <ErrorAlert error={updateTableError}/>
            <form>
                <select
                    name="table_id"
                    required
                    
                >
                    <option defaultValue={0}>--Select--</option>
                    {selectOptions}
                </select>
                <button 
                    type="button" 
                    className="btn btn-danger" 
                    onClick={() => history.goBack()}
                >
                    Cancel
                </button>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </section>
    )
}

export default SeatTable