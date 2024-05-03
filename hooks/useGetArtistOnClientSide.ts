import { Artist } from '@/types';
import { useSessionContext } from '@supabase/auth-helpers-react';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';

const useGetArtistClientSide = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [artists, setArtists] = useState<Artist[]>([])
    const { supabaseClient } = useSessionContext()
    
    useEffect(() => {
        setIsLoading(true)

        const fetchArtists = async () => {
            const {data, error} = await supabaseClient.from("artists").select("*")
            
            if(error) {
                setIsLoading(false)
                return toast.error(error.message)
            }

            setArtists((data as Artist[]) || [])
            setIsLoading(false)
        }
        fetchArtists()
    }, [supabaseClient])
    return useMemo(() => ({isLoading, artists}), [isLoading, artists]) 
}

export default useGetArtistClientSide
    

