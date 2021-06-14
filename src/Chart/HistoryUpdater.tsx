import React, { ReactElement } from 'react';
import { useDashboardContext } from '../Context';
import LineChart, { DataSet } from './LineChart';
import Fallback from './Fallback';

export default function HistoryUpdater(): ReactElement {
  const { state } = useDashboardContext();
  const graphDataSets: DataSet[] = [];
  state.sessions.forEach((graphData, label) => {
    const r = Math.random() * 255;
    const g = Math.random() * 255;
    graphDataSets.push({
      data: graphData.data,
      label,
      backgroundColor: `rgb(${r}, ${g}, 132)`,
      borderColor: `rgb(${r}, ${g}, 132)`,
    });
  });

  if (graphDataSets.length === 0) {
    return <Fallback label="No historical data, connect to collect!" />;
  }
  return (
    <LineChart graphDataSets={graphDataSets} labels={state.sessionsLabels} />
  );
}
