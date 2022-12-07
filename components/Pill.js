import { X } from 'lucide-react'
import Button from './Button'
import styles from './Pill.module.css'

export default function Pill({ name, onClick }) {
  return(
    <Button 
      type='button' 
      className={styles.pill}
      onClick={onClick}
    >
      <span className={styles.name}>
        {name}
      </span>
      <X size={12} className={styles.icon} />
    </Button>
  )
}