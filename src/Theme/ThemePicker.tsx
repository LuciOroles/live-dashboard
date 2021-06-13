import React, { ChangeEvent, ReactElement } from 'react';
import { Label, Radio } from 'theme-ui';

export type ThemeElement = {
  label: string;
  id: string;
};

interface Props {
  onLabelChange: (e: ChangeEvent) => void;
  themeList: ThemeElement[];
  selectedTheme: string;
}

export default function ThemePicker({
  onLabelChange,
  themeList,
  selectedTheme,
}: Props): ReactElement {
  return (
    <div>
      {themeList.map((theme) => {
        return (
          <Label key={theme.id}>
            <Radio
              name={theme.id}
              value={theme.id}
              checked={theme.id === selectedTheme}
              onChange={onLabelChange}
            />
            {theme.label}
          </Label>
        );
      })}
    </div>
  );
}
