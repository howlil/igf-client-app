import React, { useState, useEffect } from 'react';
import { format, addDays, startOfWeek, addWeeks, subWeeks } from 'date-fns';
// Participant Profile Component
const ParticipantProfile = ({ participant }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Image Section */}
        <div className="w-full md:w-1/3">
          <div className="aspect-square bg-gray-100 rounded-lg relative">
            <span className="absolute top-2 right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
              Label
            </span>
          </div>
        </div>

        {/* Information Section */}
        <div className="w-full md:w-2/3">
          <h2 className="text-xl font-semibold mb-4">{participant.name}</h2>
          <p className="text-gray-600 mb-4 text-sm">{participant.description}</p>
          
          <div className="space-y-2">
            {participant.information.map((info, index) => (
              <div key={index} className="flex flex-col sm:flex-row gap-2 text-sm">
                <span className="font-medium min-w-[120px]">{info.label}</span>
                <span className="text-gray-600">: {info.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Calendar Header Component
const CalendarHeader = ({ onPrevWeek, onNextWeek }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h3 className="font-medium text-lg">CALENDAR</h3>
      <div className="flex gap-2">
        <button 
          onClick={onPrevWeek}
          className="p-2 rounded hover:bg-gray-100"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button 
          onClick={onNextWeek}
          className="p-2 rounded hover:bg-gray-100"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

// Time Slot Component
const TimeSlot = ({ time, status, onBook }) => {
  if (status === 'booked') {
    return (
      <div className="bg-gray-100 p-2 rounded text-center">
        <div className="text-xs text-gray-600">{time}</div>
        <div className="font-medium text-sm">Booked</div>
      </div>
    );
  }

  if (status === 'available') {
    return (
      <div className="bg-blue-50 p-2 rounded text-center">
        <div className="text-xs text-gray-600">{time}</div>
        <div className="font-medium text-sm mb-1">Available</div>
        <button 
          onClick={onBook}
          className="text-blue-600 text-xs hover:underline"
        >
          Book Now
        </button>
      </div>
    );
  }

  return null;
};

// CalendarGrid Component (Updated)
const CalendarGrid = ({ weekData, onBook }) => {
    return (
      <div className="grid grid-cols-8 border border-gray-200 rounded-lg overflow-hidden">
        {/* Time Column */}
        <div className="border-r border-gray-200">
          <div className="p-3 bg-gray-50 border-b border-gray-200">
            <div className="text-sm text-gray-600">GMT +7</div>
          </div>
          {Array.from({ length: 6 }).map((_, index) => (
            <div 
              key={index}
              className="p-3 border-b border-gray-200 text-sm text-gray-600"
            >
              {index + 1} PM
            </div>
          ))}
        </div>
  
        {/* Days Columns */}
        {weekData.map((day, dayIndex) => (
          <div key={dayIndex} className="border-r last:border-r-0 border-gray-200">
            <div className="p-3 bg-gray-50 border-b border-gray-200 text-center">
              <div className="text-sm text-gray-600">{day.dayName}</div>
              <div className="font-medium">{day.dayNumber}</div>
            </div>
            {day.slots.map((slot, slotIndex) => (
              <div key={slotIndex} className="p-2 border-b border-gray-200 min-h-[80px]">
                {slot && (
                  <TimeSlot 
                    time={slot.time}
                    status={slot.status}
                    onBook={() => onBook(format(day.date, 'yyyy-MM-dd'), slot.time)}
                  />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };
  
  // Data Generation Function (Updated)
  const generateWeekDays = (startDate) => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const currentDate = addDays(startDate, i);
      days.push({
        date: currentDate,
        dayName: format(currentDate, 'EEE'),
        dayNumber: format(currentDate, 'd'),
        slots: generateTimeSlots().map(slot => ({
          time: `${slot.start} - ${slot.end}`,
          status: Math.random() > 0.7 ? 'booked' : (Math.random() > 0.5 ? 'available' : null)
        }))
      });
    }
    return days;
  };
  
  // Time Slots Generation (No changes needed)
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 13; hour <= 18; hour++) {
      slots.push({
        start: `${hour}:00`,
        end: `${hour + 1}:00`,
      });
    }
    return slots;
  };
  
  // DetailCompany Component
  const DetailCompany = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [weekStart, setWeekStart] = useState(startOfWeek(currentDate));
    const [weekData, setWeekData] = useState([]);
    const [bookingRequests, setBookingRequests] = useState([]);
    const [currentParticipant] = useState({
      name: "Participant Name",
      description: "Perusahaan ini bergerak di tiga lini bisnis utama: layanan on-demand (seperti transportasi dan pesan-antar makanan melalui Gojek), e-commerce (melalui platform Tokopedia), dan layanan keuangan digital (seperti GoPay).",
      information: [
        { label: "Information 1", value: "Data Information 1" },
        { label: "Information 2", value: "Data Information 2" },
        { label: "Information 3", value: "Data Information 3" },
        { label: "Information 4", value: "Data Information 4" },
      ]
    });
  
    useEffect(() => {
      setWeekData(generateWeekDays(weekStart));
    }, [weekStart]);
  
    const handlePrevWeek = () => {
      setWeekStart(subWeeks(weekStart, 1));
    };
  
    const handleNextWeek = () => {
      setWeekStart(addWeeks(weekStart, 1));
    };
  
    const handleBook = (date, time) => {
      const newRequest = {
        date,
        time,
        status: 'pending'
      };
      setBookingRequests(prev => [...prev, newRequest]);
  
      // Update the calendar slot status
      setWeekData(prevWeekData => {
        return prevWeekData.map(day => {
          if (format(day.date, 'yyyy-MM-dd') === date) {
            return {
              ...day,
              slots: day.slots.map(slot => {
                if (slot && slot.time === time) {
                  return { ...slot, status: 'pending' };
                }
                return slot;
              })
            };
          }
          return day;
        });
      });
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
  
    return (
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        <ParticipantProfile participant={currentParticipant} />
        
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
                    {request.date} at {request.time}
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