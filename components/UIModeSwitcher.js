import { Sun, Moon } from "lucide-react"
import { useUIModeStore } from "../lib/UIModeStore"
import Button from "./Button"

export const UIModeSwitcher = () => {
  const UIMode = useUIModeStore(state => state.mode)
  const UIModeToggle = useUIModeStore(state => state.toggle)
  const handleClick = () => {
    UIModeToggle()
    localStorage.setItem('UIMode', UIMode === 'dark' ? 'light' : 'dark'); //invert values because state is not yet updated
  }
  return (
    <>
      {UIMode} mode
        <Button 
          sx={{ ml: 1 }} 
          onClick={handleClick} 
          color='inherit'
        >
          {UIMode === 'dark' ? <Sun /> : <Moon />}
        </Button>
    </>

  )
}