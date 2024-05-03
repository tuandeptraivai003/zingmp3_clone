import useLoadArtistImage from "@/hooks/useLoadArtistImage";
import { Artist } from "@/types";
import Image from "next/image";

interface ModalArtistItemProps {
    data: Artist,
    onClick: (id: string) => void,
    selected: boolean
}


const ModalArtistItem: React.FC<ModalArtistItemProps> = ({data, onClick, selected}) => {
    const imagePath = useLoadArtistImage(data)
    return ( <div
        onClick={() => onClick(data.id)}
        className={`flex items-center justify-center border-2 px-2 py-1 rounded-md gap-2 ${selected ? "border-[#D08011]" : "border-white/20"}`}>
        <div className="w-7 h-7 flex items-center justify-center bg-neutral-400 rounded-md relative overflow-hidden">
            <Image 
                alt={data.author}
                src={imagePath || "img/avatar.jpg"}
                fill
                className="object-cover"
            />
        </div>
        <p className="text-sm text-white w-full truncate">{data.author}</p>
    </div> )
}

export default ModalArtistItem