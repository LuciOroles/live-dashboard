import React, { ReactElement, ChangeEvent } from 'react';
import ThemePicker from './ThemePicker';
import { useDashboardContext, Actions } from '../Context';

const themeList = [
  {
    label: 'Dark One',
    id: 'd1',
  },
  {
    label: 'Light One',
    id: 'l1',
  },
];

export default function ThemeUpdater(): ReactElement {
  const { dispatch, state } = useDashboardContext();
  const onLabelChange = (e: ChangeEvent) => {
    dispatch({
      type: Actions.themeUpdate,
      payload: e.currentTarget.getAttribute('name') ?? 'd1',
    });
  };
  return (
    <ThemePicker
      onLabelChange={onLabelChange}
      themeList={themeList}
      selectedTheme={state?.selectedTheme}
    />
  );
}
