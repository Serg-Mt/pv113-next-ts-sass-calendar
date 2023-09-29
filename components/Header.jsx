import Link from 'next/link';
import styles from './Header.module.css';

const pages = [
  { href: '/', name: 'Home' },
  { href: '/calendar', name:'Calendar'},
  { href: '/table/jsph', name:'JSPH Users'},
  { href: '/table/rnm', name:'Rick & Morty'},
  { href: '/table/omdb', name:'Films'},
];


export default function Header() {
  return <header>
    <nav className={styles.nav}>
      <ul>
        {pages.map(({ href, name }) =>
          <li key={href}>
            <Link href={href}>{name}</Link></li>)}
      </ul>
    </nav>
  </header>;
}