"use client"

import useGetSongById from "@/hooks/useGetSongById";
import useLoadSong from "@/hooks/useLoadSong";
import usePlayer from "@/hooks/usePlayer";
import PlayerContent from "./PlayerContent";

const Player = () => {
    const player = usePlayer()
    const { song } = useGetSongById(player.activeId)
    const songUrl = useLoadSong(song!)

    if(!song || !songUrl || !player.activeId) {
        return null
    }

    return (<div className="fixed bottom-0 bg-[#4C473E] backdrop-blur-md w-full py-2  px-4 h-99">
        <PlayerContent song={song} songUrl={songUrl} key={songUrl}/>
    </div>);
}

export default Player;