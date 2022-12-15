import React from 'react'
import { useHistory } from 'react-router'

function TableForm({ formData, changeHandler, submitHandler }) {
    const history = useHistory()

    function goHome() {
        history.push("/")
    }

    return (
        <form onSubmit={submitHandler} className="card" style={{ padding: "24px" }}>
            <label htmlFor="table_name" className="d-flex flex-column">
                Table Name:
                <input 
                    id="table_name"
                    type="text"
                    name="table_name"
                    placeholder="Table Name"
                    onChange={changeHandler}
                    value={formData.table_name}
                    required
                    style={{ width: "300px" }}
                />
            </label>
            <br />
            <label htmlFor="capacity" className="d-flex flex-column">
                Table Capacity:
                <input 
                    id="capacity"
                    type="number"
                    min="1"
                    name="capacity"
                    placeholder="Table Capacity"
                    onChange={changeHandler}
                    value={formData.tableName}
                    required
                    style={{ width: "300px" }}
                />
            </label>
            <br />
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

export default TableForm