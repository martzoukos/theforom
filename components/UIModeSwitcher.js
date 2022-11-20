import { IconButton } from "@mui/material"
import { Sun, Moon } from "lucide-react"
import { useUIModeStore } from "../lib/UIModeStore"

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
        <IconButton 
          sx={{ ml: 1 }} 
          onClick={handleClick} 
          color='inherit'
        >
          {UIMode === 'dark' ? <Sun /> : <Moon />}
        </IconButton>
    </>

  )
}