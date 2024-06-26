"use client"

interface HeaderProps {
    children: React.ReactNode,
}

const Header: React.FC<HeaderProps> = ({ children }) => {
    return (
        <div className="shadow-[#666] sticky shadow-lg top-0 backdrop-blur-xl bg-[#77736A] z-9999">
            <div className="flex flex-row items-center justify-end px-4 py-3 gap-6 h-4.5 w-full ">
                {children}
            </div>
        </div>
    );
}

export default Header;