import React, { ReactElement } from 'react';
import { useDashboardContext } from '../Context';
import LineChart from './LineChart';

export default function ChartUpdater(): ReactElement {
  const { state } = useDashboardContext();
  const labels = state.graph.labels;
  const graphData = state.graph.data;
  return <LineChart labels={labels} graphData={graphData} />;
}
