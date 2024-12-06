import Navbar from "../components/navbar";
import Calendar from "../components/Calendar";
import { useLocation,  useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function DashTable() {
    const navigate = useNavigate

    useEffect(() => {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username')
        if (!token && username != 'admin') {
          navigate('/notAllowed');
        }
    }, [navigate]);
    
    return (
        <>
            <div className="bg-gray-200 h-screen">
                {/* Navbar */}
                <Navbar />

                <div className="">
                        {/* Calendar Section */}
                    <div className="bg-white shadow rounded p-6">
                        <Calendar/>
                    </div>
                </div>
            </div>
        </>
    );
}
