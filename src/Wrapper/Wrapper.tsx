import React, { ReactElement, useState } from 'react';
import { Flex } from 'theme-ui';

import ContaierUI from '../UI/ContainerUI';

import Board from '../UI/Board';
import ControlPanel from '../ControlPanel';
import ChartUpdater from '../Chart/ChartUpdater';
import HistoryUpdater from '../Chart/HistoryUpdater';
import Navigation from '../UI/Navigation';
import { useTranslation } from 'react-i18next';

export default function Wrapper(): ReactElement {
  const [activeTab, setActiveTab] = useState<string>('A');
  const { t } = useTranslation();
  let body = null;

  const header = (
    <Flex as="nav">
      <Navigation
        label={t('live')}
        active={activeTab === 'A'}
        onClick={() => setActiveTab('A')}
      />
      <Navigation
        label={t('history')}
        active={activeTab === 'B'}
        onClick={() => setActiveTab('B')}
      />
    </Flex>
  );

  if (activeTab === 'A') {
    body = (
      <Board
        left={<ChartUpdater />}
        right={
          <React.Fragment>
            <ControlPanel />
          </React.Fragment>
        }
      />
    );
  }

  if (activeTab === 'B') {
    body = <Board left={<HistoryUpdater />} />;
  }

  return (
    <ContaierUI>
      {header}
      {body}
    </ContaierUI>
  );
}
