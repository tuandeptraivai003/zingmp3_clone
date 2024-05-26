"use client"

import useAuthModal from "@/hooks/useAuthModal"
import Modal from "./Modal";
import { useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useEffect } from "react";



const AuthModal = () => {

    const supabaseClient = useSupabaseClient()
    const router = useRouter()
    const { session } = useSessionContext()

    const { onClose, isOpen } = useAuthModal()
    const onChange = (open: boolean) => {
        if (!open) {
            onClose();
        }
    }

    useEffect(() => {
        if (session) {
            router.refresh();
            onClose();
        }
    }, [session, router, onClose])

    return (
        <Modal
            title="Xin chào"
            description=""
            isOpen={isOpen}
            onChange={onChange}
        >
            <Auth supabaseClient={supabaseClient} theme="dark" providers={[]}
                appearance={{
                    theme: ThemeSupa,
                    variables: {
                        default: {
                            colors: {
                                brand: '#444',
                                brandAccent: '#000',
                            },
                        },
                    },
                }}
            />
        </Modal>
    );
}

export default AuthModal;