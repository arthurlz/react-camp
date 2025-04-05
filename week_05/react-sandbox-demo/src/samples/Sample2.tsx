import { transform } from '@babel/standalone';
import type { PluginObj } from '@babel/core';

function BabelCompiler() {
  // 构造模拟模块代码
  const moduleSource = `
    function sum(a, b) {
        return a + b;
    }
    export { sum };
  `;

  // 将模块代码转换为 URL（Blob）
  const moduleUrl = URL.createObjectURL(
    new Blob([moduleSource], { type: 'application/javascript' })
  );

  // Babel 插件：将 import 源路径重写为 Blob URL
  const importRedirectPlugin: PluginObj = {
    visitor: {
      ImportDeclaration(path) {
        path.node.source.value = moduleUrl;
      }
    },
  };

  // 原始待编译代码
  const sourceCode = `
    import { sum } from './sum.ts';
    console.log(sum(2, 3));
  `;

  // 编译入口
  function handleCompile() {
    const result = transform(sourceCode, {
      presets: ['react', 'typescript'],
      filename: 'example.ts',
      plugins: [importRedirectPlugin]
    });

    console.log(result.code);
  }

  return (
    <div>
      <button onClick={handleCompile}>编译</button>
    </div>
  );
}

export default BabelCompiler;
