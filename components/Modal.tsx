import * as Dialog from '@radix-ui/react-dialog';
import {IoMdClose} from "react-icons/io"
import Button from './Button';

interface ModalProps {
    isOpen: boolean,
    onChange: (open: boolean) => void,
    title: string,
    description: string,
    children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({children, isOpen, onChange, title, description}) => {
    return <Dialog.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
        <Dialog.Portal>
            <Dialog.Overlay className='bg-neutral-900/90 backdrop-blur-sm fixed inset-0 z-50'>
                <Dialog.Content className='fixed drop-shadow-md border border-neutral-700 top-[50%] left-[50%] max-h-full h-full md:h-auto md-h-[85vh] w-full md:w-[90vw] md:max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounder-md bg-neutral-800 p-[25px] focus:outline-none'>
                    <Dialog.Title className='text-xl text-center font-bold md-4'>{title}</Dialog.Title>
                    <Dialog.Description className='md-5 text-sm leading-normal text-center p-3'>{description}</Dialog.Description>
                    <div>{children}</div>
                    {/* close button */}
                    <Dialog.Close asChild>
                        <button className='text-neutral-400 hover:text-white absolute top-3 right-3 inline-flex h-6 w-6 appearance-none items-center justify-center rounded-full focus:outline-none'>
                            <IoMdClose />
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Overlay>
        </Dialog.Portal>
    </Dialog.Root>
}
 
export default Modal;