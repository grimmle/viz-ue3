import React from 'react';
import { Scatter } from 'react-chartjs-2';

export default function Chart(props) {
    if (props.data === []) return null;
    return(
        <div className="chart-container">
            <Scatter
                options = {{
                    tooltips: {
                        callbacks: {
                            title: function (t, d) {
                                // Herkunft console.log(d.datasets[t[0].datasetIndex].label)
                                // Model console.log(props.extra[d.datasets[t[0].datasetIndex].label][t[0].index][0])
                                return props.extra[d.datasets[t[0].datasetIndex].label][t[0].index][1] + " " + props.extra[d.datasets[t[0].datasetIndex].label][t[0].index][0]; //return a string that you wish to append
                            }
                        }
                    },
                    responsive: true
                }}
                data = {props.data}
            />
        </div>
    )
}
