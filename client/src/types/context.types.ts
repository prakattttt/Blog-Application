import type React from "react"

export interface writeInterface {
    isOpen: boolean,
    toggle: () => void
}

export interface AuthInterface{
    isLoggedIn: boolean,
    loading: boolean
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}