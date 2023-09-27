import { useContext, useState } from 'react';

import { LocaleContext } from './LocaleContext';
import CalendarSelector from './CalendarSelector';
import PopUpWindow from './PopUpWindow';

import style from './InputDate.module.css';


export default function InputDate({ startDate, result }) {
  const
    [date, setDate] = useState(new Date(startDate || Date.now())),
    [openDialog, setOpen] = useState(false),
    locale = useContext(LocaleContext);
  return <>
    <div className={style['input-date']} onClick={_ => setOpen(true)}>
      {date.toLocaleDateString(locale, { day: '2-digit', month: '2-digit', year: 'numeric' })}
    </div>
    {openDialog
      && <PopUpWindow>
        <CalendarSelector result={res => { setOpen(false); setDate(res); result(res); }} startDate={date} />
      </PopUpWindow>}
  </>;
}