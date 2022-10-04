import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";




export default function NewReading() {
    const [systolic, setSystolic] = useState('')
    const [diastolic, setDiastolic] = useState('')
    const [date, setDate] = useState(new Date())

    function handleSubmit(event) {
        event.preventDefault()
        console.log(systolic)
        console.log(diastolic)
        console.log(date)

    }


    return (
        <div className="new-reading-form">
            <h2 className='new-reading-text'>Enter a New Blood Pressure Reading</h2>
            {/* {error && <div className='error'>{error}</div>} */}
            <form id="bloodpressure-form" onSubmit={handleSubmit}>
                <div className="form-controls">
                    <label htmlFor="systolic-field">Systolic (upper number)&ensp;</label>
                    <input id="systolic-field" type="text" onChange={(e) => setSystolic(e.target.value)} />
                </div>
                <div className="form-controls">
                    <label htmlFor="diastolic-field">Diastolic (lower number)&ensp;</label>
                    <input id="diastolic-field" type="text" onChange={(e) => setDiastolic(e.target.value)} />
                </div>
                <p className="form-controls">Enter a date and time OR use current:</p>
                <DatePicker
      selected={date}
      onChange={(date) => setDate(date)}
      showTimeSelect
      timeFormat="HH:mm"
      timeIntervals={15}
      timeCaption="time"
      dateFormat="MMMM d, yyyy h:mm aa"
      className='date-picker'
    
    />
                <div className="form-submit">
                    <input id="submit" type="submit" value="Submit" />
                </div>
            </form>
        </div>
    )
}