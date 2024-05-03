import { create } from "zustand";

interface SongModalStore {
    isOpen: boolean,
    onOpen: () => void,
    onClose: () => void,
}

const useSongModal = create<SongModalStore> ((set) => ({
    isOpen: false,
   onOpen: () => set ({isOpen: true}),
   onClose: () => set ({isOpen: false}),
}))

export default useSongModal