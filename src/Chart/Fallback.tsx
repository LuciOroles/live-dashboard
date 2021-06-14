import React, { ReactElement } from 'react';
import { Card, Text } from 'theme-ui';
interface Props {
  label: string;
}

export default function Fallback({ label }: Props): ReactElement {
  return (
    <Card sx={{ width: '100%', textAlign: 'center' }}>
      <Text>{label}</Text>
    </Card>
  );
}
