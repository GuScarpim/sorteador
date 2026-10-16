import { useState, type DragEvent } from 'react'
import { uploadList } from '../services/uploadService'
import type { ParticipantsResponse } from '../types'

const MAX_BYTES = 1024 * 1024

export function useUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [info, setInfo] = useState<ParticipantsResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [dragOver, setDragOver] = useState(false)
  // Muda a cada troca de lista, para reiniciar o estado dos sorteios.
  const [session, setSession] = useState(0)

  const clear = () => {
    setInfo(null)
    setFile(null)
    setSession((s) => s + 1)
  }

  const fail = (message: string) => {
    clear()
    setError(message)
  }

  const handleFile = async (f: File | undefined) => {
    if (!f) return
    setError(null)
    if (!f.name.toLowerCase().endsWith('.txt')) return fail('Somente arquivos .txt são aceitos.')
    if (f.size > MAX_BYTES) return fail('O arquivo excede 1 MB.')
    try {
      const data = await uploadList(f)
      setInfo(data)
      setFile(f)
      setSession((s) => s + 1)
    } catch (e) {
      fail((e as Error).message)
    }
  }

  const onDragOver = (e: DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }
  const onDragLeave = (e: DragEvent) => {
    e.preventDefault()
    setDragOver(false)
  }
  const onDrop = (e: DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    handleFile(e.dataTransfer.files[0])
  }

  return {
    file,
    info,
    error,
    dragOver,
    session,
    loaded: info !== null,
    duplicates: info ? info.total - info.unique : 0,
    handleFile,
    swapFile: clear,
    dropHandlers: { onDragOver, onDragLeave, onDrop },
  }
}

export type UploadState = ReturnType<typeof useUpload>
