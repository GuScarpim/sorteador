export async function postForm<T>(path: string, form: FormData): Promise<T> {
  let res: Response
  try {
    res = await fetch(`/api${path}`, { method: 'POST', body: form })
  } catch {
    throw new Error('Não foi possível conectar ao servidor. Ele está rodando?')
  }
  const body = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(body.error ?? 'Erro inesperado.')
  return body as T
}
