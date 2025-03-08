import { useEffect, useDebugValue, useState } from 'react';

function useOnlineStatus() {
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useDebugValue(online ? '🟢 在线' : '🔴 离线');

  return online;
}

export default function DebugValue() {
  const online = useOnlineStatus();

  return (
    <div style={{ textAlign: 'center', padding: 20 }}>
      <h2>当前网络状态检测</h2>
      <h1>当前状态：{online ? '🟢 Online' : '🔴 Offline'}</h1>
    </div>
  );
}
