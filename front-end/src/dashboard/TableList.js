import React from 'react'

function TableList({ table }) {
    const {
        table_id,
        table_name,
        capacity,
        reservation_id,
    } = table

    return (
        <tr>
            <td>{table_id}</td>
            <td>{table_name}</td>
            <td>{capacity}</td>
            <td data-table-id-status={`${reservation_id}`}>
                {reservation_id ? "Occupied" : "Free"}
            </td>
            <td data-table-id-finish={table_id}>
                <button className="btn btn-warning">Finish</button>
            </td>
        </tr>
    )
}

export default TableList