import { useState } from 'react';
import Calendar from '../components/input-type-date/Calendar';
import InputDate from '../components/input-type-date/InputDate';
import PopUpWindow from '../components/input-type-date/PopUpWindow';
import CalendarSelector from '../components/input-type-date/CalendarSelector';
import { LocaleContext } from '../components/input-type-date/LocaleContext';
import styles from '../styles/calendar-demo.module.sass';


export default function CalendarDemoPage() {
  const
    [date, setDate] = useState(new Date),
    [month, setMonth] = useState(new Date),
    [open, setOpen] = useState(false),
    [locale, setLocale] = useState('ru-RU');

  return <div className={styles['calendar-demo']}>
    <h1>InputDate, PopUpWindow, Calendar usage demo</h1>
    <label> locale:
      <select value={locale} onChange={evt => setLocale(evt.target.value)}>
        {['ru-RU', 'en-US', 'ar', 'zh', 'ko', 'ja'].map(l =>
          <option key={l} value={l}>{l}</option>)}

      </select>
    </label>
    <hr />
    <LocaleContext.Provider value={locale}>
      <section>
        <fieldset>
          <h2>InputDate</h2>
          Дата = {date.toLocaleString(locale, { day: 'numeric', month: 'long', year: 'numeric' })}
          <InputDate startDate={date} result={res => setDate(res)} />
        </fieldset>
        <fieldset>
          <h2>PopUpWindow</h2>
          <button onClick={_ => setOpen(true)}>Open</button>
          {open && <PopUpWindow>
            <svg width="100%" height="100%" viewBox="-10.5 -9.45 21 18.9" fill="none" xmlns="http://www.w3.org/2000/svg" class="mt-4 mb-3 text-link dark:text-link-dark w-24 lg:w-28 self-center text-sm mr-0 flex origin-center transition-all ease-in-out"><circle cx="0" cy="0" r="2" fill="currentColor"></circle><g stroke="currentColor" stroke-width="1" fill="none"><ellipse rx="10" ry="4.5"></ellipse><ellipse rx="10" ry="4.5" transform="rotate(60)"></ellipse><ellipse rx="10" ry="4.5" transform="rotate(120)"></ellipse></g></svg>
            <button onClick={_ => setOpen(false)}>Close</button>
          </PopUpWindow>}
        </fieldset>
        <fieldset>
          <h2>CalendarSelector</h2>
          <CalendarSelector />
        </fieldset>
        <fieldset>
          <h2>Calendar</h2>
          Дата = {month.toLocaleString(locale, { day: 'numeric', month: 'long', year: 'numeric' })}<br />
          <input type="month"
            value={month.getFullYear() + '-' + (1 + month.getMonth()).toString().padStart(2, '0')}
            onChange={evt => setMonth(new Date(evt.target.value.slice(0, 4), evt.target.value.slice(5, 7) - 1))}
          />
          <Calendar date={month} />
        </fieldset>
        <fieldset>
          <h2>Input type=date</h2>
          <input type="date" />
        </fieldset>
      </section>
    </LocaleContext.Provider>
  </div>;
}