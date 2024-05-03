import getArtists from "@/actions/getArtists"
import getSongsByTitle from "@/actions/getSongsByTitle"
import PageContent from "./components/PageContent"

interface SearchProps {
    searchParams: {
        title: string
    }
}

export const revalidate = 0

const Search = async ({searchParams} : SearchProps) => {
    const songs = await getSongsByTitle(searchParams.title)
    const artists = await getArtists()
    return ( <div className="h-full w-full overflow-hidden overflow-y-auto ">
        <h2 className="text-[20px] px-6 pt-4 font-semibold">Có thể bạn muốn nghe</h2>
        <PageContent songs = {songs} artists={artists}/>
    </div> );
}
 
export default Search;