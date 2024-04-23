"use client"

import { Artist } from "@/types";
import ArtistItem from "./ArtistItem";

interface PageContentProps {
    artist: Artist[]
}

const PageContent: React.FC<PageContentProps> = ({artist}) => {
    
    if(artist?.length === 0) {
        return <div className="mt-4 text-white w-full flex items-center justify-center">Không có nghệ sĩ nào</div>
    }

    return <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 mt-4 px-4 gap-4">
        {artist.map(item => (
            <ArtistItem key={item.id} onClick={() => {}} data={item} />
        ))}
    </div>

}
 
export default PageContent;