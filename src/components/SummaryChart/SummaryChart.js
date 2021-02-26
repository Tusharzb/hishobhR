import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Chart from 'chart.js';
import './SummaryChart.style.scss';



const SummaryChart = ({ chartData }) => {

    useEffect(() => {
        const data = chartData;
        const Chartlabel = data.map(i => i._id);
        const totalwithdraw = data.map(i => i.totalwithdraw);
        var ctx = document.getElementById('myChart');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Chartlabel,
                datasets: [{
                    label: 'Money spent',
                    data: totalwithdraw,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1,
                    barThickness: "flex"
                }]
            },
            options: {
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }, []);

    return (
        <div className="chart-container">
            <canvas id="myChart" ></canvas>
        </div>
    );
};


SummaryChart.PropTypes = {
    chartData: PropTypes.array
};


export default SummaryChart;
