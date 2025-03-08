import { useInsertionEffect, useState } from 'react';
import { Button, Card } from 'antd';

const insertCSS = (css: string) => {
  const style = document.createElement('style')
  style.innerHTML = css
  document.head.appendChild(style)
}

export default function UseInsertionEffect() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  useInsertionEffect(() => {
    insertCSS(`
      .card-light {
        background-color: #f0f0f0;
        color: #000;
        transition: background-color 0.3s;
      }
      .card-dark {
        background-color: #333;
        color: #fff;
        transition: background-color 0.3s;
      }
    `)
  }, [])

  return (
    <div style={{ padding: 24, display: 'flex', justifyContent: 'center'}}>
      <Card
        className={theme === 'light'? 'card-light': 'card-dark'}
        style={{ width: 300, textAlign: 'center' }}
      >
        <h3>useInsertionEffect 示例</h3>
        <p>当前主题：{theme === 'light' ? "🌞浅色主题" : "🌙深色主题" }</p>
        <Button type="primary" onClick={() => setTheme(prev => (prev === 'light' ? 'dark': 'light'))}>切换主题</Button>
      </Card>
    </div>
  )
}
