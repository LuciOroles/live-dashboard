import React, { ReactElement, useState } from 'react';
import { Flex, NavLink, useThemeUI } from 'theme-ui';

import ContaierUI from '../UI/ContainerUI';

import Board from '../UI/Board';
import WebSocketDemo from '../WebSocketDemo';
import ChartUpdater from '../Chart/ChartUpdater';

interface NavigationProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

const Navigation = ({ label, active, onClick }: NavigationProps) => {
  const context = useThemeUI();
  const { theme } = context;
  const secondary = theme.colors?.secondary;
  const backgroundColor = active ? secondary ?? 'transparent' : 'transparent';
  return (
    <NavLink
      p={2}
      onClick={onClick}
      sx={{
        backgroundColor: backgroundColor,
        cursor: 'pointer',
        borderRadius: '10px',
      }}
    >
      {label}
    </NavLink>
  );
};

export default function Wrapper(): ReactElement {
  const [activeTab, setActiveTab] = useState<string>('A');
  let body = null;

  const header = (
    <Flex as="nav">
      <Navigation
        label="Live Data"
        active={activeTab === 'A'}
        onClick={() => setActiveTab('A')}
      />
      <Navigation
        label="History "
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
            <WebSocketDemo />
          </React.Fragment>
        }
      />
    );
  }

  if (activeTab === 'B') {
    body = (
      <Board
        left={<ChartUpdater />}
        right={
          <React.Fragment>
            <h4>Test</h4>
          </React.Fragment>
        }
      />
    );
  }

  return (
    <ContaierUI>
      {header}
      {body}
    </ContaierUI>
  );
}
