import { useCallback, useEffect, useMemo, useState } from "react";
import { usePlaygroundStore } from "../../../store/ReactPlaygroundStore";
import { APP_COMPONENT_FILE_NAME, ENTRY_FILE_NAME, IMPORT_MAP_FILE_NAME } from "../../../playgroundFiles/files";
import { TabItem } from "./TabItem";

export default function TabList() {
  const files = usePlaygroundStore.use.files()
  const removeFile = usePlaygroundStore.use.removeFile()
  const addFile = usePlaygroundStore.use.addFile()
  const updateFileName = usePlaygroundStore.use.updateFileName()
  const selectedFileName = usePlaygroundStore.use.selectedFileName()
  const setSelectedFileName = usePlaygroundStore.use.setSelectedFileName()

  const [tabs, setTabs] = useState(['index'])
  const [creating, setCreating] = useState(false)

  const onEditComplete = useCallback((name: string, prevName: string) => {
    updateFileName(prevName, name)
    setSelectedFileName(name)  
    
    setCreating(false)
  
  }, [setSelectedFileName, updateFileName])

  const onRemove = useCallback((name: string) => {
    removeFile(name)
    setSelectedFileName(ENTRY_FILE_NAME)

  }, [removeFile, setSelectedFileName])

  const readonlyFileNames = useMemo(() => [ENTRY_FILE_NAME, IMPORT_MAP_FILE_NAME, APP_COMPONENT_FILE_NAME], [])

  const renderTabs = useCallback(() => {
    return tabs.map((tab, index, arr) => (
      <TabItem
        key={tab + index}
        value={tab}
        readonly={readonlyFileNames.includes(tab)}
        creating={creating && index === arr.length - 1}
        activated={selectedFileName === tab}
        onClick={() => setSelectedFileName(tab)}
        onEditComplete={(name) => onEditComplete(name, tab)}
        onRemove={() => { 
          onRemove(tab)
        }}
      />
    ))
  }, [creating, onEditComplete, onRemove, readonlyFileNames, selectedFileName, setSelectedFileName, tabs])

  const addTab = () => {
    const newFileName = `Com${Math.random().toString().slice(2, 8)}.tsx`
    addFile(newFileName)
    setSelectedFileName(newFileName)
    setCreating(true)
  }

  useEffect(() => {
    setTabs(Object.keys(files))
  }, [files])

  return <div
    className="
      flex items-center h-9
      overflow-x-auto overflow-y-hidden
      border-b border-gray-300 box-border
      text-gray-700 bg-white
    "
  >
    {renderTabs()}
    <div onClick={addTab}>+</div>
  </div>
}