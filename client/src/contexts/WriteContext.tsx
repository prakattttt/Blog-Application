import { createContext, useState } from "react";

interface writeInterface {
    isOpen: boolean,
    toggle: () => void
}

export const WriteContext = createContext<writeInterface | null>(null);

export const WriteProvider = ({ children }: { children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggle = () => {
        setIsOpen(prevOpen => !prevOpen);
    }

    return (
        <WriteContext.Provider value={{isOpen, toggle}}>
            {children}
        </WriteContext.Provider>
    )
}
