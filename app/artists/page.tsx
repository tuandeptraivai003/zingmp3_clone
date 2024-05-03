import getArtists from "@/actions/getArtists";
import PageContent from "./components/PageContent";

export const revalidate = 0

const Artists = async () => {
    const artists = await getArtists()
    return (
        <div className="">
        <h2 className="text-[20px] px-6 pt-4 font-semibold">Danh sách ca sĩ</h2>
        {/* Page Content */}
        <PageContent artist={artists}/>    
        </div>
    );
}
 
export default Artists;