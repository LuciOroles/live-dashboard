import React, { ReactElement } from 'react';
import { Line } from 'react-chartjs-2';
import { Badge } from 'theme-ui';

const data = {
  labels: ['1', '2', '3', '4', '5', '6'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
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

export default function DemoChart(): ReactElement {
  return (
    <div
      style={{
        maxWidth: '400px',
      }}
    >
      <Badge>Badge</Badge>
      <Line type="line" data={data} options={options} />
    </div>
  );
}
