import React, { ChangeEvent, ReactElement } from 'react';
import { Label, Radio } from 'theme-ui';

export type ThemeElement = {
  label: string;
  id: string;
  checked: boolean;
};

interface Props {
  onLabelChange: (e: ChangeEvent) => void;
  themeList: ThemeElement[];
}

export default function ThemePicker({
  onLabelChange,
  themeList,
}: Props): ReactElement {
  return (
    <div>
      {themeList.map((theme) => {
        return (
          <Label key={theme.id}>
            <Radio
              name={theme.id}
              value={theme.id}
              checked={theme.checked}
              onChange={onLabelChange}
            />
            {theme.label}
          </Label>
        );
      })}
    </div>
  );
}
