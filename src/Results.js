import axios from "axios"
import moment from 'moment'
import { Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import { RotatingLines } from 'react-loader-spinner'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';



ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels
);




export default function Results(props) {
    const { token } = props

    const [resultsList, setResultsList] = useState([])
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [gettingResults, setGettingResults] = useState(false)

    function detectWidth() {
        setWindowWidth(window.innerWidth)
    }

    useEffect(() => {
        window.addEventListener('resize', detectWidth)
        return () => {
            window.removeEventListener('resize', detectWidth)
        }
    }, [windowWidth])


    const verticalOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            datalabels: {
                color: 'black'
            },
            title: {
                display: true,
                text: 'Recent Readings Bar Chart',
            },
        },
    };

    const horizontalOptions = {
        responsive: true,
        indexAxis: 'y',
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            datalabels: {
                color: 'black'
            },
            title: {
                display: true,
                text: 'Recent Readings Bar Chart',
            },
        },
    };


    const lineOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                grace: '10%'
            }
        },
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Recent Readings Line Chart',
            },
        },
    };




    useEffect(() => {
        setGettingResults(true)
        axios.get('https://blood-pressure-tracker.onrender.com/api/reading/',
            {
                headers: {
                    Authorization: `Token ${token}`,
                }
            },)
            .then(res => {
                let results = (res.data.sort((a, b) => new Date(b.reading_time) - new Date(a.reading_time)))
                setResultsList(results.reverse())
                setGettingResults(false)
                console.log(results)
            })
    }, [])

    const data = {
        labels: resultsList && resultsList.slice(0, 10).map((resultObject) => moment(resultObject.reading_time).format('MM-DD-YY  (HH:mm)')),
        datasets: [
            {
                label: 'Systolic',
                data: resultsList && resultsList.map((resultObject) => resultObject.systolic),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Diastolic',
                data: resultsList && resultsList.map((resultObject) => resultObject.diastolic),
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    const lineData = {
        labels: resultsList && resultsList.slice(0, 15).map((resultObject) => moment(resultObject.reading_time).format('MM-DD-YY  (HH:mm)')),
        datasets: [
            {
                label: 'Systolic',
                data: resultsList && resultsList.map((resultObject) => resultObject.systolic),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Diastolic',
                data: resultsList && resultsList.map((resultObject) => resultObject.diastolic),
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                borderColor: 'rgb(53, 162, 235)',
            },
        ],
    };



    return (
        <>

            <div className="bar-and-readings">
                <div className="bar-chart">
                    {gettingResults ? (
                        <div className='loader'>
                            <RotatingLines
                                strokeColor="grey"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="150"
                                visible={true}
                            />
                        </div>
                    ) : (
                        <>
                            {resultsList && resultsList.length > 0 && windowWidth > 600 &&
                                <Bar options={verticalOptions} data={data} />
                            }
                            {resultsList && resultsList.length > 0 && windowWidth < 600 &&
                                <Bar options={horizontalOptions} data={data} />
                            }
                            {!resultsList && resultsList.length === 0 &&
                                <p style={{ fontSize: '3rem', textAlign: 'center', color: '#c40a04' }}>
                                    Please input some readings to track your results!</p>
                            }
                        </>
                        )}
                </div>
            </div>
            <div className="line-chart">
                {resultsList.length > 0 &&
                    <Line options={lineOptions} data={lineData} />
                }
                {resultsList.length === 0 &&
                    ('')
                }
            </div>
            
        </>
    )
}