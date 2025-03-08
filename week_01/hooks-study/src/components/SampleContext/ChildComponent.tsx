import React from 'react';
import { useTheme } from './ThemeContext';
import { Button } from 'antd';

const ChildComponent = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      style={{
        border: '1px solid red',
        padding: '20px',
        background: theme === 'light' ? '#fff' : '#333',
        color: theme === 'light' ? '#333' : '#fff',
      }}
    >
      <p>当前主题: {theme}</p>
      <Button type="primary" onClick={toggleTheme}>
        切换主题
      </Button>
    </div>
  )
}

export default ChildComponent;
