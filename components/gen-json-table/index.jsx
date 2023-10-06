import { useEffect, useState } from 'react';
import GenTable from './gen-table';
import GenFetcher from './gen-fetcher';
import FilmInfo from './omdb/film-info';

export default function MainGenDataComponent({ config: { columns, fetcher, getInfo } }) {
  const
    [data, setData] = useState(null),
    [search, setSearch] = useState(''),
    [sortByColumnN, setSortByColumnN] = useState(null), // number
    [film, setFilm] = useState(null),
    filteredData = search
      ? data?.filter(obj => columns.map(({ getVal }) => getVal(obj))
        .filter(x => 'string' === typeof x)
        .some(x => x.toLowerCase().includes(search.toLowerCase())))
      : data,
    getVal = columns[Math.abs(sortByColumnN) - 1]?.getVal || (() => null),
    sortData = sortByColumnN
      ? filteredData?.toSorted((a, b) => 'string' === typeof getVal(a) ? Math.sign(sortByColumnN) * getVal(a).localeCompare(getVal(b)) : 1)
      : filteredData;



  useEffect(() => { fetcher().then(d => setData(d)); }, [fetcher]);
  useEffect(() => {
    getInfo && getInfo('tt0109830')
      .then(json => setFilm(json))
  }, []);

  return <>
    <input value={search} onInput={evt => setSearch(evt.target.value)} />
    {data && <GenTable columns={columns} data={sortData} />}
    <hr />
    {film && <FilmInfo film={film} />}
  </>;
}