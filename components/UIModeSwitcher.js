import { IconButton } from "@mui/material"
import { Sun, Moon } from "lucide-react"
import axios from "axios"
import { useSession } from "next-auth/react"
import { useUIModeStore } from "../lib/UIModeStore"

export const UIModeSwitcher = () => {
  const UIMode = useUIModeStore(state => state.mode)
  const UIModeToggle = useUIModeStore(state => state.toggle)
  const { data: session} = useSession()
  const handleModeSwitch = () => {
    UIModeToggle()
    const uid = session.user.id
    axios.post(`/api/users/${[uid]}/uiMode`, {
      uid,
      uiMode: (UIMode === 'dark' ? 'light' : 'dark') //invert because state is not yet updated
    })
  }
  return (
    <>
      {UIMode} mode
        <IconButton 
          sx={{ ml: 1 }} 
          onClick={handleModeSwitch} 
          color='inherit'
        >
          {UIMode === 'dark' ? <Sun /> : <Moon />}
        </IconButton>
    </>

  )
}