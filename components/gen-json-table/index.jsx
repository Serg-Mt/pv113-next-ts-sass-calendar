import { useEffect, useState } from 'react';
import GenTable from './gen-table';
import useSWR from 'swr';
import Error from './Error'

export default function MainGenDataComponent({ config: { columns, fetcher, getInfo, InfoComponent, API_URL } }) {
  const
    // [data, setData] = useState(null),
    { data, error, isLoading, isValidating, mutate } = useSWR(API_URL, fetcher),
    [search, setSearch] = useState(''),
    [sortByColumnN, setSortByColumnN] = useState(-1), // number
    [info, setInfo] = useState(null),
    columnsWithButtons = columns.concat({
      title: 'actions', getVal: ({ id }) => <>
        <button data-id={id} data-action='info'>ℹ️</button>
        <button data-id={id} data-action='edit'>✏️</button>
        <button data-id={id} data-action='del'>❌</button>
      </>
    }),
    filteredData = search
      ? data?.filter(obj => columns.map(({ getVal }) => getVal(obj))
        .filter(x => 'string' === typeof x)
        .some(x => x.toLowerCase().includes(search.toLowerCase())))
      : data,
    getVal = columns[Math.abs(sortByColumnN) - 1]?.getVal || (() => null),
    sortData = sortByColumnN
      ? filteredData?.toSorted((a, b) => 'string' === typeof getVal(a) ? Math.sign(sortByColumnN) * getVal(a).localeCompare(getVal(b)) : 1)
      : filteredData;

  function onClick(evt) {
    const
      source = evt.target.closest('button[data-action][data-id]');
    if (source) {
      const { id, action } = source.dataset;
      switch (action) {
        case 'del':
          setData(data.filter(el => String(el.id) !== id));
          return;
        case 'info':
          if (getInfo) getInfo(id).then(json => setInfo(json));
          return;
      }
    }
    const
      th = evt.target.closest('thead th');
    if (th) {
      let newSortN;
      if (Math.abs(sortByColumnN) === 1 + th.cellIndex)
        newSortN = -sortByColumnN;
      else
        newSortN = 1 + th.cellIndex;
      setSortByColumnN(newSortN);
    }

  }



  // useEffect(() => { fetcher().then(d => setData(d)); }, [fetcher]);


  return <div onClick={onClick}>
    <input value={search} onInput={evt => setSearch(evt.target.value)} />
    <div style={{ position: 'absolute', fontSize: 'xxx-large' }}>
      {isLoading && <>⌛</>}
      {isValidating && <>👁</>}
    </div>
    {error && <Error error={error}/>}
    {data && <GenTable columns={columnsWithButtons} data={sortData} sortByColumnN={sortByColumnN} />}
    <hr />
    {info && <InfoComponent data={info} />}
  </div>;
}