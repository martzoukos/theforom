import Image from 'next/image';
import Link from 'next/link';
import Styles from './Logo.module.css';

export default function Logo() {
  return (
    <Link href="/">
      <Image 
        src='/logo.svg'
        alt='theforom logo'
        width='175'
        height='30'
      />
    </Link>
  )
}