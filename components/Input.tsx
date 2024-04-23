import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> { }
const Input = forwardRef<HTMLInputElement, InputProps>(({ className, type, disabled, ...props }, ref) => {
    return (
        <input type={type} className={twMerge(
            "flex w-full rounded-md px-3 py-2 mt-2 border border-transprent text-sm file:border-0 file:bg-transprent file:text-sm file:font-medium placeholder:text-neutral-400 disabled:opacity-50 focus-within:outline-none"
            , className
        )} disabled={disabled} ref={ref} {...props} />
        
    )
})

export default Input;