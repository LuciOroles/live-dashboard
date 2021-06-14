import React, { ReactElement } from 'react';

import { useDashboardContext } from '../Context';
import LineChart from './LineChart';
import Fallback from './Fallback';

export default function ChartUpdater(): ReactElement {
  const { state } = useDashboardContext();
  const labels = state.graph.labels;
  const graphData = state.graph.data;
  if (graphData.length === 0) {
    return <Fallback label="No data" />;
  }
  return <LineChart labels={labels} graphData={graphData} />;
}
