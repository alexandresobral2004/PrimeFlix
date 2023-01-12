import './erro.css'
import { Link } from 'react-router-dom'
function Erro() {
  return (
    <div className='not-found'>
      <h1>404</h1>
      <h2>Página não Encontrada!!</h2>
      <Link to="/">Todos os Filmes</Link>

    </div>
  )
}
export default Erro