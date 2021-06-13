import React from 'react';
import { Container } from 'theme-ui';

const UIContainer: React.FC = ({ children }) => {
  return (
    <Container
      p={4}
      sx={{
        maxWidth: '860px',
      }}
    >
      {children}
    </Container>
  );
};

export default UIContainer;
