import { create } from 'zustand'

interface CallStore {
  isJustCalled: boolean
  setIsJustCalled: (value: boolean) => void
}

export const useCallStore = create<CallStore>((set) => ({
  isJustCalled: false,
  setIsJustCalled: (value: boolean) => set({ isJustCalled: value }),
}))
