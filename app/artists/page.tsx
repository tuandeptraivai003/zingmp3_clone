import getArtists from "@/actions/getArtists";
import PageContent from "./components/PageContent";

export const revalidate = 0

const Artists = async () => {
    const artists = await getArtists()
    return (
        <div className="rounded-lg h-full w-full overflow-hidden overflow-y-auto">
        <h2>Tuấn đẹp trai</h2>
            {/* Page Content */}
            <PageContent artist={artists}/>    
        </div>
    );
}
 
export default Artists;