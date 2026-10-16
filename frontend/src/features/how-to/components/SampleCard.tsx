import { CheckIcon, DownloadIcon } from '../../../shared/icons'
import { RULES, SAMPLE_LINES } from '../constants'
import { useSampleDownload } from '../hooks/useSampleDownload'

export function SampleCard() {
  const download = useSampleDownload()

  return (
    <aside className="sample reveal">
      <div className="sample-head">participantes.txt <span className="badge">Exemplo</span></div>
      <div className="lines">
        {SAMPLE_LINES.map((l, i) => (
          <div key={i} className={l.skipped ? 'skip' : undefined}>
            <span className="ln">{i + 1}</span>{l.text}
          </div>
        ))}
      </div>
      <ul className="rules">
        {RULES.map((r) => <li key={r}><CheckIcon />{r}</li>)}
      </ul>
      <button className="btn-outline" onClick={download}><DownloadIcon /> Baixar modelo .txt</button>
    </aside>
  )
}
