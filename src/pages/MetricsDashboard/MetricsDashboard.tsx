import React from 'react';
import { Line } from 'react-chartjs-2';
// import { ChartDataset } from 'chart.js';
import _ from 'lodash';
import metrics from './eventMetrics.json';

const colors = [
	'#4bc0c0',
	'#c06c4b',
	'#8f90c5',
	'#d63939',
	'#66ff00',
	'#fffb00',
	'#ff9100',
	'#2600ff',
	'#ff00ea',
	'#00f7ff',
];

const startYear = metrics.range.min;
const binSize = 1; // years per bin
const yearRange = metrics.range.max - startYear;
const numBins = Math.ceil(yearRange / binSize);
const labels = _.range(numBins).map((x) => x * binSize + startYear);

const state = {
	labels,
	datasets: metrics.dataset.map((data, index) => {
		return {
			...data,
			borderWidth: 3,
			backgroundColor: colors[index % colors.length],
			borderColor: colors[index % colors.length],
		};
	}),
};
// const state = {
//   labels,
//   datasets: [
//     {
//       label: "LayOff",
//       backgroundColor: "#c06c4b",
//       borderColor: "#c06c4b",
//       borderWidth: 3,
//       data: _.range(numBins).map(() => _.random(100)),
//     },
//     {
//       label: "Business Construction",
//       backgroundColor: "#4bc064",
//       borderColor: "#4bc064",
//       borderWidth: 3,
//       data: _.range(numBins).map(() => _.random(100)),
//     },
//     {
//       label: "Hiring",
//       backgroundColor: "#8f90c5",
//       borderColor: "#8f90c5",
//       borderWidth: 3,
//       data: _.range(numBins).map(() => _.random(100)),
//     },
//     {
//       label: "Divorce",
//       backgroundColor: "#d63939",
//       borderColor: "#da4949",
//       borderWidth: 3,
//       data: _.range(numBins).map(() => _.random(100)),
//     },
//   ],
// };

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
								text: 'Average Rainfall per month',
								fontSize: 20,
							},
							legend: {
								display: true,
								position: 'right',
							},
						}}
					/>
				</div>
			</div>
		);
	}
}

export default MetricsDashboard;
