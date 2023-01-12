import { useEffect, useState } from 'react'
import { useParams, useNavigate, useNavigation } from 'react-router-dom'
import api from '../../services/api'
import './filme.css'
import { toast } from 'react-toastify'

function Filme() {
  //pega o id que vem do home
  const { id } = useParams();
  const navigate = useNavigate();


  const [filme, setFilme] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadFilme() {
      await api.get(`/movie/${id}`, {
        params: {
          api_key: 'c19707619312f0e896bd8f16b04af428',
          language: 'pt-BR',

        }
      })
        .then((response) => {
          setFilme(response.data)
          setLoading(false)

        })
        .catch(() => {
          console.log('Filme não encontrado!')
          navigate("/", {
            replace: true
          })
          return;
        })
    }
    loadFilme()

    return () => {

    }
  }, [navigate, id])//passando dependências para o useEffect

  function salvaFilme() {
    const minhaLista = localStorage.getItem("@primeflix");
    let filmesSalvos = JSON.parse(minhaLista) || [];
    const hasFilme = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id)
    if (hasFilme) {
      toast.warn("Filme já está salvo!")
      return;
    }
    //se o filme n existir, ele será add 
    filmesSalvos.push(filme)
    localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos))
    toast.success("Filme salvo com sucesso!")

  }

  if (loading) {
    return (
      <div className='filme-info'>
        <h1>Carregando Detalhes...</h1>
      </div>
    )
  }
  return (
    <div className='filme-info'>

      <h1>{filme.title}</h1>
      <img src={`http://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />
      <h3>Sinopse</h3>
      <span>{filme.overview}</span>
      <strong>Avaliação: {filme.vote_average} /10</strong>
      <div className='area-butons'>
        <button onClick={salvaFilme}>Salvar</button>
        <button>
          <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>Trailer</a>
        </button>

      </div>

    </div>
  )
}
export default Filme