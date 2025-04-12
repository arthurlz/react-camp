import { Files } from "../store/ReactPlaygroundStore";
import { fileName2Language } from "../utils/utils";
import importMap from './templates/import-map.json?raw'
import main from './templates/main.tsx?raw'
import App from './templates/App.tsx?raw'
import AppCss from './templates/App.css?raw';

// esm 模块映射文件名
export const IMPORT_MAP_FILE_NAME = 'import-map.json'

// app 入口文件名
export const ENTRY_FILE_NAME = 'main.tsx'

export const APP_COMPONENT_FILE_NAME = 'App.tsx'

export const initFiles: Files = {
  [ENTRY_FILE_NAME]: {
    name: ENTRY_FILE_NAME,
    language: fileName2Language(ENTRY_FILE_NAME),
    value: main
  },
  [APP_COMPONENT_FILE_NAME]: {
    name: APP_COMPONENT_FILE_NAME,
    language: fileName2Language(APP_COMPONENT_FILE_NAME),
    value: App
  },
  [IMPORT_MAP_FILE_NAME]: {
    name: IMPORT_MAP_FILE_NAME,
    language: fileName2Language(IMPORT_MAP_FILE_NAME),
    value: importMap
  },
  'App.css': {
    name: 'App.css',
    language: 'css',
    value: AppCss
  }
}