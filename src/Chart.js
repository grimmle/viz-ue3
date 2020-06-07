import React, { useState, useEffect } from 'react';
import { Scatter } from 'react-chartjs-2';
import {CATEGORIES} from './App';

async function loadCSV() {
    const res = await fetch("./cars.csv");
    let data = await res.text();
    return data;
}

function getDataSets(data, x, y, origins) {
    let america = {
        label: "American",
        backgroundColor: "rgba(255, 0, 0, 1)",
        pointStyle: 'triangle',
        radius: '5',
        hoverRadius: '8',
        data : []
    }
    let europe = {
        label: "European",
        backgroundColor: "rgba(0, 255, 0, 1)",
        pointStyle: 'rect',
        radius: '5',
        hoverRadius: '8',
        data: []
    }
    let japan = {
        label: "Japanese",
        backgroundColor: "rgba(0, 0, 255, 1)",
        radius: '5',
        hoverRadius: '8',
        data: []
    }

    data.split('\n').map(function (l) {
        let line = l.split(';')
        let obj = {}
        obj.x = line[x];
        obj.y = line[y];
        switch(line[9].trim()) {
            case 'American': {
                america.data.push(obj);
                break
            }
            case 'European': {
                europe.data.push(obj);
                break
            }
            case 'Japanese': { 
                japan.data.push(obj);
                break
            }
            default: break
        }
    });
    let set = []
    if(origins.includes('america')) set.push(america)
    if (origins.includes('europe')) set.push(europe)
    if (origins.includes('japan')) set.push(japan)
    return set;
}

export default function Chart(props) {
    const [data, setData] = useState({});

    useEffect(() => {
        loadCSV().then((csv) => {
            let DATA = getDataSets(csv, CATEGORIES[props.x], CATEGORIES[props.y], props.origins)

            setData({
                datasets: DATA
            })
        });
    }, [props.x, props.y, props.origins]);
    
    if (data == []) return null;
    return(
        <Scatter 
            options = {{
                responsive: true
            }}
            data = {data}
        />
    )
}
