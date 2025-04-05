import { useMemo, useCallback } from "react";
import { usePlaygroundStore } from "../../store/ReactPlaygroundStore";
import TabList from "./TabList";
import Editor from "./Editor";
import { debounce } from "lodash-es";

export default function CodeEditor() {
  const files = usePlaygroundStore.use.files()
  const setFiles = usePlaygroundStore.use.setFile()
  const selectedFileName = usePlaygroundStore.use.selectedFileName()
  
  const file = useMemo(() => files[selectedFileName], [files, selectedFileName])

  const onEditorChange = useCallback((value?: string) => {
    if (value == null) return
    setFiles({
      ...files,
      [selectedFileName]: {
        ...file,
        value
      },
    })
  }, [file, files, selectedFileName, setFiles])

  return (
    <div className="flex flex-col h-full">
      <TabList />
      <Editor file={file} onChange={debounce(onEditorChange, 500)} />
    </div>
  );
}
// cmd + win + p
