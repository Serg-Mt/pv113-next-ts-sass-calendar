// import { useEffect } from 'react';
// import { useState } from 'react';
// import Spinner from './Spinner';
// import Error from './Error';

// export default function GenFetcher({ fetcher, children, setData }) {
//   const
//     [error, setError] = useState(null);
//   useEffect(() => {
//     async function f() {
//       try {
//         setError(null);
//         setData(await fetcher);
//       } catch (err) {
//         setError(err);
//       }
//     };
//     f();
//   }, []);
//   if (error) return <Error error={error} />;
//   if (hasData) return <>{children}</>;
//   return <Spinner />;
// }