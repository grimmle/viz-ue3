import React, { useState, useEffect } from 'react';
import { Scatter } from 'react-chartjs-2';
import {CATEGORIES} from './App';

export default function Chart(props) {

    if (props.data == []) return null;
    return(
        <Scatter 
            options = {{
                responsive: true
            }}
            data = {props.data}
        />
    )
}
