// Adjusted ScheduleUser.jsx
import { useState, useEffect } from "react";
import { format, parseISO } from 'date-fns';
import Layout from './components/Layout';
import TimeSlot from './components/schedule/TimeSlot';
import MeetingCard from './components/schedule/MeetingCard';
import SuggestionCard from './components/schedule/SuggestionCard';
import api from "../utils/api";
import Swal from 'sweetalert2';
import { X } from "lucide-react";

export default function ScheduleUser() {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showBookingConfirm, setShowBookingConfirm] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [companyCalendar, setCompanyCalendar] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch companies list
  async function getCompanies() {
    try {
      const res = await api.get("/companys-by-conference");
      if (res.data && Array.isArray(res.data.data)) {
        setCompanies(res.data.data);
      } else {
        console.error("Unexpected API response:", res.data);
        setCompanies([]);
      }
    } catch (error) {
      console.error("Error fetching companies:", error);
      setCompanies([]);
    }
  }

  // Fetch company calendar
  async function getCompanyCalendar(companyId) {
    setLoading(true);
    try {
      const res = await api.get(`/matchmakings/company-calendar/${companyId}`);
      setCompanyCalendar(res.data.data);
    } catch (error) {
      console.error("Error fetching calendar:", error);
      setCompanyCalendar([]);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to fetch company calendar',
        confirmButtonColor: '#EF4444',
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getCompanies();
  }, []);

  // Handler for booking button in suggestions
  const handleBookClick = async (company) => {
    setSelectedCompany(company);
    await getCompanyCalendar(company.id);
  };

  console.log(companyCalendar,"text")

  // Handler for booking a specific time slot
  const handleBookMeeting = async (timeSlot) => {
    const [start] = timeSlot.split(' - ');
    const scheduleDate = selectedCompany.schedule.find(s => 
      s.time_start === start
    )?.date;

    if (scheduleDate) {
      await fetchTables(scheduleDate);
      setSelectedTimeSlot(timeSlot);
      setShowBookingConfirm(true);
    }
  };

  // Handle confirm booking
  const handleConfirmBooking = async () => {
    if (!selectedCompany || !selectedTimeSlot || !selectedTable) return;

    const [start, end] = selectedTimeSlot.split(' - ');
    const scheduleEntry = selectedCompany.schedule.find(s => s.time_start === start);
    
    if (!scheduleEntry) {
      console.error('No matching schedule found');
      return;
    }
    
    try {
      const formData = new FormData();
      formData.append('company_id_match', scheduleEntry.company_id);
      formData.append('table_id', selectedTable);
      formData.append('time_start', start);
      formData.append('time_end', end);

      await api.post('/matchmakings', formData);
      
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Meeting booked successfully!',
        confirmButtonColor: '#EF4444',
      });

      setShowBookingConfirm(false);
      setSelectedTable('');
      getCompanyCalendar(selectedCompany.id);
    } catch (error) {
      console.error('Error booking meeting:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to book meeting',
        confirmButtonColor: '#EF4444',
      });
    }
  };

  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState('');

  // Fetch tables based on date
  const fetchTables = async (date) => {
    try {
      const res = await api.get(`/tables?date=${date}`);
      console.log(res.data.data)
      setTables(res.data.data);
    } catch (error) {
      console.error('Error fetching tables:', error);
      setTables([]);
    }
  };

  const timeSlots = [
    "08:00 - 08:30", "08:30 - 09:00", "09:00 - 09:30", "09:30 - 10:00",
    "10:00 - 10:30", "10:30 - 11:00", "11:00 - 11:30", "11:30 - 12:00"
  ];

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-8">Dashboard Schedule</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Suggestions Section */}
          <div className="lg:w-1/3">
            <div className="bg-gray-50 rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-4">SUGGESTIONS MATCHMAKING</h2>
              <div className="space-y-2">
                {companies.map((company) => (
                  <SuggestionCard
                    key={company.id}
                    company={company.company_name}
                    productLine={company.key_product_line?.[0]?.name || 'N/A'}
                    platform={company.preferred_platform?.[0]?.name || 'N/A'}
                    onBook={() => handleBookClick(company)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Calendar Section */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow">
              <div className="flex justify-between items-center p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold">CALENDAR</h2>
                <span className="text-gray-600">
                  {selectedCompany ? 
                    format(parseISO(selectedCompany.schedule[0]?.date), 'EEEE, dd MMMM yyyy') :
                    'Select a company'}
                </span>
              </div>

              {loading ? (
                <div className="p-8 text-center text-gray-500">
                  Loading calendar...
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {selectedCompany ? (
                    timeSlots.map((timeSlot) => {
                      const [start, end] = timeSlot.split(' - ');
                      const matchingSchedule = selectedCompany.schedule.find(
                        schedule => schedule.time_start === start && schedule.time_end === end
                      );
                      const matchingCalendar = companyCalendar.find(
                        calendar => calendar.time_start === start && calendar.time_end === end
                      );

                      console.log(matchingCalendar)

                      return (
                        <TimeSlot key={timeSlot} time={timeSlot}>
                          {matchingCalendar ? (
                            <MeetingCard
                              company={matchingCalendar.company_book?.company_name || 'Unknown Company'}
                              associations={selectedCompany.company_type}
                              productLine={selectedCompany.key_product_line?.[0]?.name || 'N/A'}
                              platform={selectedCompany.preferred_platform?.[0]?.name || 'N/A'}
                              country={selectedCompany.country}
                              bizMatching={selectedCompany.biz_match?.[0]?.name || 'N/A'}
                              status={'available'}
                            />
                          ) : matchingSchedule ? (
                            <div className="flex justify-center">
                              <button
                                onClick={() => handleBookMeeting(timeSlot)}
                                className="border-2 border-red-600 text-red-500 px-4 py-2 rounded-lg transition-all hover:bg-red-50"
                              >
                                Book Meeting
                              </button>
                            </div>
                          ) : (
                            <div className="flex justify-center">
                              <span className="text-gray-500">Unavailable</span>
                            </div>
                          )}
                        </TimeSlot>
                      );
                    })
                  ) : (
                    <div className="p-8 text-center text-gray-500">
                      Select a company from suggestions to view their schedule
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Request MatchMaking Modal */}
        {showBookingConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Request MatchMaking</h2>
                <button 
                  onClick={() => {
                    setShowBookingConfirm(false);
                    setSelectedTable('');
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-xl font-semibold">
                    {selectedCompany?.company_name?.[0] || 'A'}
                  </span>
                </div>
                <div>
                  <div className="font-semibold">{selectedCompany?.company_name}</div>
                  <div className="flex gap-2 mt-1">
                    <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                      {selectedCompany?.key_product_line?.[0]?.name || 'N/A'}
                    </span>
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                      {selectedCompany?.preferred_platform?.[0]?.name || 'N/A'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-4 space-y-1">
                <div className="text-sm text-gray-600">
                  Country: {selectedCompany?.country}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                <div className="p-2 bg-gray-50 rounded text-sm">
                  {selectedTimeSlot}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Table
                </label>
                <select
                  value={selectedTable}
                  onChange={(e) => setSelectedTable(e.target.value)}
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
                onClick={handleConfirmBooking}
                disabled={!selectedTable}
                className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
