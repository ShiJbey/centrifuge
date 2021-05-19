import React from "react";
import { Line } from "react-chartjs-2";
import _ from 'lodash';

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
  render() {
    return (
      <div>
        <div className="container">
          <Line
            type="Line"
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
