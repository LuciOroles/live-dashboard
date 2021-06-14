import React, { ReactElement } from 'react';

import { useDashboardContext } from '../Context';
import LineChart from './LineChart';
import Fallback from './Fallback';
import { useTranslation } from 'react-i18next';

export default function ChartUpdater(): ReactElement {
  const { t } = useTranslation();
  const { state } = useDashboardContext();
  const labels = state.graph.labels;
  const graphData = state.graph.data;
  if (graphData.length === 0) {
    return <Fallback label={t('noData.live')} />;
  }
  return <LineChart labels={labels} graphData={graphData} />;
}
