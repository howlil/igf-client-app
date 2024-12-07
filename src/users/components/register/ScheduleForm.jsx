import useFormStore from "../../context/useFormStore";
import { useState } from "react";

const ScheduleForm = ({ onSubmit }) => {
    const schedules = useFormStore((state) => state.schedules);
    const setField = useFormStore((state) => state.setField);

    const [selectedDate, setSelectedDate] = useState("");

    const availableTimes = [
        "08:00-08:30",
        "08:30-09:00",
        "09:00-09:30",
        "09:30-10:00",
        "10:00-10:30",
        "10:30-11:00",
        "11:00-11:30",
        "11:30-12:00",
    ];

    const isTimeSelected = (time) => {
        const [time_start] = time.split("-");
        return schedules.some(
            (slot) => slot.time_start === time_start && slot.date === selectedDate
        );
    };

    const handleSelectAll = (e) => {
        if (!selectedDate) {
            alert("Please select a date first.");
            return;
        }

        if (e.target.checked) {
            // Add all available times for the selected date
            const newSchedules = availableTimes.map((time) => {
                const [time_start, time_end] = time.split("-");
                return { date: selectedDate, time_start, time_end };
            });

            const filteredSchedules = schedules.filter(
                (slot) => slot.date !== selectedDate
            );

            setField("schedules", [...filteredSchedules, ...newSchedules]);
        } else {
            // Remove all times for the selected date
            const filteredSchedules = schedules.filter(
                (slot) => slot.date !== selectedDate
            );

            setField("schedules", filteredSchedules);
        }
    };

    const handleTimeToggle = (time) => {
        if (!selectedDate) {
            alert("Please select a date first.");
            return;
        }

        const [time_start, time_end] = time.split("-");

        const isSelected = isTimeSelected(time);

        const updatedSchedules = isSelected
            ? schedules.filter(
                  (slot) =>
                      !(slot.time_start === time_start && slot.date === selectedDate)
              )
            : [...schedules, { date: selectedDate, time_start, time_end }];

        setField("schedules", updatedSchedules);
    };

    const handleRegister = () => {
        console.log("Schedules:", schedules); // Debug the schedules state
        onSubmit();
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center mb-6">
                <label className="font-medium">
                    <span className="block mb-2">Select Date</span>
                    <input
                        type="date"
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                    />
                </label>
                <label className="flex items-center space-x-2">
                    <span className="text-sm">Select all</span>
                    <input
                        type="checkbox"
                        className="text-red-600"
                        checked={availableTimes.every(isTimeSelected)}
                        onChange={handleSelectAll}
                        disabled={!selectedDate} // Disable if no date is selected
                    />
                </label>
            </div>

            <div className="bg-red-600 text-white p-3 rounded-lg mb-4">Available Time</div>

            <div className="space-y-3">
                {availableTimes.map((time) => (
                    <div key={time} className="flex justify-between items-center">
                        <span className="text-sm">{time}</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={isTimeSelected(time)}
                                onChange={() => handleTimeToggle(time)}
                                disabled={!selectedDate} // Disable if no date is selected
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                        </label>
                    </div>
                ))}
            </div>

            <div className="pt-4">
                <button
                    onClick={handleRegister}
                    className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
                    disabled={!selectedDate} // Disable if no date is selected
                >
                    Register
                </button>
            </div>
        </div>
    );
};

export default ScheduleForm;
