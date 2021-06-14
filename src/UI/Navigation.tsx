import React from 'react';
import { NavLink, useThemeUI } from 'theme-ui';

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

export default Navigation;
