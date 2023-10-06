export default function Error({ error }) {
  return <h2 className='error' >{error.toString()} </h2>;
}
