import { create } from 'zustand'

interface ModalStore {
  isOpen: boolean
  data: { memberId?: string }
  onOpen: (data: { memberId?: string }) => void
  onClose: () => void
}

export const useConfirmModal = create<ModalStore>((set) => ({
  isOpen: false,
  data: {},
  onOpen: (data = {}) => {
    set({ isOpen: true, data })
  },
  onClose: () => {
    set({ isOpen: false, data: {} })
  },
}))
