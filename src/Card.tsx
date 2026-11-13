type Props = { nombre: string; rol: string }

function Card({ nombre, rol }: Props) {
  return (
    <article className="card">
      <h3>{nombre}</h3>
      <span className="rol">{rol}</span>
    </article>
  )
}

export default Card
