  import api from "../../utils/api";
  import React, { useState, useEffect } from "react";

  export default function ConferenceDashboard() {
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
    const [currentDate, setCurrentDate] = useState(new Date().toISOString().split("T")[0]);
    const [showDateDropdown, setShowDateDropdown] = useState(false);
    const [startTable, setStartTable] = useState(0);
    const [endTable, setEndTable] = useState(8);
    const [dataDash, setData] = useState([]); 
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
      fetchDash();
    }, []); 

    const fetchDash = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/dashboard-meja`);
        console.log(response); 
        if (response.data.data && response.data.data.length > 0) {
          const formattedData = response.data.data.map((item) => ({
            conference_name: item.company_book.conference.name,
            id_conference: item.company_book.conference.id,
            sum_table: item.company_book.conference.sum_table, 
            time_start: item.company_book.conference.time_start,
            time_end: item.company_book.conference.time_end, 
            bookings: [
              {
                date: item.table.date,
                time_start: item.time_start,
                time_end: item.time_end,
                table: item.table.name_table,
                company: [
                  item.company_book.company_name,
                  item.company_match.company_name,
                ],
              },
            ],
          }));
          setData(formattedData);
        } else {
          setData([]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    const [selectedConference, setSelectedConference] = useState(null); 

    useEffect(() => {
      if (dataDash.length > 0) {
        setSelectedConference(dataDash[0]); 
      }
    }, [dataDash]);
    const conference = selectedConference || {};
    const { sum_table, time_start, time_end, bookings } = conference;

    const tables = Array.from({ length: sum_table || 0 }, (_, i) => `Table ${i + 1}`);
    const timeRange = () => {
      const startHour = parseInt(time_start?.split(":")[0] || 0);
      const endHour = parseInt(time_end?.split(":")[0] || 0);
      return Array.from({ length: endHour - startHour + 1 }, (_, i) => `${startHour + i}:00`);
    };

    const [filteredBookings, setFilteredBookings] = useState([]);

    useEffect(() => {
      setFilteredBookings(bookings?.filter((booking) => booking.date === selectedDate) || []);
    }, [bookings, selectedDate]);

    const handleTodayClick = () => {
      setSelectedDate(currentDate);
    };

    const uniqueDates = [
      ...new Set(bookings?.map((booking) => booking.date) || []),
      currentDate,
    ].sort();

    const handlePreviousDate = () => {
      const index = uniqueDates.indexOf(selectedDate);
      if (index > 0) {
        setSelectedDate(uniqueDates[index - 1]);
      }
    };

    const handleNextDate = () => {
      const index = uniqueDates.indexOf(selectedDate);
      if (index < uniqueDates.length - 1) {
        setSelectedDate(uniqueDates[index + 1]);
      }
    };

    return (
      <div className="p-4 bg-white h-screen">
        {/* Header */}
        <div className="md:flex md:justify-between md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold pb-3">Dashboard Meja</h1>
            <p className="text-gray-600 text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className="md:flex md:items-center md:gap-4">
            {/* Dropdown Conference */}
            <div className="w-full md:w-fit z-50">
              <button
                className="bg-red w-full md:w-fit mt-5 md:mt-0 text-white px-4 py-2 rounded"
                onClick={() => setShowCalendar(!showCalendar)}
              >
                {selectedConference ? selectedConference.conference_name : "Select Conference"}
              </button>
              {showCalendar && (
                <div className="absolute right-50 mt-2 bg-white shadow-lg rounded border w-48 z-50">
                  {dataDash.map((conf, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => {
                        setSelectedConference(conf);
                        setShowCalendar(false);
                        setSelectedDate("");
                      }}
                    >
                      {conf.conference_name}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button
              className="w-full md:w-fit mt-2 md:mt-0 bg-gray-800 text-white px-4 py-2 rounded"
              onClick={handleTodayClick}
            >
              Today
            </button>
            <div className="flex mt-3 md:mt-0 justify-center">
              {/* Previous Date Button */}
              <div className="flex items-center gap-2">
                <button
                  className="text-gray-600 hover:text-black"
                  onClick={handlePreviousDate}
                >
                  &lt;
                </button>

                {/* Dropdown for Dates */}
                <div className="relative">
                  <button
                    className="text-gray-700 font-medium px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
                    onClick={() => setShowDateDropdown((prev) => !prev)}
                  >
                    {new Date(selectedDate || currentDate).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </button>
                  {showDateDropdown && (
                    <div className="absolute top-full left-0 mt-2 w-40 max-h-60 overflow-y-auto bg-white border border-gray-300 rounded shadow-lg z-10">
                      {uniqueDates.map((date) => (
                        <div
                          key={date}
                          className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${date === selectedDate ? "bg-gray-200 font-bold" : ""}`}
                          onClick={() => {
                            setSelectedDate(date);
                            setShowDateDropdown(false);
                          }}
                        >
                          {new Date(date).toLocaleDateString("en-US", {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Next Date Button */}
                <button
                  className="text-gray-600 hover:text-black"
                  onClick={handleNextDate}
                >
                  &gt;
                </button>
              </div>
            </div>
          </div>
        </div>

        {selectedConference && (
          <div className="relative overflow-x-auto">
            <div className="relative">
              <div className="w-full">
                <table className="w-full border-collapse overflow-x-auto">
                  <thead>
                    <tr>
                      <th className="border border-t-0 border-s-0 border-gray-200 px-6 py-6 text-lg">GMT</th>
                      {tables.slice(startTable, endTable).map((table) => (
                        <th key={table} className="border border-t-0 border-gray-300 px-6 py-6 text-lg">
                          {table}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {timeRange().map((time) => (
                      <tr key={time} className="space-y-2">
                        <td className="border border-s-0 text-center border-gray-300 px-8 py-8 text-base">{time}</td>
                        {tables.slice(startTable, endTable).map((table) => {
                          const normalize = (value) => value.trim().toLowerCase();
                          const booking = filteredBookings.find(
                            (b) =>
                              normalize(b.table) === normalize(table) &&
                              b.time_start === time
                          );

                          return (
                          <td key={`${time}-${table}`} className="border border-gray-300 px-2 py-2 max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">
                            {booking && (
                              <div className="bg-gray-100 p-2 rounded-lg shadow-md">
                                <p className="text-xs sm:text-sm lg:text-base font-medium">
                                  {booking.time_start} - {booking.time_end}
                                </p>
                                <p className="text-xs text-gray-600">{booking.company.join(", ")}</p>
                              </div>
                            )}
                          </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
