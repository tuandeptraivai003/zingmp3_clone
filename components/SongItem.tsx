"use client"


import useLoadSongImage from '@/hooks/useLoadSongImage';
import { Artist, Song } from '../types';
import useLoadArtistImage from '@/hooks/useLoadArtistImage';
import Image from 'next/image';
import PlayButton from './PlayButton';
import { twMerge } from 'tailwind-merge';

import LikeButton from './LikeButton';
import { useUser } from "@/hooks/useUser";



interface SongItemProps {
    data: Song,
    artist: Artist,
    className?: string,
    onClick: (id: string) => void
}

const SongItem: React.FC<SongItemProps> = ({ data, artist, onClick, className }) => {

    const songImagePath = useLoadSongImage(data)
    const artistImagePath = useLoadArtistImage(artist)
    const {user} = useUser()
    const handleClick = () => {
        if(onClick) {
            return onClick(data.id)
        }
    }

    return (<div onClick={handleClick} className={twMerge("flex w-full items-center justify-start px-4 py-2 rounded-md bg-neutral-400/10 hover:bg-neutral-400/50 drop-shadow-md gap-4 cursor-pointer", className)}>
        <div className='relative aspect-square w-24 h-16 rounded-md overflow-hidden'>
            <Image
                className='object-cover w-full h-full'
                fill
                src={songImagePath || "/img/song.jpg"}
                alt={data.title}
            />
        </div>

        <div className='flex flex-col items-start justify-start gap-y-1'>
            <p className='w-full md:w-50 truncate font-semibold'>{data.title}</p>

            {artist && (
                <div className='flex items-center justify-center gap-2 '>
                    <div className='relative aspect-square  w-6 h-6 rounded-md overflow-hidden'>
                        <Image 
                            className='object-cover w-full h-full'
                            fill
                            src={artistImagePath || "/img/song.jpg"}
                            alt={artist.author}
                        />
                    </div>
                    <p className='text-sm text-neutral-300'>{artist.author}</p>
                </div>
            )}
        </div>
        {user && 
                <LikeButton songId={data.id}/>
        } 
    </div>);
}

export default SongItem;