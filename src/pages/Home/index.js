import { useEffect, useState } from "react";
import api from '../../services/api'
import { Link } from 'react-router-dom';

import "../../css/home.css";

function Home() {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilmes() {
      const response = await api.get(
        "/movie/now_playing", {
          params: {
            api_key: 'f8ba6495828ed369ddaccbd0a8832ec5',
            language: 'pt- BR',
            page: 1
          }
        }
      );

      setFilmes(response.data.results);
      setLoading(false);
    };

    loadFilmes();

  }, [])

  if (loading) {
    return (
      <div className="loading">
        <h2>Carregando filmes...</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="lista-filmes">
        {filmes.map((filme, index) => {
          return (
            <article key={index}>
              <strong>{filme.title}</strong>
              <img
                src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`}
                alt={filme.title}
              />
              <Link to={`/filme/${filme.id}`}>Mais Detalhes</Link>
            </article>
          );
        })}
      </div>
    </div>
  );
}


export default Home;
