import style from './PopUpWindow.module.css';

export default function PopUpWindow({ children }) {
  return <div className={style['pop-up']}>{children}</div>;
}