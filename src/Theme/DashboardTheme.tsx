import React from 'react';
import { ThemeProvider } from 'theme-ui';

import theme from '../theme';
import themeDark from '../themeDark';
import { useDashboardContext } from '../Context';

const DashboardTheme: React.FC = ({ children }) => {
  const { state } = useDashboardContext();
  const currentTheme = state.selectedTheme === 'd1' ? themeDark : theme;

  return <ThemeProvider theme={currentTheme}>{children}</ThemeProvider>;
};

export default DashboardTheme;
