"use client"

import { Song } from "@/types"
import SongItem from "./SongItem";
import usePlayer from "@/hooks/usePlayer";
import useGetArtistClientSide from "@/hooks/useGetArtistOnClientSide";
import { PuffLoader } from "react-spinners";
import useSound from "use-sound"
import { FaBackwardStep, FaForwardStep, FaPause, FaPlay } from "react-icons/fa6";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import VolumeSlider from "./VolumeSlider";
import { useEffect, useState } from "react";

interface PlayerContentProps {
    song: Song,
    songUrl: string
}

const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl }) => {

    const player = usePlayer()
    const { artists, isLoading: artistLoading } = useGetArtistClientSide()

    const [isPlaying, setIsPlaying] = useState(false)
    const [volume, setVolume] = useState(1)

    const Icon = isPlaying ? FaPause : FaPlay
    const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave


    // xử lý Next bài
    const onPlayNext = () => {
        if (player.ids.length === 0) {
            return
        }
        const currentIndex = player.ids.findIndex((id) => id === player.activeId)
        const nextSong = player.ids[currentIndex + 1]

        if (!nextSong) {
            return player.setId(player.ids[0])
        }
        player.setId(nextSong)
    }

    // xử lý Trở lại bài 
    const onPlayPreious = () => {
        if (player.ids.length === 0) {
            return
        }
        const currentIndex = player.ids.findIndex((id) => id === player.activeId)
        const playPreious = player.ids[currentIndex - 1]

        if (!playPreious) {
            return player.setId(player.ids[player.ids.length - 1])
        }
        player.setId(playPreious)
    }

    // xử lý bật tắt bài hát
    const [play, { pause, sound }] = useSound(songUrl, {
        volume: volume,
        onplay: () => setIsPlaying(true),
        onend: () => {
            setIsPlaying(false),
                onPlayNext()
        },
        onpause: () => setIsPlaying(false),
        format: ["mp3"]
    })

    useEffect(() => {
        sound?.play()
        return () => {
            sound?.unload()
        }
    }, [sound])

    const handlePlay = () => {
        if (!isPlaying) {
            play()
        } else {
            pause()
        }
    }

    const toggleMute = () => {
        if(volume === 0) {
            setVolume(1)
        }else {
            setVolume(0)
        }
    }

    if (artistLoading) return (
        <div className="flex w-full h-20 items-center justify-center">
            <PuffLoader color="#10B981" size={40} />
        </div>
    )

    return (<div className="grid grid-cols-2 md:grid-cols-3 h-full">
        <div className="w-full flex justify-start items-start">
            <SongItem
                className="bg-transparent w-auto"
                onClick={() => { }}
                artist={artists.filter((artist) => artist.id === song.artist_id)[0]}
                data={song}
            />
        </div>
        {/* Trở lại bài  */}
        <div className="hidden h-full md:flex justify-center items-center w-full max-w-[720px] gap-x-6">
            <FaBackwardStep
                size={20}
                onClick={onPlayPreious}
                className="text-neutral-400 cursor-pointer hover:text-white transition"
            />
            {/* Bật tắt bài hát */}
            <div onClick={handlePlay} className="h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer">
                <Icon className="text-black" size={20} />
            </div>
            {/* Next bài  */}
            <FaForwardStep
                size={20}
                onClick={onPlayNext}
                className="text-neutral-400 cursor-pointer hover:text-white transition"
            />
        </div>
        <div className="hidden md:flex justify-end w-full">
            <div className="flex items-center gap-x-2 w-[120px]">
                <VolumeIcon
                    size={25}
                    onClick={toggleMute}
                    className="text-neutral-400 cursor-pointer hover:text-white transition"
                />
                <VolumeSlider value={volume} onChange={(value) => setVolume(value)} />
            </div>
        </div>
    </div>);
}

export default PlayerContent;