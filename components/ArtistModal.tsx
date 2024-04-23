import { userUser } from "@/hooks/useUser";
import Modal from "./Modal";
import useArtistModal from "@/hooks/useArtistModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "./Input";
import { useState } from "react";
import Button from "./Button";
import toast from "react-hot-toast";
import uniqid from "uniqid";


const ArtistModal = () => {
    const artistModal = useArtistModal()

    const { user } = userUser()
    const supabaseClient = useSupabaseClient()
    const router = useRouter()

    const [isLoading, setIsLoading] = useState(false)

    const { register, handleSubmit, reset, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            author: "",
            description: "",
            followers: 0,
            picture: null,
        }
    })

    const onChange = (open: boolean) => {
        if (!open) {
            reset()
            artistModal.onClose()
        }
    }

    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        try {
            setIsLoading(true)
            const pictureFile = values?.picture?.[0]
            if(!pictureFile || !user || errors.author) {
                toast.error("Thêm nghệ sĩ thất bại!")
            }
            const uniqueId = uniqid()

            // Tải ảnh vào Stronge
            const {data: imageData, error: imageError} = await supabaseClient.storage.from("images").upload(`artist-image-${uniqueId}`,pictureFile, {
                cacheControl : "3600",
                upsert: false
            })
            if(imageError) {
                console.log(imageError)
                return toast.error("Tải ảnh thất bại")
            }

            // lưu trữ dữ liệu vào cơ sở dữ liệu
            const {error : supabaseError} = await supabaseClient.from("artists").
            insert({
                author: values.author,
                description: values.description,
                followers: 0,
                picture: imageData.path,
            })
            
            if(supabaseError) {
                console.log(supabaseError)
                setIsLoading(false)
                return toast.error("không thể tải lên dữ liệu")
            }

            toast.success("Thêm nghệ sĩ mới thành công!")
            reset()
            artistModal.onClose()
            router.refresh()

        } catch (error) {
            toast.error("Đã xảy ra lỗi, vui lòng thử lại sau!")
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <Modal
            title="Thêm một nghệ sĩ mới"
            description="Tạo nghệ sĩ của riêng bạn"
            isOpen={artistModal.isOpen}
            onChange={onChange}>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
                {errors?.author && (
                    <div className="w-full flex items-end justify-end">
                        <p className="text-xs text-red-500">Vui lòng nhập tên nghệ sĩ</p>
                    </div>
                )}
                <Input
                    id="author"
                    disabled={isLoading} {...register("author", { required: true })}
                    placeholder="Tên nghệ sĩ" />

                <Input
                    id="description"
                    disabled={isLoading} {...register("description")}
                    placeholder="Mô tả" />

                {errors?.picture && (
                    <div className="w-full flex items-end justify-end">
                        <p className="text-xs text-red-500">Vui lòng chọn ảnh</p>
                    </div>
                )}
                {/* upload ảnh */}
                <div>
                    <div className="pb-1">Chọn một ảnh</div>
                    <Input
                        id="picture"
                        type="file"
                        accept="image/*"
                        disabled={isLoading} {...register("picture", { required: true })}
                        placeholder="Ảnh của bạn" />
                </div>

                <Button disabled={isLoading} type="submit" className="text-white mt-5">
                    Thêm
                </Button>
            </form>
        </Modal>
    );
}

export default ArtistModal;