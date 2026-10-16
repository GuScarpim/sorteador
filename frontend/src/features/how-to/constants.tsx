import type { ReactNode } from 'react'

export const SAMPLE_TEXT = 'Ana Beatriz Lima\nBruno Carvalho\nCamila Rocha\n\nDiego Martins\nElisa Nogueira\n'

export const SAMPLE_LINES: { text: string; skipped?: boolean }[] = [
  { text: 'Ana Beatriz Lima' },
  { text: 'Bruno Carvalho' },
  { text: 'Camila Rocha' },
  { text: '(linha vazia — ignorada)', skipped: true },
  { text: 'Diego Martins' },
  { text: 'Elisa Nogueira' },
]

export const RULES = [
  'Espaços no início e no fim são removidos.',
  'Linhas vazias são ignoradas.',
  'A lista precisa ter pelo menos 2 nomes.',
]

export const STEPS: { n: string; title: string; tag: string; text: ReactNode }[] = [
  { n: '01', title: 'Prepare o arquivo de texto', tag: 'Formato', text: <>Abra o Bloco de Notas (Windows) ou o TextEdit em modo texto simples (Mac) e escreva um participante por linha. Salve com a extensão <code>.txt</code> e codificação UTF-8 para preservar acentos.</> },
  { n: '02', title: 'Carregue a lista no painel 01', tag: 'Upload', text: 'Arraste o arquivo para a área tracejada ou clique nela para escolher. O painel mostra quantos nomes foram lidos, uma prévia da lista e avisa se houver nomes repetidos.' },
  { n: '03', title: 'Clique em “Sortear nome”', tag: 'Sorteio', text: 'O botão é liberado assim que a lista é válida. Nomes repetidos (mais comentários) aumentam as chances. Com “Não repetir nomes já sorteados” marcado, cada pessoa só pode sair uma vez.' },
  { n: '04', title: 'Confira o histórico e recomece', tag: 'Resultado', text: 'Cada resultado fica registrado em ordem no histórico. Use “Reiniciar sorteios” para devolver todos os nomes à lista, ou “Trocar arquivo” para começar com outra lista.' },
]
