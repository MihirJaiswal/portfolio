import { create } from 'zustand'

interface GrayscaleState {
  isGrayscaleEnabled: boolean
  toggleGrayscale: () => void
}

export const useGrayscaleStore = create<GrayscaleState>((set) => ({
  isGrayscaleEnabled: false,
  toggleGrayscale: () => set((state) => ({ isGrayscaleEnabled: !state.isGrayscaleEnabled })),
})) 