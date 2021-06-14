import React from 'react';
import { Container } from 'theme-ui';
import './ui.css';

const UIContainer: React.FC = ({ children }) => {
  return (
    <Container
      p={4}
      sx={{
        maxWidth: '860px',
      }}
      className="shadow"
    >
      {children}
    </Container>
  );
};

export default UIContainer;
