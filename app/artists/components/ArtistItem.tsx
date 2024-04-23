"use client"

import useLoadArtistImage from "@/hooks/useLoadArtistImage"
import { Artist } from "@/types"
import Image from "next/image"

interface ArtistItemProps {
    data: Artist,
    onClick: (id: string) => void
}

const ArtistItem: React.FC<ArtistItemProps> = ({ data, onClick }) => {
    const imagePath = useLoadArtistImage(data)

    const handleClick = (id: string) => {
        console.log(id)
        onClick(data.id)
    }
    
    return (<div onClick={() => onClick(data.id)} className=" relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-4 bg-neutral-400/5 cursor-pointer transition p-2 ">
        <div className="relative aspect-square w-full h-full rounded-md overflow-hidden bg-neutral-400/5 ">
            <Image
                className="object-cover"
                fill
                src={imagePath || "img/avatar.jpg"}
                alt={data.author}
            />
        </div>
        <p className="truncate text-sm w-full font-semibold text-center">
            {data?.author}
        </p>
    </div>
    )
}

export default ArtistItem;