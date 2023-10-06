import { useState } from 'react';
import toast from 'react-hot-toast';
import useSWR from 'swr';
import Error from './Error';
import GenTable from './gen-table';

function Form({ columns, values, setValues }) {
  return <tr>
    {columns.map(({ title, setVal, getVal }, index) =>
      <td key={title}>
        {setVal
          ? <input value={values[index]} onInput={evt => setValues(old => old.with(index, evt.target.value))} />
          : '...'
        }
      </td>)}
    <td>
      <button data-id={''} data-action='ok'>🆗</button>
      <button data-id={''} data-action='cancel'>✖️</button>
    </td>
  </tr>;
}

export default function MainGenDataComponent({ config: { columns, fetcher, getInfo, InfoComponent, API_URL } }) {
  const
    // [data, setData] = useState(null),
    { data, error, isLoading, isValidating, mutate } = useSWR(API_URL, fetcher),
    [search, setSearch] = useState(''),
    [sortByColumnN, setSortByColumnN] = useState(-1), // number
    [editetId, setEditetId] = useState(null),
    [values, setValues] = useState(columns.map(() => '-')),
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

  async function onClick(evt) {
    const
      source = evt.target.closest('button[data-action][data-id]');
    if (source) {
      const { id, action } = source.dataset;
      let optimisticData;
      const
        promise = (() => {
          switch (action) {
            case 'del':
              optimisticData = data.filter(el => String(el.id) !== id);
              return fetch(API_URL + id, { method: 'DELETE' })
                .then(async res => {
                  if (!res.ok) {
                    throw (new Error(res.status + ' ' + res.statusText));
                  }
                });
            case 'ok':
              setEditetId(null);
              if (editetId) { // edit
                const
                  index = data.findIndex((obj) => String(obj.id) === String(editetId)),
                  newObj = { ...data[index] };
                columns.forEach(({ setVal }, i) => Object.assign(newObj, setVal?.(values[i])));
                optimisticData = data.with(index, newObj);
                setValues(columns.map(() => ''));
                return fetch(API_URL + editetId,
                  {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newObj)
                  })
                  .then(async res => {
                    if (!res.ok) {
                      throw (new Error(res.status + ' ' + res.statusText));
                    }
                  });

                // eslint-disable-next-line no-else-return
              } else { // add
                const newObj = { id: Math.random(), address: {} };
                columns.forEach(({ setVal }, index) => Object.assign(newObj, setVal?.(values[index])));
                optimisticData = data.concat(newObj);
                setValues(columns.map(() => '+'));
                return fetch(API_URL,
                  {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newObj)
                  })
                  .then(async res => {
                    if (!res.ok) {
                      throw (new Error(res.status + ' ' + res.statusText));
                    }
                  });

              }
          }
        })();
      if (promise) {
        toast.promise(promise, {
          loading: 'Fetching ' + action,
          success: 'ok',
          error: (err) => `${err.toString()}`,
        });
        await mutate(promise.then(fetcher, fetcher), { optimisticData, populateCache: true, revalidate: false });
      }
      switch (action) {
        case 'info':
          if (getInfo) getInfo(id).then(json => setInfo(json));
          return;
        case 'edit':
          setEditetId(id);
          const index = data.findIndex((obj) => String(obj.id) === String(id));
          setValues(columns.map(({ setVal, getVal }) => setVal ? getVal(data[index]) : '-'));
          return;
        case 'cancel':
          setEditetId(null);
          setValues(columns.map(() => '_'));
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
    {error && <Error error={error} />}
    {data &&
      <GenTable columns={columnsWithButtons} data={sortData} sortByColumnN={sortByColumnN} editetId={editetId}>
        <Form columns={columns} values={values} setValues={setValues} />
      </GenTable>}
    <hr />
    {info && <InfoComponent data={info} />}
  </div>;
}