import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment'
import axios from "axios"
import { Navigate } from 'react-router-dom';




export default function NewReading(props) {
    const { token, navigate } = props

    const [systolic, setSystolic] = useState('')
    const [diastolic, setDiastolic] = useState('')
    const [readingTime, setReading_time] = useState(new Date())
    const [error, setError] = useState(null)
    const [submitComplete, setSubmitComplete] = useState(false)
    const [submitClicked, setSubmitClicked] = useState(false)


    function handleSubmit(event) {
        setSubmitClicked(true)
        event.preventDefault()
        console.log(systolic)
        console.log(diastolic)
        console.log(moment(readingTime).format('YYYY-MM-DDTHH:mm:ss.sssZ'))

        setError(null)
        axios.post('http://127.0.0.1:8000/api/reading/',
            {
                systolic: systolic,
                diastolic: diastolic,
                reading_time: readingTime,
            },
            {
                headers: {
                    Authorization: `Token ${token}`
                },
            })
            .then((res) => {
                setSubmitComplete(true)
                setSystolic('')
                setDiastolic('')
                setReading_time(new Date())
                setTimeout(() => {
                    navigate('/results')
                  }, 3000)

            })
            .catch((error) => {
                setError(error.message)
            })

    }


    return (
        <div className="new-reading-form">
            <h2 className='new-reading-text'>Enter a New Blood Pressure Reading</h2>
            {/* {error && <div className='error'>{error}</div>} */}
            <form id="bloodpressure-form" onSubmit={handleSubmit}>
                <div className="form-controls">
                    <label htmlFor="systolic-field">Systolic (upper number)&ensp;</label>
                    <input id="systolic-field" type="text" onChange={(e) => setSystolic(e.target.value)} value={systolic} />
                </div>
                <div className="form-controls">
                    <label htmlFor="diastolic-field">Diastolic (lower number)&ensp;</label>
                    <input id="diastolic-field" type="text" onChange={(e) => setDiastolic(e.target.value)} value={diastolic} />
                </div>
                <p className="form-controls">Enter a date and time OR use current:</p>
                <DatePicker
                    selected={readingTime}
                    onChange={(readingTime) => setReading_time(readingTime)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="time"
                    dateFormat="MMMM d, yyyy h:mm aa"
                    className='date-picker'

                />
                    <div className="form-submit">
                        {submitComplete ? (
                            <>
                            <div className='submission-message'>
                                <div>Submission Complete!</div>
                                <img src="/singleloopcheck.gif" className="checkGif" alt="gifImage" height="120"  ></img>
                            </div>
                            <div>Redirecting....</div>
                            </>
                        ) : (
                            <input style={{ color: "white", backgroundColor: "rgb(69, 118, 175)" }} id="submit" type="submit" value="Submit" />
                        )
                        }
                    </div>
            </form>
        </div>
    )
}