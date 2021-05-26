import logo from './logo.svg';
import './App.css';
import IotReciever from "./components/iot-reciever-aws"
import Maps from "./components/maps"
import React, { Component } from 'react';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import ReactDOM from "react-dom"
import { Card, Col, Row } from "reactstrap"
import { isMobile } from 'react-device-detect';

let styles = {
  'Point': new Style({
    image: new CircleStyle({
      radius: 10,
      fill: null,
      stroke: new Stroke({
        color: 'magenta',
      }),
    }),
  }),
  'Polygon': new Style({
    stroke: new Stroke({
      color: 'blue',
      lineDash: [4],
      width: 3,
    }),
    fill: new Fill({
      color: 'rgba(0, 0, 255, 0.1)',
    }),
  }),
  'MultiPolygonB': new Style({
    stroke: new Stroke({
      color: 'blue',
      width: 1,
    }),
    fill: new Fill({
      color: 'rgba(0, 0, 255, 0.1)',
    }),
  }),
  'MultiPolygonG': new Style({
    stroke: new Stroke({
      color: 'green',
      width: 1,
    }),
    fill: new Fill({
      color: 'rgba(0, 255, 0, 0.1)',
    }),
  }),
  'MultiPolygonY': new Style({
    stroke: new Stroke({
      color: 'yellow',
      width: 1,
    }),
    fill: new Fill({
      color: 'rgba(255, 255, 0, 0.4)',
    }),
  }),
  'MultiPolygonM': new Style({
    stroke: new Stroke({
      color: 'rgb(255, 0, 255)',
      width: 1,
    }),
    fill: new Fill({
      color: 'rgba(255, 0, 255, 0.1)',
    }),
  }),
  'Red': new Style({
    stroke: new Stroke({
      color: 'red',
      width: 1,
    }),
    fill: new Fill({
      color: 'rgba(255, 0, 0, 0.8)',
    }),
  })
};

let maps = ""

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coord: [-99.2007409, 19.2938419],
      coords: [[-99.2007409, 19.2938419], [-99.189189, 19.288917], [-99.201438, 19.295709], [-99.208321, 19.289045]],
      colors: [styles.MultiPolygonB, styles.MultiPolygonG, styles.MultiPolygonY, styles.MultiPolygonM],
      temperature: "Loading...",
      humidity: "Loading..."
    }
    this.callBackIoT = this.callBackIoT.bind(this);
  }

  callBackIoT = (IoTData) => {
    console.log(IoTData[0])
    console.log(IoTData[1])
    const temp = JSON.parse(IoTData[1])["Message"].split(",")
    console.log(temp)
    let temp2 = <Maps
      coord={this.state.coord}
      coords={this.state.coords}
      colors={this.state.colors}
      zoom={14}
    />
    if (temp[0] === "1") {
      this.setState({
        colors: [styles.MultiPolygonB, styles.MultiPolygonG, styles.MultiPolygonY, styles.Red],
        temperature: temp[2],
        humidity: temp[1]
      })
      temp2 = <Maps
        coord={this.state.coords[3]}
        coords={this.state.coords}
        colors={this.state.colors}
        zoom={16}

      />
    }
    else {
      this.setState({
        temperature: temp[2],
        humidity: temp[1]
      })
    }

    if (!(JSON.stringify(temp2) === JSON.stringify(maps))) {
      maps = temp2
      alert("Fire in ZONE 3")
      ReactDOM.unmountComponentAtNode(document.getElementById("MAPS"))
      ReactDOM.render(maps, document.getElementById("MAPS"))
    }

  }

  componentDidMount() {
    maps = <Maps
      coord={this.state.coord}
      coords={this.state.coords}
      colors={this.state.colors}
      zoom={14}
    />
    ReactDOM.render(maps, document.getElementById("MAPS"))
  }

  render() {
    let tempera = "Loading..."
    if (this.state.temperature !== "Loading...") {
      tempera = Math.round(((this.state.temperature * 1.8 + 32) + Number.EPSILON) * 100) / 100
    }

    if (isMobile) {
      return (
        <div className="App">
          <IotReciever sub_topics={["Lorawan/Gateway/1"]} callback={this.callBackIoT} />

          <Row md="1" style={{ color: "white", fontSize: "1.3rem" }}>
            <Col xs="11" className="center">
              <Card>
                <div id="MAPS" />
              </Card>
            </Col>
            <Col xs="11" className="center">
              <Card>
                {"Temperature:"}
                <br />
                {tempera}{"°F"}
              </Card>
            </Col>
            <Col xs="11" className="center">
              <Card>
                {"Humidity:"}
                <br />
                {this.state.humidity}{"%"}
              </Card>
            </Col>
          </Row>
          <div className="DR">
            <img src={logo} className="App-logo" alt="logo" />
            <div style={{ color: "white", fontSize: "xx-large" }} >
              TreeForce
      </div>
          </div>

        </div>
      );
    }
    else {
      return (
        <div className="App">
          <IotReciever sub_topics={["Lorawan/Gateway/1"]} callback={this.callBackIoT} />
          <Row md="1" style={{ color: "white", fontSize: "1.3rem" }}>
            <Col xs="11" className="center">
              <Card>
                <div id="MAPS" />
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xs="auto">
            <div className="DR">
          <img src={logo} className="App-logo" alt="logo" style={{width:"200px"}} />
            <div style={{ color: "white", fontSize: "xx-large" }} >
              TreeForce
  </div>
          </div>
            </Col>
            <Col xs="8" className="center">
              <Card>
                {"Temperature:"}
                <br />
                {tempera}{"°F"}
              </Card>
              <hr />
              <Card>
                {"Humidity:"}
                <br />
                {this.state.humidity}{"%"}
              </Card>
            </Col>
          </Row>
        </div>
      )
    }
  }
}

export default App;