import style from './film-info.module.sass';

export default function FilmInfo({ film }) {
  const
    { Title, Year, Poster, Plot, Genre, Actors, Country, Runtime, imdbID } = film,
    href = `https://www.imdb.com/title/${imdbID}`;
  return <div className={style.film}>
    <img src={Poster} />
    <h3>{Title}</h3>
    <time>{Country},{Year}</time>
    <div>{Genre}, {Runtime}</div>
    <details>
      <summary>Plot</summary>
      {Plot}
    </details>
    <div>Actors:{Actors}</div>
    <a href={href} target='_blank'>{href}</a>

  </div>;
}