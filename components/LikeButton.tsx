"use client"

import useAuthModal from "@/hooks/useAuthModal";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa6";
import { IoHeartOutline } from "react-icons/io5";
import toast from "react-hot-toast";


interface LikeButtonProps {
    songId: string
}

const LikeButton: React.FC<LikeButtonProps> = ({ songId }) => {
    const router = useRouter()
    const { supabaseClient } = useSessionContext()
    const authmodal = useAuthModal()
    const { user } = useUser()

    const [isLiked, setIsLiked] = useState(false)
    const Icon = isLiked ? FaHeart : IoHeartOutline
    const handleClick = async () => {
        if(!user) {
            return authmodal.onOpen()
        }
        if(isLiked) {
            const {error} = await supabaseClient
            .from("favourites")
            .delete()
            .eq("user_id", user?.id) 
            .eq("song_id", songId)

            if(error) {
                toast.error(error.message)
            }else {
                setIsLiked(false)
            }
        } else {
            const {error} = await supabaseClient
            .from("favourites")
            .insert({
                song_id: songId,
                user_id: user?.id
            })

            if(error) {
                toast.error(error.message)
            }else {
                setIsLiked(true)
                toast.success("Đã thêm vào thư viện!")
            }
        }
        router.refresh()
    }
    
    useEffect(() => {
        if(!user?.id){
            return
        }
        const fetchData = async () => {
            const {data, error} = await supabaseClient
            .from("favourites")
            .select("*")
            .eq("user_id", user?.id) 
            .eq("song_id", songId)
            .maybeSingle()
            
            if(!error && data) {
                setIsLiked(true)
            }
        }
        fetchData()
    }, [songId, supabaseClient, user?.id])

    return (
        <button
            onClick={handleClick}
            type="button"
            className="cursor-pointer hover:opacity-75 transition"
        >
            <Icon 
                className={`text-lg ${
                    isLiked ? "text-[#D08011]" : "text-neutral-400"
                }`}
            />
        </button>
    );
}

export default LikeButton;