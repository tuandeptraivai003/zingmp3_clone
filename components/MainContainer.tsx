"use client";
import React, { useMemo } from "react";
import { FaArrowLeft, FaArrowRight, FaRegCompass, FaSpotify, FaUser, FaUsers } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";
import Box from "./Box";
import { BsFileEarmarkMusicFill, BsMusicNoteList } from "react-icons/bs";
import { usePathname, useRouter } from "next/navigation";
import SideBarItem from "./SideBarItem";
import RightBar from './RightBar';
import Button from "./Button";
import Link from "next/link";
import { GiImperialCrown } from "react-icons/gi";
import AuthModal from './AuthModal';
import useAuthModal from "@/hooks/useAuthModal";
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { userUser } from "@/hooks/useUser";
import Image from "next/image";
import { IoIosPersonAdd } from "react-icons/io";
import { TbMusicPlus } from "react-icons/tb";
import useArtistModal from '@/hooks/useArtistModal';
import { CiLogout } from "react-icons/ci";


interface MainContainerProps {
    children: React.ReactNode
}

const MainContainer: React.FC<MainContainerProps> = ({ children }) => {
    const bag2 = "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/backgrounds/logo-dark.svg"
    const pathName = usePathname()

    const AuthModal = useAuthModal()
    const ArtistModal = useArtistModal()

    const supabaseClient = useSupabaseClient()
    const { user } = userUser()
    const router = useRouter()

    const handleLogout = async () => {
        const { error } = await supabaseClient.auth.signOut()
        router.refresh()

        if (error) {
            console.log(error)
        }
    }

    const routes = useMemo(() => [
        {
            icon: BsFileEarmarkMusicFill,
            label: "Thư Viện",
            active: pathName === "/thuvien",
            href: "/thuvien"
        },
        {
            icon: FaRegCompass,
            label: "Khám Phá",
            active: pathName === "/",
            href: "/"
        }
    ], [pathName])

    return (<div className={twMerge(`flex h-full`, "")}>
        {/* left */}
        <div className="flex h-full flex-col bg-white/10">
            <div className="w-full flex items-center gap-3 px-4 py-6">
                <div className="someting"
                    style={{ backgroundImage: `url(${bag2})`, backgroundRepeat: "no-repeat", width: 120, height: 40, backgroundSize: "contain" }} >
                </div>
            </div>
            {/* routes */}
            <div className="hidden md:flex flex-col gap-y-2 w-[240px] h-full">
                <Box>
                    <div className="flex flex-col py-4">
                        {routes.map(item => (
                            <SideBarItem key={item.label} {...item} />
                        ))}
                    </div>
                </Box>
            </div>

            <div className="md:hidden transition flex-col items-center justify-center">
                <Box>
                    <div className="flex flex-col py-4">
                        {routes.map(item => (
                            <SideBarItem key={item.label} {...item} />
                        ))}
                    </div>
                </Box>
            </div>
        </div>

        {/* main */}
        <main className="flex-1 overflow-y-auto bg-black-50">

            {/* right */}
            <RightBar>
                {/*  */}
                <div className="float-start">
                    <Button className="bg-inherit" onClick={() => router.back()}>
                        <FaArrowLeft size={21} className="text-white " />
                    </Button>

                    <Button className="bg-inherit" onClick={() => router.forward()}>
                        <FaArrowRight size={21} className="text-white " />
                    </Button>
                </div>


                {/* search */}
                    <input className="relative placeholder-white float-start w-[500px] px-4 py-2 rounded-full bg-white/20" type="text" placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát...." />
                {/* pretium user */}
                <div className="flex flex-row gap-x-2 gap-y-2 relative bg-[#D08011] px-5 py-2 rounded-full cursor-pointer">
                    <GiImperialCrown size={23} className="text-white" />
                    <p className="text-20">Nâng cấp tài khoản</p>
                </div>

                {/* admin actions */}
                <Link href={"/artists"} className="bg-transparent placeholder-zinc-200 py-2">
                    <FaUsers size={20} className="text-neutral-400 text-2xl hover:text-white" />
                </Link>
                <Link href={"/songs"} className="bg-transparent placeholder-zinc-200 py-2">
                    <BsMusicNoteList size={20} className="text-neutral-400 text-2xl hover:text-white" />
                </Link>

                {/* loading these option only if it its matches the super admin id */}
                {
                    user?.id === process.env.NEXT_PUBLIC_SUPER_ADMIN_ID && (
                        <React.Fragment>
                            <Button onClick={ArtistModal.onOpen} className="bg-transparent">
                                <IoIosPersonAdd className="text-xl text-neutral-400 hover:text-white" />
                            </Button>

                            <Button className="bg-transparent">
                                <TbMusicPlus className="text-xl text-neutral-400 hover:text-white" />
                            </Button>
                        </React.Fragment>
                    )
                }

                {/* user profile */}
                {user ? <div className="w-12 h-12 rounded-full bg-neutral-600 cursor-pointer flex items-center justify-center relative">
                    {/* image */}
                    {
                        user?.user_metadata?.avatar_url
                            ? <Image src={user?.user_metadata?.avatar_url} alt="" fill className="w-full absolute h-full object-cover rounded-full" />
                            : <Image src="/img/avatar.jpg" alt="" fill className="w-full absolute h-full object-cover rounded-full" />
                    }
                </div> : <Button onClick={AuthModal.onOpen}>
                    <FaUser size={20} className="text-white" />
                </Button>}

                {user && (
                    <Button onClick={handleLogout}>
                        <CiLogout />
                    </Button>
                )}

            </RightBar>


            {children}

        </main>
    </div>);
}

export default MainContainer;