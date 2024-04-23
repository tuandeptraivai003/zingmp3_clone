import Link from "next/link";
import React from "react";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

interface SideBarItemProps {
    icon: IconType,
    label: string,
    active? : boolean,
    href: string
}
const SideBarItem: React.FC<SideBarItemProps> = ({icon: Icon, label, active, href}) => {
    return ( 
        <Link href={href} className={twMerge(`flex h-auto items-center w-full gap-x-4 text-neutral-300 font-medium cursor-pointer transition hover:text-white py-3 pl-6 relative`, active && "text-white bg-white/20")}>
            <div className={twMerge("hidden absolute top-0 bottom-0 left-0 h-full w-0.5 rounded-[2px] bg-[#D08011] transition ease-in-out", active && "block")}></div>

            <Icon size={21}/>
            <p className="hidden md:block truncate w-full">{label}</p>   
        </Link>
    );
}
 
export default SideBarItem;