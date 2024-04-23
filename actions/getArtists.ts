import { Artist } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getArtists = async () : Promise<Artist[]> => {
    const supbase = createServerComponentClient({
        cookies: cookies,
    })

    const { data, error } = await supbase.from("artists").select("*").order("created_at", {ascending: false})
    if (error) {
        console.log(error)
    }

    return (data as any) || []
}

export default getArtists