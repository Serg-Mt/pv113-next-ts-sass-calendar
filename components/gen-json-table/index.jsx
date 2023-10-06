import { useEffect, useState } from 'react';
import GenTable from './gen-table';


export default function MainGenDataComponent({ config: { columns, fetcher, getInfo, InfoComponent } }) {
  const
    [data, setData] = useState(null),
    [search, setSearch] = useState(''),
    [sortByColumnN, setSortByColumnN] = useState(null), // number
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

  }



  useEffect(() => { fetcher().then(d => setData(d)); }, [fetcher]);


  return <div onClick={onClick}>
    <input value={search} onInput={evt => setSearch(evt.target.value)} />
    {data && <GenTable columns={columnsWithButtons} data={sortData} />}
    <hr />
    {info && <InfoComponent data={info} />}
  </div>;
}