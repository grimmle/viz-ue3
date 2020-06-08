import React, { useState, useEffect } from 'react';
import './App.css';
import Chart from './Chart';
import { Dropdown, Divider, Segment, Label, Grid } from 'semantic-ui-react'


async function loadCSV() {
  const res = await fetch("./cars.csv");
  let data = await res.text();
  return data;
}

export const CATEGORIES = {
  'Verbrauch': 2,
  'Zylinder': 3,
  'Hubraum': 4,
  'Pferdestärken': 5,
  'Gewicht': 6,
  'Beschleunigung': 7,
  'Baujahr': 8
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

  let allData = {
    'American': [],
    'European': [],
    'Japanese': []
  }

  data.split('\n').slice(1).map(function (l) {
    let line = l.split(';')
    let obj = {}
    obj.x = line[x];
    obj.y = line[y];
    if (!isNaN(line[2])) line[2] = (line[2] / 2.352).toFixed(2)
    if (!isNaN(line[6])) line[6] = (line[6] / 2.205).toFixed(2)
    if (!isNaN(line[4])) line[4] = (line[4] * 16.387).toFixed(2)

    if (o.includes(line[9].trim()) && line[9].trim() === "American") {
      if(m.includes(line[1].trim())) {
        america.data.push(obj)
        allData['American'].push(line);
      }
    }
    else if (o.includes(line[9].trim()) && line[9].trim() === "European") {
      if(m.includes(line[1].trim())) {
        europe.data.push(obj)
        allData['European'].push(line);
      }
    }
    else if (o.includes(line[9].trim()) && line[9].trim() === "Japanese") {
      if(m.includes(line[1].trim())) {
        japan.data.push(obj)
        allData['Japanese'].push(line);
      }
    }
  });
  let set = []
  if (o.includes('American')) set.push(america)
  if (o.includes('European')) set.push(europe)
  if (o.includes('Japanese')) set.push(japan)
  return [set, allData];
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
  const [x, setX] = useState("Gewicht");
  const [y, setY] = useState("Pferdestärken");
  const [origins, setOrigins] = useState(ORIGINS);
  const [manufacturers, setManufacturers] = useState(MANUFACTURERS);
  const [data, setData] = useState({});
  const [extraData, setExtra] = useState({})
  
  const handleSelect = (e, {value}, key) => {
    if (key === "x") setX(value)
    else if (key === "y") setY(value)
    else if (key === "origins") setOrigins(value)
    else if (key === "manufacturers") setManufacturers(value)
  }

  useEffect(() => {
    loadCSV().then((csv) => {
      let DATA = getDataSets(csv, CATEGORIES[x], CATEGORIES[y], origins, manufacturers)
      setExtra(DATA[1])
      setData({
          datasets: DATA[0]
      })
    });
  }, [x, y, manufacturers]);

  useEffect(() => {
    loadCSV().then((csv) => {
      let MANUS = update(csv, origins)
      setManufacturers(MANUS)
    })
  }, [origins]);

  return (
    <div className="content">
      <h1>Vizualization UE3</h1>
      <Divider/>

      <Grid>
        <Grid.Row columns={2} padded centered>
          <Grid.Column>
            <Segment attached>
              <Label attached="top">Herkunft</Label>
              <Dropdown placeholder='Herkunft' onChange={(e, { value }) => handleSelect(e, { value }, 'origins')} fluid multiple selection options={originsOptions} value={origins} />
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment attached>
              <Label attached="top">Hersteller</Label>
              <Dropdown placeholder='Hersteller' onChange={(e, { value }) => handleSelect(e, { value }, 'manufacturers')} fluid multiple selection search options={manufacturersOptions} value={manufacturers} />
            </Segment>
          </Grid.Column>
        </Grid.Row>

      </Grid>
      <Dropdown placeholder='X Achse' onChange={(e, { value }) => handleSelect(e, { value }, 'x')} fluid selection options={axisOptions} value={x}/>
      <Dropdown placeholder='Y Achse' onChange={(e, { value }) => handleSelect(e, { value }, 'y')} fluid selection options={axisOptions} value={y}/>
      <Chart data={data} extra={extraData}/>
    </div>
  );
}

export default App;
