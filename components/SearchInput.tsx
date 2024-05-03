"use client"

import qs from "query-string"
import useDebounce from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Input from "./Input";

const SearchInput = () => {
    const router = useRouter()
    const [value, setValue] = useState<string>("")
    const debounceValue = useDebounce<string>(value, 450)

    useEffect(() => {
        const query = {
            title : debounceValue
        }

        const url = qs.stringifyUrl({
            url: "/",
            query: query
        })
        router.push(url)
    }, [debounceValue, router])

    return ( <div>
        <Input 
            className="relative placeholder-black w-[500px] px-4 py-2 rounded-full bg-white/20 border-none"  
            placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát...."
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
    </div> );
}
 
export default SearchInput;