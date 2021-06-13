import React, { ReactElement } from 'react';
import { Grid, Card } from 'theme-ui';

interface Props {
  left: React.ReactElement;
  right: React.ReactElement;
}

export default function Board({ left, right }: Partial<Props>): ReactElement {
  return (
    <Grid gap={2} columns={[2, '3fr 1fr']}>
      <Card>{left}</Card>
      <Card>{right}</Card>
    </Grid>
  );
}
