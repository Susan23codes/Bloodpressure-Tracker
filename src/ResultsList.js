import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import axios from "axios";
import moment from 'moment';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

export default function ResultsList(props) {
    const { token } = props

    const [rowData, setRowData] = useState();
    const [columnDefs, setColumnDefs] = useState([
        { field: 'Date', filter: true },
        { field: 'Systolic', filter: true },
        { field: 'Diastolic', filter: true }
    ])

    const defaultColDef = useMemo(() => ({
        sortable: true
    })
    );

    const gridRef = useRef();
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);

    const onGridReady = useCallback((params) => {
        params.api.sizeColumnsToFit();
        window.addEventListener('resize', function () {
          setTimeout(function () {
            params.api.sizeColumnsToFit();
          });
        });
    
        gridRef.current.api.sizeColumnsToFit();
      }, []);
    

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/reading/',
            {
                headers: {
                    Authorization: `Token ${token}`,
                }
            },)
            .then(res => {
                let results = (res.data.sort((a, b) => new Date(b.reading_time) - new Date(a.reading_time)))
                console.log(results)
                let newRowData = results.map(resultObject => {
                    return {
                        Date: moment(resultObject['reading_time']).format('MM-DD-YY  (HH:MM)'),
                        Diastolic: resultObject['diastolic'],
                        Systolic: resultObject['systolic']
                    }
                })
                setRowData(newRowData)

            })
    }, [])

    return (
        <>
            <h1 style={{ textAlign: 'center' }}>Readings</h1>
            <div style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
            <div style={{ overflow: 'hidden', flexGrow: '1' }}>
            <div style={{gridStyle}} className="ag-theme-alpine">

                <AgGridReact

                    rowData={rowData}// Row Data for Rows
                    ref={gridRef}
                    columnDefs={columnDefs} // Column Defs for Columns
                    defaultColDef={defaultColDef} // Default Column Properties
                    onGridReady={onGridReady}
                    animateRows={true} // Optional - set to 'true' to have rows animate when sorted
                    rowSelection='multiple' // Options - allows click selection of rows

                //    onCellClicked={cellClickedListener} // Optional - registering for Grid Event
                />
            </div>
            </div>
            </div>

        </>
    )
}