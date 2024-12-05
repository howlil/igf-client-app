import logo from "../.././../public/admin/logo.png"
import React from 'react'
import { User } from "lucide-react"
import { useLocation } from 'react-router-dom'

export default function Navbar() {
    const location = useLocation();
    const link = [
        { label: "Company", link: "/u/companies" },
        { label: "Approval", link: "/u/approval" },
        { label: "Schedule", link: "/u/schedules" },
    ]
    return (
        <div className="flex justify-between items-center px-12 py-3 shadow-md w-full ">
            <img src={logo} alt="" className="w-32" />

            <div className="flex gap-4 items-center ">
                {link.map((nav) => {
                    const isActive = location.pathname === nav.link;
                    return (
                        <a className={`text-black ${isActive ? 'text-red-500' : ''}`} href={nav.link}>{nav.label}</a>
                    )
                })}
                <div className=" flex gap-3 items-center">
                    <div className="rounded-full bg-gray-50 p-1.5">
                        <User />
                    </div>
                    Jhon Doe
                </div>
            </div>

        </div>
    )
}
