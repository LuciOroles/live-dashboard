import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

export default function DemoIntern(): ReactElement {
  const { t } = useTranslation();

  return (
    <div>
      <h2>{t('Welcome')}</h2>;
    </div>
  );
}
