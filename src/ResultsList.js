import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import axios from "axios";
import moment from 'moment';
import Select from 'react-select'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

export default function ResultsList(props) {
    const { token } = props

    const [selectedSystolicAverage, setSelectedSystolicAverage] = useState('')
    const [selectedDiastolicAverage, setSelectedDiastolicAverage] = useState('')

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


    function Average7() {
        console.log('average7 works')
    }


    const selectOptions = [

        { value: 7, label: "7-Day Average" },
        { value: 14, label: "14-Day Average" },
        { value: 21, label: "21-Day Average" },
        { value: 28, label: "28-Day Average" }
    ]

    function handleChange(data) {

        let systolicReadings = rowData.slice(0, data.value).map((rowObject) => rowObject.Systolic)
        console.log(systolicReadings)

        let systolicSum = 0
        for (let value of systolicReadings) {
            systolicSum += value
        }
        console.log(systolicSum)
        let systolicAverage = systolicSum / systolicReadings.length
        console.log(systolicAverage)
        setSelectedSystolicAverage(systolicAverage.toFixed(2))

        let diastolicReadings = rowData.slice(0, data.value).map((rowObject) => rowObject.Diastolic)
        console.log(diastolicReadings)
        let diastolicSum = 0
        for (let value of diastolicReadings) {
            diastolicSum += value
        }
        console.log(diastolicSum)
        let diastolicAverage = diastolicSum / diastolicReadings.length
        console.log(diastolicAverage)
        setSelectedDiastolicAverage(diastolicAverage.toFixed(2))

    }

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
                console.log(newRowData)
                setRowData(newRowData)

            })
    }, [token])

    return (
        <>
            <div className="select-dropdown">
                <Select
                    options={selectOptions}
                    placeholder="Select an Average"
                    onChange={handleChange}
                />
                <div className='average-readings'>
                    {selectedSystolicAverage &&
                    <>
                    <p>Systolic: {selectedSystolicAverage}</p>
                    <p>Diastolic: {selectedDiastolicAverage}</p>
                    </>
                    }
                </div>
            </div>
            <h1 style={{ textAlign: 'center' }}>All Readings</h1>
            <div style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
                <div style={{ overflow: 'hidden', flexGrow: '1' }}>
                    <div style={{ gridStyle }} className="ag-theme-alpine">

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