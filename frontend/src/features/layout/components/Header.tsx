import { useSmoothScroll } from '../hooks/useSmoothScroll'

export function Header() {
  const scrollTo = useSmoothScroll()

  return (
    <header className="header">
      <div className="container">
        <div className="logo"><span className="logo-mark" />Sorteador</div>
        <nav className="nav">
          <a href="#sortear" onClick={(e) => scrollTo(e, '#sortear')}>Sortear</a>
          <a href="#como-usar" onClick={(e) => scrollTo(e, '#como-usar')}>Como usar</a>
        </nav>
      </div>
    </header>
  )
}
