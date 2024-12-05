import Navbar from "../components/navbar";
import Calendar from "../components/Calendar";

export default function DashTable() {
    return (
        <>
            <div className="bg-gray-200 h-screen">
                {/* Navbar */}
                <Navbar />

                {/* Header Section */}
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
