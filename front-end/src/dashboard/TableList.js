import React from 'react'
import { finishTable } from '../utils/api'

function TableList({ table, loadDashboard }) {
    const {
        table_id,
        table_name,
        capacity,
        reservation_id,
    } = table

    const finishHandler = async (table_id) => {
        const confirmBox = window.confirm(
            "Is this table ready to seat new guests? This cannot be undone."
        );
        if (confirmBox === true) {
            finishTable(table_id)
                .then(loadDashboard)
                .catch((error) => console.log(error));
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
            <td data-table-id-finish={table_id}>
                <button onClick={() => finishHandler(table_id)} className="btn btn-warning">Finish</button>
            </td>
        </tr>
    )
}

export default TableList