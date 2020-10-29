import { Head as _Head } from 'next/document'

type DocumentFiles = {
  sharedFiles: readonly string[]
  pageFiles: readonly string[]
  allFiles: readonly string[]
}

// Override default Next getCssLinks method
export class Head extends _Head {
  getCssLinks(files: DocumentFiles): JSX.Element[] | null {
    return super.getCssLinks({
      ...files,
      sharedFiles: files.allFiles,
    })
  }
}
