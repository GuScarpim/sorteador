import { DrawCard } from '../features/draw'
import { Hero } from '../features/hero'
import { HowTo } from '../features/how-to'
import { Footer, Header } from '../features/layout'
import { UploadCard, useUpload } from '../features/upload'
import { usePageIntro } from './usePageIntro'

export default function App() {
  const root = usePageIntro()
  const upload = useUpload()

  return (
    <div ref={root}>
      <Header />
      <main className="container" id="sortear">
        <Hero />
        <div className="grid">
          <UploadCard upload={upload} />
          <DrawCard key={upload.session} file={upload.file} info={upload.info} />
        </div>
      </main>
      <HowTo />
      <Footer />
    </div>
  )
}
