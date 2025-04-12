import { useCallback, useEffect, useRef, useState } from "react";
import Editor from "../CodeEditor/Editor";
import { compile } from "./compiler";
import { usePlaygroundStore } from "../../store/ReactPlaygroundStore";
import iframeRaw from './iframe.html?raw'
import { IMPORT_MAP_FILE_NAME } from "../../playgroundFiles/files";
import { Message } from "../Message";
import CompilerWorker from './CompilerInWebWorker?worker'


type MessageData = {
  data: {
    type: string;
    message: string;
  }
}

export default function Preview() {
  const files = usePlaygroundStore.use.files()
  const [compiledCode, setCompiledCode] = useState<string>('')
  const [error, setError] = useState('')

  const compilerWorkerRef = useRef<Worker>(null)

  useEffect(() => {
    if (!compilerWorkerRef.current) {
      compilerWorkerRef.current = new CompilerWorker()
      compilerWorkerRef.current.addEventListener('message', ({ data }) => {
        const { type, result } = data
        if (type === 'COMPILE_CODE') {
          setCompiledCode(result)
        }
        // else if (type === 'ERROR') {
        //   setError(error)
        // }
      })
    }
  }, [])

  useEffect(() => {
    if (compilerWorkerRef.current) {
      compilerWorkerRef.current.postMessage({
        files
      })
    }
  }, [files])
  const getIframeUrl = useCallback(() => {
    const res = iframeRaw.replace(
      '<script type="importmap"></script>',
      `<script type="importmap">${files[IMPORT_MAP_FILE_NAME].value}</script>`
    ).replace(
      '<script type="module" id="appSrc"></script>',
      `<script type="module" id="appSrc">${compiledCode}</script>`
    )

    return URL.createObjectURL(new Blob([res], { type: 'text/html' }))
  }, [compiledCode, files])

  const [iframeUrl, setIframeUrl] = useState<string>(getIframeUrl())

  // useEffect(() => {
  //   const result = compile(files)
  //   setCompiledCode(result)
  // }, [files])

  useEffect(() => {
    setIframeUrl(getIframeUrl())
  }, [compiledCode, getIframeUrl])

  const handleMessage = (msg: MessageData) => {
    const { type, message } = msg.data
    if (type === 'ERROR') {
      setError(message)
    }
  }

  useEffect(() => {
    window.addEventListener('message', handleMessage)
    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [])

  return (
    <div className="h-full">
      <iframe
        src={iframeUrl}
        className="w-full h-full border-0"
      />
      <Message type='error' content={error} />
    </div>
  )
  // <div style={{height: '100%'}}>
  //   <Editor
  //     file={{
  //       name: 'index.tsx',
  //       value: compiledCode,
  //       language: 'javascript'
  //     }}
  //     onChange={() => {}}
  //   />
  // </div>
}
