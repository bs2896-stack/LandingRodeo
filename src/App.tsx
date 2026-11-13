import { useEffect, useState } from 'react'
import Card from './Card'
import { useTheme } from './ThemeContext'
import './App.css'

type Integrante = { nombre: string; rol: string }

function App() {
  const [integrantes, setIntegrantes] = useState<Integrante[]>([])
  const [visible, setVisible] = useState(false)
  const [queEs, setQueEs] = useState(false)
  const [preguntas, setPreguntas] = useState(false)
  const { theme, toggle } = useTheme()

  useEffect(() => {
    fetch('/integrantes.json')
      .then((res) => res.json())
      .then(setIntegrantes)
  }, [])

  return (
    <>
      <nav id="topbar">
        <button onClick={() => setQueEs(true)}>Que es</button>
        <button onClick={() => setPreguntas(true)}>Preguntas</button>
        <button onClick={() => setVisible(!visible)}>Nosotros</button>
      </nav>

      <button id="theme-toggle" onClick={toggle}>
        {theme === 'dark' ? 'Claro' : 'Oscuro'}
      </button>

      {visible && (
        <section id="integrantes">
          {integrantes.map((i) => (
            <Card key={i.nombre} nombre={i.nombre} rol={i.rol} />
          ))}
        </section>
      )}

      {queEs && (
        <section id="que-es">
          <p>
            Rodeo es una aplicación web la cual ayuda a los productores ganaderos
            a gestionar sus lotes, planificar sus pastoreos y saber la posición de
            su ganado.
          </p>
          <button onClick={() => setQueEs(false)}>Volver</button>
        </section>
      )}

      {preguntas && (
        <div id="popup" onClick={() => setPreguntas(false)}>
          <div className="popup-box" onClick={(e) => e.stopPropagation()}>
            <h3>¿Ya funciona? ¿Cómo contactarnos?</h3>
            <p>
              Sí, ya es un prototipo funcional, pero todavía tiene que
              calibrarse. Contactanos a rodeoproyecto@gmail.com y te mandamos
              una demo.
            </p>
            <button onClick={() => setPreguntas(false)}>Cerrar</button>
          </div>
        </div>
      )}

      <footer id="footer">
        <a href="#nosotros">Nosotros</a>
        <small>© 2026 Rodeo. Todos los derechos reservados.</small>
      </footer>
    </>
  )
}

export default App
