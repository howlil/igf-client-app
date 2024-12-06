const ClassificationForm = ({ onNext }) => {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="font-medium mb-3">Company Type</h3>
                <div className="grid grid-cols-2 gap-3">
                    {['Company', 'Government', 'Public Institutions', 'Private businesses',
                        'Universities/Research Institutions', 'Associations/Organizations', 'Others'].map((type) => (
                            <label key={type} className="flex items-center space-x-2">
                                <input type="radio" name="companyType" className="text-red-600" />
                                <span className="text-sm">{type}</span>
                            </label>
                        ))}
                </div>
            </div>

            <div>
                <h3 className="font-medium mb-3">Key Product Line</h3>
                <div className="grid grid-cols-2 gap-3">
                    {['Online/PC Games', 'Parts/accessories', 'Mobile Games', 'Art/Music/Design',
                        'Game Hardware', 'Blockchain', 'Console Games', 'Arcade Games', 'E-Sports',
                        'Middleware', 'Software', 'AR/VR', 'Others'].map((product) => (
                            <label key={product} className="flex items-center space-x-2">
                                <input type="checkbox" className="text-red-600" />
                                <span className="text-sm">{product}</span>
                            </label>
                        ))}
                </div>
            </div>

            <div>
                <h3 className="font-medium mb-3">Country</h3>
                <div className="grid grid-cols-2 gap-3">
                    {['Republic of Korea', 'Asia', 'Middle East', 'Europe', 'Afrika', 'Americans'].map((country) => (
                        <label key={country} className="flex items-center space-x-2">
                            <input type="radio" name="country" className="text-red-600" />
                            <span className="text-sm">{country}</span>
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

export default ClassificationForm