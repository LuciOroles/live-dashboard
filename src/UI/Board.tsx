import React, { ReactElement } from 'react';
import { Grid, Card } from 'theme-ui';

interface Props {
  left: React.ReactElement;
  right?: React.ReactElement;
}

export default function Board({ left, right }: Partial<Props>): ReactElement {
  const nrOfCols = right ? 2 : 1;
  const gridFormat = right ? '3fr 1fr' : '100%';
  return (
    <Grid gap={2} columns={[nrOfCols, gridFormat]}>
      <Card>{left}</Card>
      {right && <Card>{right}</Card>}
    </Grid>
  );
}
