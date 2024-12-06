import { useState } from "react";
import { Eye } from "lucide-react";

const AccountForm = ({ onNext }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium mb-1">E-Mail</label>
                <input
                    type="email"
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500"
                    placeholder="Enter your email"
                />
            </div>

            <div className="relative">
                <label className="block text-sm font-medium mb-1">Password</label>
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500 pr-10"
                        placeholder="Enter password"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                    >
                        {showPassword ? <EyeOff className="w-5 h-5 text-gray-400" /> : <Eye className="w-5 h-5 text-gray-400" />}
                    </button>
                </div>
            </div>

            <div className="relative">
                <label className="block text-sm font-medium mb-1">Confirm Password</label>
                <div className="relative">
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500 pr-10"
                        placeholder="Confirm password"
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                    >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5 text-gray-400" /> : <Eye className="w-5 h-5 text-gray-400" />}
                    </button>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                    type="text"
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500"
                    placeholder="Enter your name"
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Phone Number</label>
                <input
                    type="tel"
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500"
                    placeholder="Enter phone number"
                />
            </div>

            <div className="pt-4">
                <button
                    onClick={onNext}
                    className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default AccountForm