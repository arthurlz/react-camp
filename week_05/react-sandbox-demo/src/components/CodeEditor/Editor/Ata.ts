import { setupTypeAcquisition } from '@typescript/ata'
import ts from 'typescript'

export const createAta = (onReceiveFile: (code: string, path: string) => void) => {
  const ata = setupTypeAcquisition({
    projectName: "My ATA Project",
    typescript: ts,
    logger: console,
    delegate: {
      receivedFile: onReceiveFile,
      started: () => {
        console.log("ATA start")
      },
      progress: (downloaded: number, total: number) => {
        console.log(`Got ${downloaded} out of ${total}`)
      },
      finished: vfs => {
        console.log("ATA done", vfs)
      },
    },
  })

  return ata
}
