import { Song } from '@/types';
import { useSupabaseClient } from '@supabase/auth-helpers-react';


const useLoadSongImage = (song: Song) => {
    const supabaseClient = useSupabaseClient()

    if(!song) {
        return null
    }
    const {data : imageData} = supabaseClient.storage.from("images").getPublicUrl(song.image_uri)
    return imageData.publicUrl
}
 
export default useLoadSongImage;