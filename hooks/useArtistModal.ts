import { create } from "zustand";

interface ArtistModalStore {
    isOpen: boolean,
    onOpen: () => void,
    onClose: () => void,
}

const useArtistModal = create<ArtistModalStore> ((set) => ({
    isOpen: false,
   onOpen: () => set ({isOpen: true}),
   onClose: () => set ({isOpen: false}),
}))

export default useArtistModal