"use client"

import SongItem from "@/components/SongItem";
import useOnPlay from "@/hooks/useOnPlay";
import { Artist, Song } from "@/types";


interface PageContentProps {
    songs: Song[],
    artists: Artist[],
}

const PageContent: React.FC<PageContentProps> = ({ songs, artists }) => {
    const onPlay = useOnPlay(songs)

    if (songs?.length === 0) {
        return <div className="mt-4 text-white w-full flex items-center justify-center">Không có bài hát nào</div>
    }


    return (<div className="grid grid-cols-1 lg:grid-cols-3 mt-4 px-4 gap-4">
        {songs?.map(item => (
            <SongItem
                key={item.id}
                data={item}
                artist={artists?.filter((artist) => artist.id === item.artist_id) [0]}
                onClick={(id: string) => onPlay(id)}
            />
        ))}
    </div>);
}

export default PageContent;