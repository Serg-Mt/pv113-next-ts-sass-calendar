import { useRouter } from 'next/router';
import MainGenDataComponent from '../../components/gen-json-table';
import jsph from '../../components/gen-json-table/jsph';
import omdb from '../../components/gen-json-table/omdb';
import rnm from '../../components/gen-json-table/rnm';
import Error from 'next/error';


export default function TablePage() {
  const
    router = useRouter(),
    { query: { slug } } = router,
    config = ({ jsph, omdb, rnm })[slug];
  if (config)
    return <MainGenDataComponent key={slug} config={config} />;
  return <Error statusCode={'wrong way'} />;
}