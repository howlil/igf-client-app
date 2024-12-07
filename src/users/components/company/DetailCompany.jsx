import React, { useState, useEffect } from 'react';
import { format, addDays, startOfWeek, addWeeks, subWeeks } from 'date-fns';
import api from '../../../utils/api';
import { useParams, useNavigate } from 'react-router-dom';
import { X, ArrowLeft } from 'lucide-react';
import Swal from 'sweetalert2';

// Modal Component for Booking
const BookingModal = ({ isOpen, onClose, companyData, selectedSlot, onSubmit }) => {
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && selectedSlot) {
      fetchTables();
    }
  }, [isOpen, selectedSlot]);

  const fetchTables = async () => {
    try {
      const res = await api.get(`/tables?date=${selectedSlot.date}`);
      setTables(res.data.data);
      setSelectedTable('');
    } catch (error) {
      console.error('Error fetching tables:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('company_id_match', selectedSlot.company_id);
      formData.append('table_id', selectedTable);
      formData.append('time_start', selectedSlot.time_start);
      formData.append('time_end', selectedSlot.time_end);

      await api.post('/matchmakings', formData);
      
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Your booking request has been sent successfully.',
        confirmButtonColor: '#EF4444',
      });
      
      onSubmit();
    } catch (error) {
      console.error('Error creating matchmaking:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to book the slot. Please try again.',
        confirmButtonColor: '#EF4444',
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Request MatchMaking</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
            {companyData.company_logo ? (
              <img
                src={`${import.meta.env.VITE_API_URL}/${companyData.company_logo}`}
                alt={companyData.company_name}
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <span className="text-xl font-semibold">{companyData.company_name[0]}</span>
            )}
          </div>
          <div>
            <h3 className="font-semibold">{companyData.company_name}</h3>
            <div className="flex gap-2 mt-1">
              <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                {companyData.key_product_line?.[0] || 'N/A'}
              </span>
              <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                {companyData.preferred_platform?.[0] || 'N/A'}
              </span>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-600">Country: {companyData.country}</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
            <div className="p-2 bg-gray-50 rounded text-sm">
              {selectedSlot.time_start} - {selectedSlot.time_end}
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="table" className="block text-sm font-medium text-gray-700 mb-1">
              Select Table
            </label>
            <select
              id="table"
              value={selectedTable}
              onChange={(e) => setSelectedTable(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">Select a table</option>
              {tables.map((table) => (
                <option key={table.id} value={table.id}>
                  {table.name_table}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={loading || !selectedTable}
            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

// Company Profile Component
const ParticipantProfile = ({ company }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/3">
          <div className="aspect-square bg-gray-100 rounded-lg relative">
            {company.company_logo ? (
              <img
                src={`${import.meta.env.VITE_API_URL}/${company.company_logo}`}
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
            <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
              {company.company_type}
            </span>
          </div>
        </div>

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

// Time Slot Component
const TimeSlot = ({ time, status, onBook }) => {
  if (!time) return null;
  
  const displayTime = `${time.time_start} - ${time.time_end}`;

  if (status === 'booked') {
    return (
      <div className="bg-gray-100 p-2 rounded text-center">
        <div className="text-xs text-gray-600">{displayTime}</div>
        <div className="font-medium text-sm">Booked</div>
      </div>
    );
  }

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
};

// Calendar Grid Component
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
                  onBook={() => onBook({
                    ...day.slots[rowIndex],
                    date: format(day.date, 'yyyy-MM-dd')
                  })}
                />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

// Main Component
const DetailCompany = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [weekStart, setWeekStart] = useState(startOfWeek(currentDate));
  const [weekData, setWeekData] = useState([]);
  const [companyData, setCompanyData] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const { id } = useParams();

  async function getDetailData() {
    try {
      const res = await api.get(`/companys/${id}`);
      setCompanyData(res.data.data);
      generateWeekSchedule(res.data.data.schedule);
    } catch (error) {
      console.error('Error fetching company details:', error);
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
      const daySchedule = schedule?.filter(slot => slot.date === currentDateStr) || [];
  
      const slots = timeSlots.map(timeSlot => {
        const matchingSlot = daySchedule.find(
          slot => slot.time_start === timeSlot.start && slot.time_end === timeSlot.end
        );
        console.log(matchingSlot)
  
        if (matchingSlot) {
          return {
            ...matchingSlot,
            status: matchingSlot.status === 1 ? 'booked' : 'available', // Map status here
            time_start: timeSlot.start,
            time_end: timeSlot.end,
            company_id: matchingSlot.company_id
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
    setSelectedSlot(slot);
    setShowBookingModal(true);
  };

  const handleBookingSuccess = () => {
    setShowBookingModal(false);
    getDetailData();
  };

  if (!companyData) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      <div className="mb-6">
        <button
          onClick={() => navigate('/u/companies')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Companies</span>
        </button>
      </div>
      
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
      </div>

      <BookingModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        companyData={companyData}
        selectedSlot={selectedSlot}
        onSubmit={handleBookingSuccess}
      />
    </div>
  );
};

export default DetailCompany;