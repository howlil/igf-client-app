import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import useFormStore from "../../context/useFormStore";

const AccountForm = ({ onNext }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Use memoized selectors to avoid infinite re-renders
    const email = useFormStore((state) => state.email);
    const password = useFormStore((state) => state.password);
    const confirm_password = useFormStore((state) => state.confirm_password);
    const username = useFormStore((state) => state.username);
    const phone_number = useFormStore((state) => state.phone_number);
    const setField = useFormStore((state) => state.setField);

    const handleSubmit = (e) => {
        e.preventDefault();
        onNext();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium mb-1">E-Mail</label>
                <input
                    type="email"
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setField("email", e.target.value)}
                />
            </div>

            <div className="relative">
                <label className="block text-sm font-medium mb-1">Password</label>
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500 pr-10"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setField("password", e.target.value)}
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
                        value={confirm_password}
                        onChange={(e) => setField("confirm_password", e.target.value)}
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
                    value={username}
                    onChange={(e) => setField("username", e.target.value)}
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Phone Number</label>
                <input
                    type="tel"
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500"
                    placeholder="Enter phone number"
                    value={phone_number}
                    onChange={(e) => setField("phone_number", e.target.value)}
                />
            </div>

            <div className="pt-4">
                <button
                    type="submit"
                    className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                    Next
                </button>
            </div>
        </form>
    );
};

export default AccountForm;
