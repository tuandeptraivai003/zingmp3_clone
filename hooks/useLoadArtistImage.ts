import { Artist } from '@/types';
import { useSupabaseClient } from '@supabase/auth-helpers-react';


const useLoadArtistImage = (artist: Artist) => {
    const supabaseClient = useSupabaseClient()

    if(!artist) {
        return null
    }
    const {data : imageData} = supabaseClient.storage.from("images").getPublicUrl(artist.picture)
    return imageData.publicUrl
}
 
export default useLoadArtistImage;