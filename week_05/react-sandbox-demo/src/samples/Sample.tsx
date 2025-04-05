import { useRef } from 'react';
import { transform } from '@babel/standalone';

function CompilerApp() {
  const editorRef = useRef<HTMLTextAreaElement>(null);

  const handleCompile = () => {
    if (!editorRef.current) return;

    const result = transform(editorRef.current.value, {
      presets: ['react', 'typescript'],
      filename: 'example.tsx',
    });

    console.log(result.code);
  };

  const defaultSource = `import { useEffect, useState } from "react";

function Counter() {
  const [count, setCount] = useState(() => {
    const a = 1 + 2;
    const b = 2 + 3;
    return a + b;
  });

  return (
    <div onClick={() => setCount((prev) => prev + 1)}>{count}</div>
  );
}

export default Counter;
`;

  return (
    <div>
      <textarea
        ref={editorRef}
        style={{ width: '500px', height: '300px' }}
        defaultValue={defaultSource}
      />
      <button onClick={handleCompile}>编译</button>
    </div>
  );
}

export default CompilerApp;
