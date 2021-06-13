import React, { ReactElement } from 'react';
import { Line } from 'react-chartjs-2';

export type DataSet = {
  label: string;
  data: number[];
  fill?: false;
  backgroundColor?: string;
  borderColor?: string;
};

interface LineGraphData {
  labels: string[];
  datasets: DataSet[];
}

const data: LineGraphData = {
  labels: [],
  datasets: [],
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

interface Props {
  labels: string[];
  graphData?: number[];
  graphDataSets?: DataSet[];
}

export default function DemoChart({
  labels,
  graphData,
  graphDataSets,
}: Props): ReactElement {
  const lineChartData = { ...data };

  if (graphData) {
    lineChartData.labels = labels;
    lineChartData.datasets = [
      {
        data: graphData,
        label: 'live',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
      },
    ];
  }

  if (graphDataSets) {
    lineChartData.labels = labels;
    lineChartData.datasets = graphDataSets;
  }

  return (
    <div
      style={{
        maxWidth: '800px',
      }}
    >
      <Line type="line" data={lineChartData} options={options} />
    </div>
  );
}
