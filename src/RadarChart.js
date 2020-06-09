import React from 'react';
import { Radar } from 'react-chartjs-2';

export default function RadarChart(props) {
    if (!props.data) return null;
    return (
        <div className="chart-container">
            <Radar
                options={{
                    responsive: true
                }}
                data={props.data}
            />
        </div>
    )
}
