import { User } from "@supabase/auth-helpers-nextjs";
import { createContext, useContext, useEffect, useState } from "react";
import { useSessionContext, useUser as useSupaUser } from "@supabase/auth-helpers-react";

import { Subscription, UserDetails } from "@/types";
import SupabaseProvider from '../providers/SupabaseProvider';

type UserContextType = {
    accessToken: string | null,
    user: User | null,
    userDetails: UserDetails | null,
    isLoading: boolean,
    subscription: Subscription | null,
}

export const UserContext = createContext<UserContextType | undefined> (
    undefined
)

export interface Props {
    [propName: string]: any,
}

export const MyUserContextProvider = (props : Props) => {
    const {session, isLoading: isUserLoading, supabaseClient: supabase} = useSessionContext()
    
    const user = useSupaUser()

    const accessToken = session?.access_token ?? null 

    const [isLoadingData, setIsLoadingData] = useState(false)
    const [userDetails, setUserDetails] = useState<UserDetails | null> (null)
    const [subscription, setSubscription] = useState<Subscription | null> (null)

    // chức năng lấy chi tiết người dùng
    const getUserDetails = () => supabase.from("users").select("*").single()
    
    // chức năng lấy chi tiết đăng ký
    const getSubscription = () => supabase.from("supscriptions") 
    .select("*, prices(*, products(*))")
    .in("status", ["trialing", "active"])
    .single()

    useEffect(() => {
        if(user && !isLoadingData && !userDetails && !subscription) {
            setIsLoadingData(true)
            Promise.allSettled([getUserDetails(), getSubscription()]).then((results) => {
                const userDetailsPromise = results[0]
                const subscriptionDetailPromise = results[1]

                if(userDetailsPromise.status === "fulfilled") {
                    setUserDetails(userDetailsPromise.value.data as UserDetails)
                }

                if(subscriptionDetailPromise.status === "fulfilled") {
                    setSubscription(subscriptionDetailPromise.value.data as Subscription)
                }
                setIsLoadingData(false)
            })

        } else if (!user && !isLoadingData && !isUserLoading) {
            setUserDetails(null)
            setSubscription(null)
        }
    }, [user, isUserLoading])

    const value = {
        accessToken,
        user,
        userDetails,
        isLoading: isUserLoading || isLoadingData,
        subscription
    }
    return <UserContext.Provider value={value} {...props}/>
}

export const useUser = () => {
    const context = useContext(UserContext)
    
    if(context === undefined) {
        throw new Error("useUer must be used within a MyUserContextProdiver");
    }
    return context
}
