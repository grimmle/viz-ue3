import React, { useState, useEffect } from 'react';
import './App.css';
import Chart from './Chart';
import { Dropdown } from 'semantic-ui-react'


async function loadCSV() {
  const res = await fetch("./cars.csv");
  let data = await res.text();
  return data;
}

export const CATEGORIES = {
  'consumption': 2,
  'cylinders': 3,
  'displacement': 4,
  'horsepower': 5,
  'weight': 6,
  'acceleration': 7,
  'year': 8
}

export const ORIGINS = ['American', 'European', 'Japanese'];

export const MANUFACTURERS = ['chevrolet', 'buick', 'plymouth', 'amc', 'ford', 'pontiac', 'citroen', 'dodge', 'toyota', 'datsun', 'vw', 'peugeot', 'audi', 'saab', 'bmw', 'hi', 'mercury', 'fiat', 'oldsmobile', 'chrysler', 'mazda', 'volvo', 'renault', 'honda', 'subaru', 'capri', 'mercedes', 'cadillac', 'triumph', 'nissan'];


let axisOptions = []
for (var key in CATEGORIES) {
  if (CATEGORIES.hasOwnProperty(key)) {
    var obj = {};
    obj.key = key
    obj.text = key
    obj.value = key
    axisOptions.push(obj);
  }
}

let originsOptions = []
ORIGINS.forEach(function(value) {
  var obj = {};
  obj.key = value
  obj.text = value
  obj.value = value    
  originsOptions.push(obj);
})

let manufacturersOptions = []
MANUFACTURERS.forEach(function(value) {
  var obj = {};
  obj.key = value
  obj.text = value
  obj.value = value    
  manufacturersOptions.push(obj);
})


function getDataSets(data, x, y, o, m) {
  console.log(m)
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
      if(line[9].trim() === "American") {
        if(m.includes(line[1].trim())) {
          america.data.push(obj)
        }
      }
      else if(line[9].trim() === "European") {
        if(m.includes(line[1].trim())) {
          europe.data.push(obj)
        }
      }
      else if(line[9].trim() === "Japanese") {
        if(m.includes(line[1].trim())) {
          japan.data.push(obj)
        }
      }
  });
  let set = []
  if (o.includes('American')) set.push(america)
  if (o.includes('European')) set.push(europe)
  if (o.includes('Japanese')) set.push(japan)
  return set;
}

function update(data, o) {
  let manus = [];
  data.split('\n').map(function (l) {
    let line = l.split(';')
    if(o.includes(line[9].trim())) {
        if(!manus.includes(line[1].trim())) manus.push(line[1].trim())
    }
  })
  return manus;
}

function App() {
  const [x, setX] = useState("weight");
  const [y, setY] = useState("horsepower");
  const [origins, setOrigins] = useState(ORIGINS);
  const [manufacturers, setManufacturers] = useState(MANUFACTURERS);
  const [data, setData] = useState({});
  
  const handleSelect = (e, {value}, key) => {
    console.log(key, value)
    if (key == "x") setX(value)
    else if (key == "y") setY(value)
    else if (key == "origins") setOrigins(value)
    else if (key == "manufacturers") setManufacturers(value)
  }

  useEffect(() => {
    loadCSV().then((csv) => {
      let DATA = getDataSets(csv, CATEGORIES[x], CATEGORIES[y], origins, manufacturers)

      setData({
          datasets: DATA
      })
    });
  }, [x, y, manufacturers]);

  useEffect(() => {
    loadCSV().then((csv) => {
      let MANUS = update(csv, origins)
      console.log(MANUS)
      setManufacturers(MANUS)
    })
  }, [origins]);

  return (
    <div className="content">
      <h1>Vizualization UE3</h1>
      <Dropdown placeholder='Origin' onChange={(e, { value }) => handleSelect(e, { value }, 'origins')} fluid multiple selection options={originsOptions} value={origins}/>
      <Dropdown placeholder='Manufacturer' onChange={(e, { value }) => handleSelect(e, { value }, 'manufacturers')} fluid multiple selection options={manufacturersOptions} value={manufacturers}/>
      <Dropdown placeholder='X Axis' onChange={(e, { value }) => handleSelect(e, { value }, 'x')} fluid selection options={axisOptions} value={x}/>
      <Dropdown placeholder='Y Axis' onChange={(e, { value }) => handleSelect(e, { value }, 'y')} fluid selection options={axisOptions} value={y}/>
      <Chart data={data}/>
    </div>
  );
}

export default App;
