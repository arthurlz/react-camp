import { transform } from "@babel/standalone";
import { File, Files } from '../../store/ReactPlaygroundStore';
import { ENTRY_FILE_NAME } from "../../playgroundFiles/files";
import { PluginObj } from "@babel/core";


export const beforeTransformCode = (filename: string, code: string) => {
  let _code = code
  const regexReact = /import\s+React/g
  if((filename.endsWith('.tsx') || filename.endsWith('.jsx')) && !regexReact.test(code)) {
    _code = `import React from 'react';\n${code}`
  }
  return _code
}

// './app.tsx'
const getModuleFile = (files: Files, modulePath: string) => {
  // 删除 ./ 前缀
  const moduleName = modulePath.replace(/^\.?\//, '')
  
  if (moduleName.includes('.')) {
    return files[moduleName]
  }

  const extsReg = /\.(ts|tsx|js|jsx)$/;
  const realModuleName = Object.keys(files)
    .filter(key => extsReg.test(key))
    .find(key => key.split('.').includes(moduleName))

    return realModuleName ? files[realModuleName] : undefined
}

const json2Js = (file: File) => {
  const js = `export default ${file.value}`
  return URL.createObjectURL(new Blob([js], { type: 'text/javascript' }))
}

const css2Js = (file: File) => {
  const randomId = new Date().getTime()
  const js = `
(() => {
 const stylesheet = document.createElement('style')
 stylesheet.setAttribute('id', 'style_${randomId}_${file.name}')
 document.head.appendChild(stylesheet)
 
 const styles = document.createTextNode(\`${file.value}\`)
 stylesheet.innerHTML = ''
 stylesheet.appendChild(styles)
})()
  `

  return URL.createObjectURL(new Blob([js], { type: 'text/javascript' }))
}

function customResolver(files: Files): PluginObj {
  console.log('customResolver: ', files)
  return {
    visitor: {
      ImportDeclaration(path) {
        const modulePath = path.node.source.value
        if (modulePath.startsWith('./')) {
          const file = getModuleFile(files, modulePath)
          if (!file) {
            return
          }

          if (file.name.endsWith('.css')) {
            path.node.source.value = css2Js(file)
          } else if (file.name.endsWith('.json')) {
            path.node.source.value = json2Js(file)
          } else {
            path.node.source.value = URL.createObjectURL(
              new Blob([babelTransform(file.name, file.value, files)],
                { type: 'text/javascript' })
              )
          }
        }
      }
    }
  }
}

export const babelTransform =  (filename: string, code: string, files: Files) => {
  const _code = beforeTransformCode(filename, code)
  let result = ''
  try {
    result = transform(_code, {
      presets: ['react', 'typescript'],
      filename,
      plugins: [customResolver(files)],
      retainLines: true
    }).code!;
  } catch (e) {
    console.error('babel transform error', e)
  }

  return result
}

export const compile = (files: Files) => {
  const main = files[ENTRY_FILE_NAME]
  return babelTransform(main.name, main.value, files)
}

self.addEventListener('message', async ({ data }) => {
  try {
    self.postMessage({
      type: 'COMPILE_CODE',
      result: compile(data.files)
    })
  } catch (e) {
    self.postMessage({ type: 'ERROR', error: e })
  }
})
