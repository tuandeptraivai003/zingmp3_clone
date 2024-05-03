import { FaPlay } from "react-icons/fa6";

const PlayButon = () => {
    return ( <button className="flex items-center bg-[#D08011] p-3 opacity-0 drop-shadow-md rounded-full transate translate-y-1/4 group-hover:translate-y-0 group-hover:opacity-100 hover-scale-110">
        <FaPlay className="text-white"/>
    </button> );
}
 
export default PlayButon;