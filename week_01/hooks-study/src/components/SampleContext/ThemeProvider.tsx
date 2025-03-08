import React, { useState } from 'react';
import { ThemeContext } from "./ThemeContext";

type ThemeProviderProps = {
  children: React.ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme((prevTheme) => prevTheme === 'light' ? 'dark' : 'light');
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div>theme in root {theme}</div>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider;
