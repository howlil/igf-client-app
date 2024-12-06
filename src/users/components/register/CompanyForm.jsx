import { Upload } from "lucide-react";

const CompanyForm = ({ onNext }) => {
    return (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium mb-1">Company Name</label>
                <input
                    type="text"
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500"
                    placeholder="Enter company name"
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Representative Name</label>
                <input
                    type="text"
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500"
                    placeholder="Enter representative name"
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Address</label>
                <input
                    type="text"
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500"
                    placeholder="Your Adress"
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Company Logo</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-2">
                    <div className="flex justify-center gap-4 items-center">
                        <Upload className="w-4 h-4 text-red-500 " />
                        <span className="text-red-600">Upload your logo here</span>
                    </div>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">About Us</label>
                <textarea
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500 h-24"
                    placeholder="Tell us about your company"
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
};

export default CompanyForm