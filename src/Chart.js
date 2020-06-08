import React from 'react';
import { Scatter } from 'react-chartjs-2';

export default function Chart(props) {

    if (props.data === []) return null;
    return(
        <Scatter 
            options = {{
                responsive: true
            }}
            data = {props.data}
        />
    )
}
