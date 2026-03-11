import React, { useEffect, useState } from 'react';

import { ThemeContext } from './ThemeContextObject';

export const CustomThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem('themeMode');
    return savedMode || 'dark';
  });

  const toggleTheme = () => {
    setMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      localStorage.setItem('themeMode', newMode);
      return newMode;
    });
  };

  useEffect(() => {
    const SavingMode = ()=>{
    const savedMode = localStorage.getItem('themeMode');
    if (savedMode) {
      setTimeout(()=>{setMode(savedMode)},0)
    }
  }
  SavingMode();
  }, []);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
