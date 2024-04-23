"use client"

interface RightBarProps {
    children: React.ReactNode,
}

const RightBar: React.FC<RightBarProps> = ({ children }) => {
    return (
        <div className="shadow-[#666] sticky shadow-lg top-0 backdrop-blur-xl bg-[#77736A] z-9999">
            <div className="sticky flex flex-row items-center justify-end px-4 py-3 gap-6 h-4.5 w-full ">
                {children}
            </div>
        </div>
    );
}

export default RightBar;