import React, { useState } from 'react'
import Layout from './components/Layout'
import TimeSlot from './components/schedule/TimeSlot'
import MeetingCard from './components/schedule/MeetingCard'
import SuggestionCard from './components/schedule/SuggestionCard'

export default function ScheduleUser() {
  // State for selected company and its schedule
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showBookingConfirm, setShowBookingConfirm] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  // Dummy company data with schedules
  const companies = [
    {
      id: 1,
      company: 'Company A',
      productLine: 'Online/PC Games',
      platform: 'PC',
      associations: 'Associations/Organizations',
      genre: 'Shooting',
      country: 'Asia',
      bizMatching: 'Publisher',
      schedule: {
        '08:00 - 08:30': 'waiting',
        '08:30 - 09:00': 'available',
        '09:00 - 09:30': 'not-available',
        '09:30 - 10:00': 'upcoming',
        '10:00 - 10:30': 'available',
        '10:30 - 11:00': 'upcoming',
        '11:30 - 12:00': 'not-available',
        '12:00 - 12:30': 'lunch-break',
      }
    },
    {
      id: 2,
      company: 'Company B',
      productLine: 'Mobile Games',
      platform: 'Mobile',
      associations: 'Associations/Organizations',
      genre: 'RPG',
      country: 'Europe',
      bizMatching: 'Developer',
      schedule: {
        '08:00 - 08:30': 'available',
        '08:30 - 09:00': 'not-available',
        '09:00 - 09:30': 'available',
        '09:30 - 10:00': 'available',
        '10:00 - 10:30': 'waiting',
        '10:30 - 11:00': 'upcoming',
        '11:30 - 12:00': 'available',
        '12:00 - 12:30': 'lunch-break',
      }
    },
    // Add more companies as needed
  ];

  // Handler for booking button in suggestions
  const handleBookClick = (company) => {
    setSelectedCompany(company);
  };

  // Handler for booking a specific time slot
  const handleBookMeeting = (time) => {
    setSelectedTimeSlot(time);
    setShowBookingConfirm(true);
  };

  // Confirm booking handler
  const handleConfirmBooking = () => {
    if (selectedCompany && selectedTimeSlot) {
      // Here you would typically make an API call to book the meeting
      console.log(`Booking meeting with ${selectedCompany.company} at ${selectedTimeSlot}`);
      
      // Update the local state to reflect the booking
      const updatedCompanies = companies.map(company => {
        if (company.id === selectedCompany.id) {
          return {
            ...company,
            schedule: {
              ...company.schedule,
              [selectedTimeSlot]: 'waiting'
            }
          };
        }
        return company;
      });
      
      // Update the selected company's schedule
      const updatedCompany = updatedCompanies.find(c => c.id === selectedCompany.id);
      setSelectedCompany(updatedCompany);
      
      setShowBookingConfirm(false);
      setSelectedTimeSlot(null);
    }
  };

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
                {companies.map((item) => (
                  <SuggestionCard
                    key={item.id}
                    company={item.company}
                    productLine={item.productLine}
                    platform={item.platform}
                    onBook={() => handleBookClick(item)}
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
                <span className="text-gray-600">Saturday, 07 December 2024</span>
              </div>

              <div className="divide-y divide-gray-200">
                {selectedCompany ? (
                  Object.entries(selectedCompany.schedule).map(([time, status], index) => (
                    <TimeSlot key={index} time={time}>
                      {status === 'available' ? (
                        <div className="flex justify-center">
                          <button
                            onClick={() => handleBookMeeting(time)}
                            className="border-2 border-red-600 text-red-500 px-4 py-2 rounded-lg  transition-all"
                          >
                            Book Meeting
                          </button>
                        </div>
                      ) : (
                        <MeetingCard
                          company={selectedCompany.company}
                          associations={selectedCompany.associations}
                          productLine={selectedCompany.productLine}
                          platform={selectedCompany.platform}
                          genre={selectedCompany.genre}
                          country={selectedCompany.country}
                          bizMatching={selectedCompany.bizMatching}
                          status={status}
                        />
                      )}
                    </TimeSlot>
                  ))
                ) : (
                  <div className="p-8 text-center text-gray-500">
                    Select a company from suggestions to view their schedule
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Confirmation Dialog */}
      {showBookingConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Confirm Booking</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to book a meeting with {selectedCompany?.company} at {selectedTimeSlot}?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowBookingConfirm(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmBooking}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}