import { STEPS } from '../constants'
import { SampleCard } from './SampleCard'

export function HowTo() {
  return (
    <section className="how" id="como-usar">
      <div className="container how-grid">
        <div>
          <p className="eyebrow mute reveal">Instruções</p>
          <h2 className="reveal">Como usar o sorteador</h2>
          <div className="steps">
            {STEPS.map((s) => (
              <div className="step-item reveal" key={s.n}>
                <span className="num">{s.n}</span>
                <div><h3>{s.title}</h3><p>{s.text}</p></div>
                <span className="tag">{s.tag}</span>
              </div>
            ))}
          </div>
        </div>
        <SampleCard />
      </div>
    </section>
  )
}
