import axios from "axios"
import moment from 'moment'
import React, { useState, useEffect } from 'react';
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
import { formatMuiErrorMessage } from "@mui/utils";
import { flexbox } from "@mui/system";

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

    const [resultsList, setResultsList] = useState(null)

    const options = {
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
                text: 'Most Recent Readings',
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
                text: 'Chart.js Line Chart',
            },
        },
    };


    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/reading/',
            {
                headers: {
                    Authorization: `Token ${token}`,
                }
            },)
            .then(res => {
                let results = (res.data.sort((a, b) => new Date(b.reading_time) - new Date(a.reading_time)))
                setResultsList(results)
                console.log(results)
            })
    }, [])

    const data = {
        labels: resultsList && resultsList.slice(0, 7).map((resultObject) => moment(resultObject.reading_time).format('MM-DD-YY  HH:MM')),
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
        labels: resultsList && resultsList.map((resultObject) => moment(resultObject.reading_time).format('MM-DD-YY  HH:MM')),
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

    // const dataAverage = resultsList && resultsList.filter((resultObject) =>
    //      moment(resultObject.reading_time).format('MM') === 10)
    //      console.log(dataAverage)



    return (
        <>
            {/* {resultsList &&
        resultsList.slice(0,7).map((resultObject, index) => {
            return resultObject.systolic
            
        })} */}
            <div className="bar-chart">
                <Bar options={options} data={data} />
            </div>
            <div className="line-chart">
                <Line options={lineOptions} data={lineData} />
            </div>
        </>
    )
}