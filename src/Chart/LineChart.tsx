import React, { ReactElement } from 'react';
import { Line } from 'react-chartjs-2';

const data = {
  labels: ['1', '2', '3', '4', '5', '6'],
  datasets: [
    {
      label: 'live',
      data: [12, -19, 3, 5, 2, 3],
      fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(255, 99, 132, 0.2)',
    },
  ],
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
  graphData: number[];
}

export default function DemoChart({ labels, graphData }: Props): ReactElement {
  const lineChartData = { ...data };

  lineChartData.labels = labels;
  lineChartData.datasets[0].data = graphData;

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
