import { Files } from "../store/ReactPlaygroundStore";
import { fileName2Language } from "../utils/utils";
import importMap from './templates/import-map.json?raw'

// esm 模块映射文件名
export const IMPORT_MAP_FILE_NAME = 'import-map.json'

// app 入口文件名
export const ENTRY_FILE_NAME = 'main.tsx'

export const APP_COMPONENT_FILE_NAME = 'App.tsx'

export const initFiles: Files = {
  [ENTRY_FILE_NAME]: {
    name: ENTRY_FILE_NAME,
    language: fileName2Language(ENTRY_FILE_NAME),
    // TODO: 文件内容还没追加
    value: ''
  },
  [APP_COMPONENT_FILE_NAME]: {
    name: APP_COMPONENT_FILE_NAME,
    language: fileName2Language(APP_COMPONENT_FILE_NAME),
    // TODO: 文件内容还没追加
    value: ''
  },
  [IMPORT_MAP_FILE_NAME]: {
    name: IMPORT_MAP_FILE_NAME,
    language: fileName2Language(IMPORT_MAP_FILE_NAME),
    value: importMap
  }
}