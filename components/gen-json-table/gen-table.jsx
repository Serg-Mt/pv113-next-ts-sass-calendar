import { Fragment } from 'react';
import style from './GenTable.module.sass';
export default function GenTable({ columns, data, sortByColumnN, editetId, children }) {
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
        <Fragment key={obj.id}>
          {String(obj.id) === String(editetId)
            ? <>{children}</>
            : <tr key={obj.id}>
              {columns.map(({ title, getVal }) => <td key={title}>{getVal(obj)}</td>)}
            </tr>}
        </Fragment>
      )}
    </tbody>
    <tfoot>
      {!editetId && <>{children}</>}
    </tfoot>
  </table>;
}