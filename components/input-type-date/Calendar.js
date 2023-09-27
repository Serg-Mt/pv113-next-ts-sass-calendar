import { memo, useContext, useMemo } from 'react';
import { LocaleContext } from './LocaleContext';

import styles from './Calendar.module.css';

export default memo(function Calendar({ date, onClick }) {
  const
    locale = useContext(LocaleContext),   //    ⬇⬇⬇  2019, 0, 0 -  just a Monday
    dayNames = useMemo(_=>[...Array(7)].map((_, i) => (new Date(2019, 0, i)).toLocaleDateString(locale, { weekday: 'short' })),[locale]),
    year = date.getFullYear(),
    month = date.getMonth(),
    monthName = date.toLocaleDateString(locale, { month: 'long' }),
    daysInMonth = (new Date(year, month + 1, 0)).getDate(), // число предшествующее 1 числу (нулевое) следующего месяца и есть число дней в текущем
    firstDayOfWeek = (new Date(year, month, 1)).getDay(),   // ВС=0 ПН=1 ВТ=2 .. СБ=6 
    startShift = (-1 + firstDayOfWeek + 7) % 7;             //      ПН=0 ВТ=1 .. СБ=5 ВС=6

  return <table className={styles.calendar}>
    <caption>{monthName}, {year}</caption>
    <thead><tr>
      {dayNames.map(day => <th key={day}>{day}</th>)}
    </tr>
    </thead>
    <tbody
      onClick={evt => {
        const day = evt.target.closest('td').textContent;
        if (day && onClick) {
          const
            d = new Date(date.setDate(+day));
          onClick(d);
        }
      }}>
      <Month shift={startShift} max={daysInMonth} selected={date.getDate()} />
    </tbody>
  </table>;

});

function Week({ start, max, selected }) {
  return <tr>
    {[...Array(7)].map((_, index) => +start + index).map(day =>
      <td key={day} className={+selected === day ? styles.selected : ''}>
        {day >=1 && day <= max && day}
      </td>)}
  </tr>;
}

function Month({ shift, max, selected }) {
  const
    result = [];
  for (let weekStart = 1 - shift; weekStart <= +max; weekStart += 7) {
    result.push(<Week key={weekStart} start={weekStart} {...{ max, selected }} />);
  }
  return <>{result}</>;
}

