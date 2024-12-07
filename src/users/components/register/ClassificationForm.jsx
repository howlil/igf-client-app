import useFormStore from "../../context/useFormStore";

const ClassificationForm = ({ onNext }) => {
    const companyType = useFormStore((state) => state.company_type);
    const keyProductLines = useFormStore((state) => state.key_product_lines);
    const country = useFormStore((state) => state.country);
    const setField = useFormStore((state) => state.setField);

    const handleCompanyTypeChange = (type) => {
        setField("company_type", type);
    };

    const handleKeyProductLineChange = (product) => {
        if (keyProductLines.includes(product)) {
            // Remove if already selected
            setField(
                "key_product_lines",
                keyProductLines.filter((line) => line !== product)
            );
        } else {
            // Add if not already selected
            setField("key_product_lines", [...keyProductLines, product]);
        }
    };

    const handleCountryChange = (selectedCountry) => {
        setField("country", selectedCountry);
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="font-medium mb-3">Company Type</h3>
                <div className="grid grid-cols-2 gap-3">
                    {[
                        "Company",
                        "Government",
                        "Public Institutions",
                        "Private businesses",
                        "Universities/Research Institutions",
                        "Associations/Organizations",
                        "Others",
                    ].map((type) => (
                        <label key={type} className="flex items-center space-x-2">
                            <input
                                type="radio"
                                name="companyType"
                                className="text-red-600"
                                checked={companyType === type}
                                onChange={() => handleCompanyTypeChange(type)}
                            />
                            <span className="text-sm">{type}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="font-medium mb-3">Key Product Line</h3>
                <div className="grid grid-cols-2 gap-3">
                    {[
                        "Online/PC Games",
                        "Parts/accessories",
                        "Mobile Games",
                        "Art/Music/Design",
                        "Game Hardware",
                        "Blockchain",
                        "Console Games",
                        "Arcade Games",
                        "E-Sports",
                        "Middleware",
                        "Software",
                        "AR/VR",
                        "Others",
                    ].map((product) => (
                        <label key={product} className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                className="text-red-600"
                                checked={keyProductLines.includes(product)}
                                onChange={() => handleKeyProductLineChange(product)}
                            />
                            <span className="text-sm">{product}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="font-medium mb-3">Country</h3>
                <div className="grid grid-cols-2 gap-3">
                    {[
                        "Republic of Korea",
                        "Asia",
                        "Middle East",
                        "Europe",
                        "Afrika",
                        "Americans",
                    ].map((countryOption) => (
                        <label key={countryOption} className="flex items-center space-x-2">
                            <input
                                type="radio"
                                name="country"
                                className="text-red-600"
                                checked={country === countryOption}
                                onChange={() => handleCountryChange(countryOption)}
                            />
                            <span className="text-sm">{countryOption}</span>
                        </label>
                    ))}
                </div>
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

export default ClassificationForm;
