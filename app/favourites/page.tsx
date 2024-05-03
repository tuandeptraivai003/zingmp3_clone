import getArtists from "@/actions/getArtists";
import getFavourites from "@/actions/getFavourites";
import PageContent from "./components/PageContent";


export const revalidate = 0

const Favourites = async () => {
    const songs = await getFavourites()
    const artists = await getArtists()
    return ( <div className="w-full flex-1">
        <h2 className="text-[20px] px-6 pt-4 font-semibold">Danh sách bài hát yêu thích</h2>
        <PageContent songs={songs} artists={artists}/>
    </div> );
}
 
export default Favourites;