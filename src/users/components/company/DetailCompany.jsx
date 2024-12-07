import React, { useState, useEffect } from 'react';
import { format, addDays, startOfWeek, addWeeks, subWeeks, parse } from 'date-fns';
import api from '../../../utils/api';
import { useParams } from 'react-router-dom';

const ParticipantProfile = ({ company }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Image Section */}
        <div className="w-full md:w-1/3">
          <div className="aspect-square bg-gray-100 rounded-lg relative">
            {company.company_logo ? (
              <img
                src={`${import.meta.env.VITE_API_URL}/company.company_logo`}
                alt={company.company_name}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <img
                src="/public/vite.svg"
                alt={company.company_name}
                className="w-full h-full object-cover rounded-lg"
              />
            )}
            <span className="absolute top-2 right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
              {company.company_type}
            </span>
          </div>
        </div>

        {/* Information Section */}
        <div className="w-full md:w-2/3">
          <h2 className="text-xl font-semibold mb-4">{company.company_name}</h2>
          <p className="text-gray-600 mb-4 text-sm">{company.about_us}</p>

          <div className="space-y-2">
            <div className="flex flex-col sm:flex-row gap-2 text-sm">
              <span className="font-medium min-w-[120px]">Representative</span>
              <span className="text-gray-600">: {company.representative_name}</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 text-sm">
              <span className="font-medium min-w-[120px]">Country</span>
              <span className="text-gray-600">: {company.country}</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 text-sm">
              <span className="font-medium min-w-[120px]">Address</span>
              <span className="text-gray-600">: {company.address}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TimeSlot = ({ time, status, onBook }) => {
  const displayTime = `${time.time_start} - ${time.time_end}`;

  if (status === 'booked') {
    return (
      <div className="bg-gray-100 p-2 rounded text-center">
        <div className="text-xs text-gray-600">{displayTime}</div>
        <div className="font-medium text-sm">Booked</div>
      </div>
    );
  }

  if (status === 'available') {
    return (
      <div className="bg-blue-50 p-2 rounded text-center">
        <div className="text-xs text-gray-600">{displayTime}</div>
        <div className="font-medium text-sm mb-1">Available</div>
        <button
          onClick={() => onBook(time)}
          className="text-blue-600 text-xs hover:underline"
        >
          Book Now
        </button>
      </div>
    );
  }

  return null;
};

const CalendarGrid = ({ weekData, onBook }) => {
  const timeSlots = [
    { start: "08:00", end: "08:30" },
    { start: "08:30", end: "09:00" },
    { start: "09:00", end: "09:30" },
    { start: "09:30", end: "10:00" },
    { start: "10:00", end: "10:30" },
    { start: "10:30", end: "11:00" },
    { start: "11:00", end: "11:30" },
    { start: "11:30", end: "12:00" }
  ];

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="grid grid-cols-8">
        {/* Headers */}
        <div className="p-3 bg-gray-50 border-b border-r border-gray-200">
          <div className="text-sm text-gray-800">Time Slots</div>
        </div>
        {weekData.map((day, index) => (
          <div key={index} className="p-3 bg-gray-50 border-b border-r last:border-r-0 border-gray-200 text-center">
            <div className="text-sm text-gray-600">{day.dayName}</div>
            <div className="font-medium">{day.dayNumber}</div>
          </div>
        ))}
      </div>

      {/* Time Slots Grid */}
      {timeSlots.map((timeSlot, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-8">
          <div className="p-3 border-b border-r border-gray-200 text-sm text-gray-800">
            {timeSlot.start} - {timeSlot.end}
          </div>
          {weekData.map((day, colIndex) => (
            <div key={colIndex} className="p-2 border-b border-r last:border-r-0 border-gray-200">
              {day.slots[rowIndex] && (
                <TimeSlot
                  time={day.slots[rowIndex]}
                  status={day.slots[rowIndex].status}
                  onBook={() => onBook(day.slots[rowIndex])}
                />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

const DetailCompany = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [weekStart, setWeekStart] = useState(startOfWeek(currentDate));
  const [weekData, setWeekData] = useState([]);
  const [bookingRequests, setBookingRequests] = useState([]);
  const [companyData, setCompanyData] = useState(null);
  const { id } = useParams();

  async function getDetailData() {
    try {
      const res = await api.get(`/companys/${id}`);
      setCompanyData(res.data.data);
      generateWeekSchedule(res.data.data.schedule);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getDetailData();
  }, [id]);

  const generateWeekSchedule = (schedule) => {
    const timeSlots = [
      { start: "08:00", end: "08:30" },
      { start: "08:30", end: "09:00" },
      { start: "09:00", end: "09:30" },
      { start: "09:30", end: "10:00" },
      { start: "10:00", end: "10:30" },
      { start: "10:30", end: "11:00" },
      { start: "11:00", end: "11:30" },
      { start: "11:30", end: "12:00" }
    ];

    const days = [];
    for (let i = 0; i < 7; i++) {
      const currentDate = addDays(weekStart, i);
      const currentDateStr = format(currentDate, 'yyyy-MM-dd');
      const daySchedule = schedule.filter(slot => slot.date === currentDateStr);

      const slots = timeSlots.map(timeSlot => {
        const matchingSlot = daySchedule.find(
          slot => slot.time_start === timeSlot.start && slot.time_end === timeSlot.end
        );

        if (matchingSlot) {
          return {
            ...matchingSlot,
            status: 'available'
          };
        }
        return null;
      });

      days.push({
        date: currentDate,
        dayName: format(currentDate, 'EEE'),
        dayNumber: format(currentDate, 'd'),
        slots: slots
      });
    }
    setWeekData(days);
  };

  const handlePrevWeek = () => {
    const newWeekStart = subWeeks(weekStart, 1);
    setWeekStart(newWeekStart);
    if (companyData) {
      generateWeekSchedule(companyData.schedule);
    }
  };

  const handleNextWeek = () => {
    const newWeekStart = addWeeks(weekStart, 1);
    setWeekStart(newWeekStart);
    if (companyData) {
      generateWeekSchedule(companyData.schedule);
    }
  };

  const handleBook = (slot) => {
    const newRequest = {
      date: slot.date,
      time_start: slot.time_start,
      time_end: slot.time_end,
      status: 'pending'
    };
    setBookingRequests(prev => [...prev, newRequest]);
  };

  const handleSendRequest = () => {
    if (bookingRequests.length === 0) {
      alert('Please select at least one time slot before sending the request.');
      return;
    }

    console.log('Sending meeting requests:', bookingRequests);
    setBookingRequests([]);
    alert('Meeting requests sent successfully!');
  };

  if (!companyData) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      <ParticipantProfile company={companyData} />

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="font-medium text-lg">CALENDAR</h3>
            <p className="text-sm text-gray-600">
              {format(weekStart, 'MMMM yyyy')}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handlePrevWeek}
              className="p-2 rounded hover:bg-gray-100"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={handleNextWeek}
              className="p-2 rounded hover:bg-gray-100"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[768px]">
            <CalendarGrid
              weekData={weekData}
              onBook={handleBook}
            />
          </div>
        </div>

        {bookingRequests.length > 0 && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-2">Pending Booking Requests:</h4>
            <div className="space-y-2">
              {bookingRequests.map((request, index) => (
                <div key={index} className="text-sm text-gray-600">
                  {request.date} at {request.time_start} - {request.time_end}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSendRequest}
          className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          disabled={bookingRequests.length === 0}
        >
          Send Meeting Request
          {bookingRequests.length > 0 && ` (${bookingRequests.length})`}
        </button>
      </div>
    </div>
  );
};

export default DetailCompany;