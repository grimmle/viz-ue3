import React from 'react';
import { Scatter } from 'react-chartjs-2';

export default function ScatterChart(props) {
    let xL = props.xLabel
    let yL = props.yLabel
    if (!props.data) return null;
    return(
        <div className="chart-container">
            <Scatter
                options = {{
                    legend: {
                        position: 'bottom',
                    },
                    scales: {
                        yAxes: [{
                            scaleLabel: {
                                display: true,
                                fontSize: 14,
                                labelString: yL
                            }
                        }],
                        xAxes: [{
                            scaleLabel: {
                                display: true,
                                fontSize: 14,
                                labelString: xL
                            }
                        }],
                    },
                    onClick: function(event, arr) {
                        if(arr.length > 0) {
                            let el = props.extra[arr[0]._chart.tooltip._data.datasets[arr[0]._datasetIndex].label][arr[0]._index]
                            let values = [el[2], el[3], el[4], el[5], el[6], el[7], el[8]]
                            //props.onRadarDataChanged({ label: el[1], data: values })
                        }
                       
                    },
                    tooltips: {
                        position: 'nearest',
                        callbacks: {
                            title: function (t, d) {
                                return props.extra[d.datasets[t[0].datasetIndex].label][t[0].index][1] + " " + props.extra[d.datasets[t[0].datasetIndex].label][t[0].index][0];
                            },
                            beforeBody: function (t, d) {
                                let el = props.extra[d.datasets[t[0].datasetIndex].label][t[0].index]
                                let info = "Herkunft: " + el[9] + "\nVerbrauch: " + el[2] + "km/l" + "\nZylinder: " + el[3] + "\nHubraum: "  + el[4] + "ccm" + "\nPferdestärken: " + el[5] + "\nGewicht: " + el[6] + "kg" + "\nBeschleunigung: " + el[7]  + "s (0-60mph)" + "\nBaujahr: " + el[8]
                                return info;
                            }
                        }
                    },
                    responsive: true, 
                    maintainAspectRatio: false,
                }}
                data = {props.data}
            />
        </div>
    )
}
