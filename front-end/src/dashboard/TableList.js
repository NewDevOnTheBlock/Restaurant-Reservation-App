import React from 'react'
import { finishTable, finishStatus } from '../utils/api'

function TableList({ table, loadDashboard }) {
    const {
        table_id,
        table_name,
        capacity,
        reservation_id,
    } = table


    const finishHandler = async (table_id) => {
        console.log("finish handler called")
        const confirmBox = window.confirm(
            "Is this table ready to seat new guests? This cannot be undone."
        );
        console.log("clicked okay")
        if (confirmBox === true) {
            try {
                await finishStatus(reservation_id)
                console.log("Finish status done")
                await finishTable(table_id)
                console.log("about to call loadDashboard")
                console.log(loadDashboard)
                await loadDashboard()
            } catch (error) {
                console.log(error)
            }
        }
        return null;
    }

    return (
        <tr>
            <td>{table_id}</td>
            <td>{table_name}</td>
            <td>{capacity}</td>
            <td data-table-id-status={`${reservation_id}`}>
                {reservation_id ? "Occupied" : "Free"}
            </td>
            {reservation_id ? <td data-table-id-finish={table_id}>
                <button onClick={() => finishHandler(table_id)} className="btn btn-warning">Finish</button>
            </td> :
            null}
        </tr>
    )
}

export default TableList