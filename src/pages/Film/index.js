import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'

import "../../css/film.css";

import api from "../../services/api";

function Film() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [filme, setFilme] = useState({});

  useEffect(() => {
    async function loadFilme() {
      await api
        .get(`/movie/${id}`, {
          params: {
            api_key: "f8ba6495828ed369ddaccbd0a8832ec5",
            language: "pt- BR",
          },
        })
        .then((response) => {
          setFilme(response.data);
          setLoading(false);
        })
        .catch(() => {
          navigate("/", { replace: true });
        });
    }

    loadFilme();

    return () => {
      console.log("Desmontado!");
    };
  }, [navigate, id]);

  function salvarFilme() {
    const minhaLista = localStorage.getItem("@primeflix");

    let filmesSalvos = JSON.parse(minhaLista) || [];

    const hasFilme = (filmesSalvos.some((filmesSalvos) => filmesSalvos.id === filme.id));

    if (hasFilme) {
      toast.warn("Filme já está na lista!");
      return;
    } else {
      filmesSalvos.push(filme);
      localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
      toast.success("Filme salvo com sucesso!");
    }
  }

  if (loading) {
    return (
      <div className="filme-info">
        <h2>Carregando detalhes do filme...</h2>
      </div>
    );
  }

  return (
    <div className="filme-info">
      <img
        src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`}
        alt={filme.title}
      />

      <h3>Sinopse</h3>
      <span>{filme.overview}</span>

      <strong>Avaliação: {filme.vote_average} / 10</strong>

      <div className="area-buttons">
        <button onClick={salvarFilme}>Salvar</button>
        <button>
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://youtube.com/results?search_query=${filme.title} Trailer`}
          >
            Trailer
          </a>
        </button>
      </div>
    </div>
  );
}

export default Film;
