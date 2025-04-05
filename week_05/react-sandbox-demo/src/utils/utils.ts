export const fileName2Language = (name: string) => {
  const extension = name.split('.').pop()?.toLowerCase() || ''

  const extensionMap: Record<string, string> = {
    ts: 'typescript',
    tsx: 'typescript',
    js: 'javascript',
    jsx: 'javascript',
    css: 'css',
    json: 'json'
  }

  return extensionMap[extension] || 'javascript'
}
