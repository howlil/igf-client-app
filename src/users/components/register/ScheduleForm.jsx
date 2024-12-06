const ScheduleForm = ({ onSubmit }) => {
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-medium">Saturday, 07 December 2024</h3>
                <label className="flex items-center space-x-2">
                    <span className="text-sm">Select all</span>
                    <input type="checkbox" className="text-red-600" />
                </label>
            </div>

            <div className="bg-red-600 text-white p-3 rounded-lg mb-4">
                Available Time
            </div>

            <div className="space-y-3">
                {['08:00-08:30', '08:30-09:00', '09:00-09:30', '09:30-10:00',
                    '10:00-10:30', '10:30-11:00', '11:00-11:30', '11:30-12:00'].map((time) => (
                        <div key={time} className="flex justify-between items-center">
                            <span className="text-sm">{time}</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                            </label>
                        </div>
                    ))}
            </div>

            <div className="pt-4">
                <button
                    onClick={onSubmit}
                    className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                    Register
                </button>
            </div>
        </div>
    );
};
export default ScheduleForm