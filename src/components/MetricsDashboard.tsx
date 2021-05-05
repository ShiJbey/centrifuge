import React from "react";
import { Line } from "react-chartjs-2";
import { Button, Navbar } from 'react-bootstrap';

const state = {
  labels: ["January", "February", "March", "April", "May"],
  datasets: [
    {
      label: "Rainfall",
      backgroundColor: "rgba(75,192,192,1)",
      borderColor: "rgba(0,0,0,1)",
      borderWidth: 2,
      data: [65, 59, 80, 81, 56],
    },
  ],
};

const MetricsDashboard: React.FC = () => {
  return (
    <div>
      <Navbar bg="dark" variant="dark" className="justify-content-between">
        <Navbar.Brand>
          Simulation Metrics
        </Navbar.Brand>
        <Button>Load Sim</Button>
      </Navbar>
      <div className="container">
        <Line
          type="line"
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
};

export default MetricsDashboard;
