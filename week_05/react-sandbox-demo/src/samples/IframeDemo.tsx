import React from 'react';
import iframeContent from './IframeDemo.html?raw';

// 将原始 HTML 字符串创建为 Blob URL，用于 iframe src
const sandboxUrl = URL.createObjectURL(
  new Blob([iframeContent], { type: 'text/html' })
);

const SandboxPreview: React.FC = () => {
  return (
    <iframe
      src={sandboxUrl}
      style={{
        width: '100%',
        height: '100%',
        padding: 0,
        border: 'none',
      }}
    />
  );
};

export default SandboxPreview;
