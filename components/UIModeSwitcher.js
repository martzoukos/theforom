import { Sun, Moon } from "lucide-react"
import { useUIModeStore } from "../lib/UIModeStore"
import styles from './UIModeSwitcher.module.css'

export const UIModeSwitcher = () => {
  const UIMode = useUIModeStore(state => state.mode)
  const UIModeToggle = useUIModeStore(state => state.toggle)

  const handleClick = () => {
    UIModeToggle()
    localStorage.setItem('UIMode', UIMode === 'dark' ? 'light' : 'dark'); //invert values because state is not yet updated
  }
  return (
    <button onClick={handleClick} className={styles.button}>
      {UIMode === 'dark'
        ? <span className={styles.buttonContent}>
            <Sun size={16} className={styles.icon} /> 
            <span>Turn the lights on</span>
          </span>
        : <span className={styles.buttonContent}>
            <Moon size={16} className={styles.icon} />
            <span>Go to dark mode</span>
          </span>
      }
    </button>

  )
}

const randomMessage = messages => {
  messages[Math.floor(Math.random()*messages.length)];
}