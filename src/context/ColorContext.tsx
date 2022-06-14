import React, { createContext, useState, FC } from 'react';
interface IThemeContext {
  color: string;
  setColor?: (color: string) => void;
};
const defaultState = {
  color: '#66d5ff',
  setColor: (color: string) => {}
};
export const ColorContext = createContext(defaultState);

export const ColorProvider: FC = ({ children }) => {
  const [color, setColor] = useState(defaultState.color);
  const value = { color, setColor };

  return (
    <ColorContext.Provider value={value}>
      {children}
    </ColorContext.Provider>
  );
}