import { Upload } from "lucide-react";
import useFormStore from "../../context/useFormStore";

const CompanyForm = ({ onNext }) => {
    const company_name = useFormStore((state) => state.company_name);
    const representativeName = useFormStore((state) => state.representative_name); // Match Zustand store key
    const address = useFormStore((state) => state.address);
    const companyLogo = useFormStore((state) => state.company_logo);
    const aboutUs = useFormStore((state) => state.about_us); // Match Zustand store key
    const setField = useFormStore((state) => state.setField);

    const handleSubmit = (e) => {
        e.preventDefault();
        onNext();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setField("company_logo", file);
        }
    };


    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium mb-1">Company Name</label>
                <input
                    type="text"
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500"
                    placeholder="Enter company name"
                    value={company_name}
                    onChange={(e) => setField("company_name", e.target.value)}
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Representative Name</label>
                <input
                    type="text"
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500"
                    placeholder="Enter representative name"
                    value={representativeName}
                    onChange={(e) => setField("representative_name", e.target.value)} // Match Zustand store key
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Address</label>
                <input
                    type="text"
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500"
                    placeholder="Your Address"
                    value={address}
                    onChange={(e) => setField("address", e.target.value)}
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Company Logo</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-2">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-red-50 file:text-red-600 hover:file:bg-red-100"
                    />
                   
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">About Us</label>
                <textarea
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500 h-24"
                    placeholder="Tell us about your company"
                    value={aboutUs}
                    onChange={(e) => setField("about_us", e.target.value)} // Match Zustand store key
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

export default CompanyForm;
