import create from "zustand"

export const useUIModeStore = create(
  (set, get) => ({
    mode: 'dark',
    toggle: (overrideMode) => {
      const newMode = overrideMode || (get().mode === 'light' ? 'dark' : 'light')
      set({ mode: newMode })
    },
  })
)