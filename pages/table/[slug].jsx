import { useRouter } from 'next/router';
import MainGenDataComponent from '../../components/gen-json-table';
import { columns, fetcher } from '../../components/gen-json-table/jsph';

export default function TablePage() {
  const
    router = useRouter(),
    { query: { slug } } = router;
  console.debug('router=', router);
  return <MainGenDataComponent columns={columns} fetcher={fetcher} />
}