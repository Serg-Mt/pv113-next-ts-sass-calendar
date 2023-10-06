import style from './GenTable.module.sass';
export default function GenTable({ columns, data, sortByColumnN }) {
  return <table className={style.gentable}>
    <thead>
      <tr>
        {columns.map(({ title }, index) =>
          <th
            key={title}
            className={[
              index === Math.abs(sortByColumnN) - 1 ? style.sort : '',
              index === -sortByColumnN - 1 ? style.desc : ''].join(' ')}
          >
            {title}</th>)}
      </tr>
    </thead>
    <tbody>
      {data.map(obj =>
        <tr key={obj.id}>
          {columns.map(({ title, getVal }) => <td key={title}>{getVal(obj)}</td>)}
        </tr>)}
    </tbody>
  </table>;
}