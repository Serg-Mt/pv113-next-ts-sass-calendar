import FilmInfo from './film-info';

const
  API_URL = `https://www.omdbapi.com/?apikey=a2b07930&s=green`,
  config = {
    API_URL,
    columns: [
      { title: 'Id', getVal: ({ id }) => id },
      { title: 'Title', getVal: obj => obj.Title },
      { title: 'Year', getVal: ({ Year }) => Year },
      { title: 'Poster', getVal: ({ Poster }) => <img src={Poster} alt={name} /> },
    ],
    // genObj() { return { id: Math.random() }; },
    async fetcher() {
      const
        response = await fetch(API_URL);
      if (!response.ok) throw new Error('fetch ' + response.status);
      return (await response.json()).Search.map(obj => Object.assign(obj, { id: obj.imdbID }));
    },
    async getInfo(id) {
      const
        response = await fetch(`https://www.omdbapi.com/?apikey=a2b07930&plot=full&i=${id}`);
      if (!response.ok) throw new Error('fetch ' + response.status);
      return (await response.json());
    },
    InfoComponent : ({data})=>FilmInfo({film:data})
  };

export default config;

