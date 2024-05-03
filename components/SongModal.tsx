"use client"

import { SupabaseClient, useSupabaseClient } from '@supabase/auth-helpers-react';
import Modal from './Modal';
import { useRouter } from 'next/navigation';
import useSongModal from '@/hooks/useSongModal';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Input from './Input';
import Button from './Button';
import { useUser } from '@/hooks/useUser';
import useGetArtistClientSide from '@/hooks/useGetArtistOnClientSide';
import React from 'react';
import { PuffLoader } from 'react-spinners';
import ModalArtistItem from './ModalArtistItem';
import toast from 'react-hot-toast';
import uniqid from 'uniqid';

const SongModal = () => {

    const songModal = useSongModal()
    const supabaseClient = useSupabaseClient()
    const router = useRouter()
    const { user } = useUser()

    const [isLoading, setIsLoading] = useState(false)
    const { artists, isLoading: artistLoading } = useGetArtistClientSide()
    const [selectArtistId, setSelectArtistId] = useState<string | null>(null)

    const onChange = (open: boolean) => {
        if (!open) {
            reset()
            songModal.onClose()
        }
    }

    const { register, handleSubmit, reset, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            title: "",
            song_uri: null,
            image_uri: null,
            user_id: "",
            artist_id: "",
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        try {
            setIsLoading(true)

            const pictureFile = values?.image_uri?.[0]
            const songFile = values?.song_uri?.[0]

            if (!pictureFile || !songFile || !user || !selectArtistId) {
                toast.error("Đã xảy ra lỗi!")
                return
            }

            const uniqueId = uniqid()
            // lưu ảnh vào trong stronge
            const { data: imageData, error: imageError } =
                await supabaseClient.storage
                    .from("images")
                    .upload(`song-cover-image-${uniqueId}`, pictureFile, { cacheControl: "3600", upsert: false })

            if (imageError) {
                console.log(imageError)
                setIsLoading(false)
                return toast.error("Lưu ảnh thất bại!")
            }

            // lưu bài hát vào trong stronge
            const { data: songData, error: songError } =
                await supabaseClient.storage
                    .from("songs")
                    .upload(`song-audio-file-${uniqueId}`, songFile, { cacheControl: "3600", upsert: false })

            if (songError) {
                console.log(songError)
                setIsLoading(false)
                return toast.error("Lưu bài hát thất bại!")
            }

            // Lưu bài hát vào database
            const { error: supabaseError } = await supabaseClient
                .from("songs")
                .insert({
                    title: values?.title,
                    song_uri: songData.path,
                    image_uri: imageData.path,
                    user_id: user?.id,
                    artist_id: selectArtistId,
                })

            if (supabaseError) {
                console.log(supabaseError)
                setIsLoading(false)
                return toast.error("không thể tải lên dữ liệu")
            }
            setIsLoading(false)
            toast.success("Thêm bài hát mới thành công!")
            reset()
            songModal.onClose()
            router.refresh()
        } catch (error) {
            toast.error("Có gì đó không ổn: ", error as any)
        }
        finally {
            setIsLoading(false)
        }
    }


    const handleSelectArtist = (artistId: string) => {
        setSelectArtistId((prevId) => (prevId === artistId ? null : artistId))
    }

    return (
        <Modal
            title='Thêm một bài hát mới'
            description='Tạo bài hát cho riêng bạn'
            isOpen={songModal.isOpen}
            onChange={onChange}
        >
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-4'>
                {errors?.title && (
                    <div className="w-full flex items-end justify-end">
                        <p className="text-xs text-red-500">* Vui lòng nhập tên bài hát</p>
                    </div>
                )}
                <Input
                    id="title"
                    disabled={isLoading} {...register("title", { required: true })}
                    placeholder="Tên bài hát" />

                {errors?.image_uri && (
                    <div className="w-full flex items-end justify-end">
                        <p className="text-xs text-red-500">* Vui lòng chọn ảnh</p>
                    </div>
                )}

                <div>
                    <div className='pb-1'>Chọn một ảnh</div>
                    <Input
                        id='image_uri'
                        type='file'
                        disabled={isLoading}
                        accept='image/*'
                        {...register("image_uri", { required: true })}
                        placeholder='Ảnh bìa của bài hát'
                    />
                </div>

                {errors?.song_uri && (
                    <div className="w-full flex items-end justify-end">
                        <p className="text-xs text-red-500">* Vui lòng chọn bài hát</p>
                    </div>
                )}

                <div>
                    <div className='pb-1'>Chọn một bài hát</div>
                    <Input
                        id='song_uri'
                        type='file'
                        disabled={isLoading}
                        accept='audio/*'
                        {...register("song_uri", { required: true })}
                        placeholder='File Bài hát'
                    />
                </div>

                {errors?.artist_id && (
                    <div className="w-full flex items-end justify-end">
                        <p className="text-xs text-red-500">* Vui lòng một nghệ sĩ</p>
                    </div>
                )}

                <div>
                    <div className='pb-1'>Chọn một nghệ sĩ</div>
                    <div className='grid grid-cols-2 gap-2 py-4 cursor-pointer'>
                        {artistLoading ? (
                            <React.Fragment>
                                <div className='w-full flex items-center justify-center col-span-3'>
                                    <PuffLoader size={35} color='#10B981' />
                                </div>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                {artists?.map((item) => (
                                    <ModalArtistItem
                                        key={item.id}
                                        data={item}
                                        onClick={() => handleSelectArtist(item.id)}
                                        selected={selectArtistId === item.id}
                                    />
                                ))}
                            </React.Fragment>
                        )}
                    </div>
                </div>

                <Button disabled={isLoading} type="submit" className="text-white mt-5">
                    Thêm
                </Button>
            </form>

        </Modal>
    )
}

export default SongModal


