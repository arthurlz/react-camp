import Editor from '@monaco-editor/react';

function CodeEditorDemo() {
  const initialCode = `import { useEffect, useState } from "react";

function Counter() {
  const [count, setCount] = useState(() => {
    const a = 1 + 2;
    const b = 2 + 3;
    return a + b;
  });

  return (
    <div onClick={() => setCount(prev => prev + 1)}>{count}</div>
  );
}

export default Counter;
`;

  return (
    <Editor
      height="500px"
      defaultLanguage="javascript"
      defaultValue={initialCode}
    />
  );
}

export default CodeEditorDemo;
