import React from "react";
import { Line, Bar } from "react-chartjs-2";
import { Button, Navbar } from 'react-bootstrap';
import _ from 'lodash';
import ElectronAPI from '../utility/electronApi';
import { OPEN_SIM_FILE } from "../utility/electronChannels";

declare const electron: ElectronAPI;

const startYear = 1939
const binSize = 5; // years per bin
const yearRange = 1979 - startYear;
const numBins = Math.ceil(yearRange / binSize);
const labels = _.range(numBins).map((x) => x * binSize + startYear);

const state = {
  labels,
  datasets: [
    {
      label: "Birth",
      backgroundColor: "rgba(75,192,192,1)",
      borderColor: "rgba(75,192,192,1)",
      borderWidth: 3,
      data: _.range(numBins).map(() => _.random(100)),
    },
    {
      label: "LayOff",
      backgroundColor: "#c06c4b",
      borderColor: "#c06c4b",
      borderWidth: 3,
      data: _.range(numBins).map(() => _.random(100)),
    },
    {
      label: "Business Construction",
      backgroundColor: "#4bc064",
      borderColor: "#4bc064",
      borderWidth: 3,
      data: _.range(numBins).map(() => _.random(100)),
    },
    {
      label: "Hiring",
      backgroundColor: "#8f90c5",
      borderColor: "#8f90c5",
      borderWidth: 3,
      data: _.range(numBins).map(() => _.random(100)),
    },
    {
      label: "Divorce",
      backgroundColor: "#d63939",
      borderColor: "#da4949",
      borderWidth: 3,
      data: _.range(numBins).map(() => _.random(100)),
    },
  ],
};

export class MetricsDashboard extends React.Component {

  async openSimFile() {
    try {
      const res = await electron.openFile(OPEN_SIM_FILE);
      if (res.status === 'ok') {
        const sim = JSON.parse(res.payload);
      }

    } catch (error) {
      console.error(error);
    }
  }

  componentDidMount() {
    this.registerElectronListeners();
  }

  componentWillUnmount() {
    this.unregisterElectronListeners();
  }

  registerElectronListeners() {
    console.log('Registering electron handlers');
    // electron.receive(OPEN_SIM_FILE, this.handleSaveFile.bind(this));

    // electron.receive(OPEN_DIAGRAM_FILE, (event: Electron.IpcRendererEvent, data: any) => {
    //   console.log(data);
    // });

    // electron.receive(OPEN_FILE_ERROR, (event: Electron.IpcRendererEvent, error: any) => {
    //   console.error(error);
    // });

    // electron.receive(SAVE_DIAGRAM_ERROR, (event: Electron.IpcRendererEvent, error: any) => {
    //   console.error(error);
    // });

    // electron.receive(OPEN_DIR_ERROR, (event: Electron.IpcRendererEvent, error: any) => {
    //   console.error(error);
    // });
  }

  unregisterElectronListeners() {
    console.log('De-Registering electron handlers');
    electron.removeAllListeners(OPEN_SIM_FILE);
  }

  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark" className="justify-content-between">
          <Navbar.Brand>
            Simulation Metrics
          </Navbar.Brand>
          <Button onClick={() => this.openSimFile.bind(this)()}>Load Sim</Button>
        </Navbar>
        <div className="container">
          <Bar
            type="bar"
            data={state}
            options={{
              title: {
                display: true,
                text: "Average Rainfall per month",
                fontSize: 20,
              },
              legend: {
                display: true,
                position: "right",
              },
            }}
          />
        </div>
      </div>
    );
  }
}

export default MetricsDashboard;
