import { useEffect, useState } from 'react';
import GenTable from './gen-table';

export default function MainGenDataComponent({ columns, fetcher }) {
  const
    [data, setData] = useState(null);
  console.debug('data=', data);
  useEffect(() => fetcher().then(d => setData(d)), [fetcher]);

  return <>
    {data && <GenTable columns={columns} data={data} />}
  </>;
}