import { create } from 'zustand'
import { fileName2Language } from '../utils/utils'
import { createSelectors } from './CreateSelector'
import { initFiles } from '../playgroundFiles/files'

type File = {
  name: string
  value: string
  language: string
}
export type Files = {
  [key: string]: File
}

type PlaygroundState = {
  files: Files
  selectedFileName: string
}

type PlaygroundActions = {
  setSelectedFileName: (fileName: string) => void
  setFile: (files: Files) => void
  addFile: (fileName: string) => void
  removeFile: (fileName: string) => void
  updateFileName: (oldFieldName: string, newFieldName: string) => void
}

type PlaygroundStore = PlaygroundState & PlaygroundActions

const initialState: PlaygroundState = {
  files: initFiles,
  selectedFileName: 'App.tsx',
}

const usePlaygroundBaseStore = create<PlaygroundStore>((set) => ({
  ...initialState,

  setSelectedFileName: (fileName) => set(() => ({ selectedFileName: fileName })),

  setFile: (files) => set(() => ({ files })),
  
  addFile: (fileName) => set((state) => ({
    files: {
      ...state.files,
      [fileName]: {
        name: fileName, value: '', language: fileName2Language(fileName),
      },
    },
  })),
  removeFile: (fileName) => set((state) => {
    const { [fileName]: _, ...rest } = state.files
    return { files: rest }
  }),

  updateFileName: (oldFieldName, newFieldName) => set((state) => {
    if (!state.files[oldFieldName] || !newFieldName) return state

    const { [oldFieldName]: oldFile, ...rest } = state.files
    return {
      files: {
        ...rest,
        [newFieldName]: {
          ...oldFile,
          name: newFieldName,
          language: fileName2Language(newFieldName),
        },
      },
    }
  }),
}))

export const usePlaygroundStore = createSelectors(usePlaygroundBaseStore)
