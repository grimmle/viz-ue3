import React, { useState, useEffect } from 'react';
import './App.css';
import Chart from './Chart';
import { Button } from 'react-bootstrap';
import { Dropdown } from 'semantic-ui-react'

export const CATEGORIES = {
  'consumption': 2,
  'cylinders': 3,
  'displacement': 4,
  'horsepower': 5,
  'weight': 6,
  'acceleration': 7,
  'year': 8
}

export const ORIGIN = {
  'america': 0,
  'europe': 1,
  'japan': 2
}

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

let originsOptions = [
  { key: 'america', text:'america', value:'america'},
  { key: 'europe', text: 'europe', value: 'europe' },
  { key: 'japan', text: 'japan', value: 'japan' }
]

function App() {
  const [x, setX] = useState("weight");
  const [y, setY] = useState("horsepower");
  //let origins = ["america", "europe", "japan"];
  const [origins, setOrigins] = useState(["america", "europe", "japan"]);
  
  const handleSelect = (e, {value}, axis) => {
    if (axis === "x") setX(value)
    else if (axis === "y") setY(value)
  }

  const handleOrigins = (e, {value}) => {
    console.log(value)
    setOrigins(value)
    console.log(origins)
  }
  return (
    <div className="content">
      <h1>Vizualization UE3</h1>
      <Dropdown placeholder='Origin' onChange={(e, { value }) => handleOrigins(e, { value })} fluid multiple selection options={originsOptions} defaultValue={origins}/>
      <Dropdown placeholder='X Axis' onChange={(e, { value }) => handleSelect(e, { value }, 'x')} fluid selection options={axisOptions} value={x}/>
      <Dropdown placeholder='Y Axis' onChange={(e, { value }) => handleSelect(e, { value }, 'y')} fluid selection options={axisOptions} value={y}/>

      {/* <Dropdown onSelect={(e) => handleSelect(e, "x")}>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          { x }
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item eventKey="0">{Object.keys(CATEGORIES)[0]}</Dropdown.Item>
          <Dropdown.Item eventKey="1">{Object.keys(CATEGORIES)[1]}</Dropdown.Item>
          <Dropdown.Item eventKey="2">{Object.keys(CATEGORIES)[2]}</Dropdown.Item>
          <Dropdown.Item eventKey="3">{Object.keys(CATEGORIES)[3]}</Dropdown.Item>
          <Dropdown.Item eventKey="4">{Object.keys(CATEGORIES)[4]}</Dropdown.Item>
          <Dropdown.Item eventKey="5">{Object.keys(CATEGORIES)[5]}</Dropdown.Item>
          <Dropdown.Item eventKey="6">{Object.keys(CATEGORIES)[6]}</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Dropdown onSelect={(e) => handleSelect(e, "y")}>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          { y }
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item eventKey="0">{Object.keys(CATEGORIES)[0]}</Dropdown.Item>
          <Dropdown.Item eventKey="1">{Object.keys(CATEGORIES)[1]}</Dropdown.Item>
          <Dropdown.Item eventKey="2">{Object.keys(CATEGORIES)[2]}</Dropdown.Item>
          <Dropdown.Item eventKey="3">{Object.keys(CATEGORIES)[3]}</Dropdown.Item>
          <Dropdown.Item eventKey="4">{Object.keys(CATEGORIES)[4]}</Dropdown.Item>
          <Dropdown.Item eventKey="5">{Object.keys(CATEGORIES)[5]}</Dropdown.Item>
          <Dropdown.Item eventKey="6">{Object.keys(CATEGORIES)[6]}</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown> */}
      <Chart x={x} y={y} origins={origins}/>
    </div>
  );
}

export default App;
