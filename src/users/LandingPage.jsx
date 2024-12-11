import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";
import { useIslogin, useIsAdmin } from "../utils/utils.js";

export default function LandingPage() {
  const [dataConf, setData] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0); // Track current slide in the carousel
  const b2bRef = useRef(null);
  const ISLOGIN = useIslogin();
  const ISADMIN = useIsAdmin();

  const scrollToB2B = () => {
    if (b2bRef.current) {
      b2bRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const fetchConf = async () => {
    try {
      const response = await api.get("/list-conference");

      const formattedData = response.data.data.map((item) => ({
        name: item.name,
        id: item.id,
        description: item.description,
        speaker: item.speaker,
        moderator: item.moderator,
      }));
      setData(formattedData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchConf();
  }, []);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % dataConf.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + dataConf.length) % dataConf.length);
  };

  function handleDashboard() {
    if (ISADMIN) {
      window.location.href = "/dashboard-table";
    } else {
      window.location.href = "/u/companies";
    }
  }

  return (
    <div className="bg-gradient-to-b from-gray-200 via-white to-gray-200">
      {/* Header */}
      <header className="flex items-center justify-center h-screen px-4">
        <div className="flex items-center justify-center">
          <img src="/admin/logo.png" alt="Logo" className="w-3/4 md:w-1/2" />
        </div>
      </header>

      {/* B2B Matchmaking Section */}
      <div
        className="flex items-center justify-center h-auto md:h-screen px-4 py-10"
        ref={b2bRef}
      >
        <section className="text-center w-full md:w-3/4 lg:w-1/2">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-6">
            B<span className="text-red">2</span>B Matchmaking
          </h2>
          <p className="text-gray-600 text-sm md:text-base mb-10">
            Learn more about us, connect with others in the industry, and create
            powerful business relationships at ISF Connect. Engage in B2B
            matchmaking sessions and connect with industry leaders at ISF.
          </p>

          {/* Conference Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {dataConf.map((conference) => (
              <Link
                to={`/register?id=${conference.id}`}
                key={conference.id}
              >
                <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                  <img
                    src={`https://via.placeholder.com/300x200`}
                    alt={conference.name}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-base md:text-lg font-bold text-gray-700">
                      {conference.name}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* Conference Carousel Section */}
      {dataConf.length > 0 && (
        <div className="pb-20">
          <div className="container mx-auto px-4 relative">
            <h2 className="text-center text-red-500 text-2xl md:text-3xl font-bold mb-6">
              CONFERENCE
            </h2>

            <div className="relative flex items-center justify-center pt-10">
              {/* Left Arrow */}
              <button
                onClick={handlePrevSlide}
                className="absolute left-0 z-10 bg-gray-300 hover:bg-gray-400 rounded-full p-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6 text-black"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              {/* Slide Content */}
              <div className="flex flex-wrap md:flex-nowrap items-center justify-center gap-6">
                {/* Image Section */}
                <div className="w-full md:w-1/2">
                  <img
                    src={`https://via.placeholder.com/800x400`}
                    alt={dataConf[currentSlide].name}
                    className="w-full rounded-lg"
                  />
                </div>

                {/* Data Section */}
                <div className="w-full md:w-1/2 sm:text-center md:text-right md:pr-12">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-700 mb-4">
                    {dataConf[currentSlide].name}
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base mb-6">
                    {dataConf[currentSlide].description}
                  </p>
                  <div className="flex justify-between items-center sm:justify-center md:justify-end gap-6">
                    <div className="text-center md:text-right">
                      <h4 className="text-red-500 font-bold uppercase">Speaker</h4>
                      <p>{dataConf[currentSlide].speaker}</p>
                    </div>
                    <div className="text-center md:text-right">
                      <h4 className="text-red-500 font-bold uppercase">Moderator</h4>
                      <p>{dataConf[currentSlide].moderator}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Arrow */}
              <button
                onClick={handleNextSlide}
                className="absolute right-0 z-10 bg-gray-300 hover:bg-gray-400 rounded-full p-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6 text-black"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            {/* Dots Navigation */}
            <div className="flex justify-center mt-4">
              {dataConf.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full mx-1 ${
                    index === currentSlide
                      ? "bg-red-500"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                ></button>
              ))}
            </div>
          </div>
        </div>

      )}

      {/* Footer */}
      <div className="bg-bg-login bg-center bg-cover">
        <footer className="bg-red opacity-70 z-10 py-10 px-4">
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6">
            {ISLOGIN ? (
              <>
                <button
                  onClick={handleDashboard}
                  className="bg-white text-red font-bold px-6 py-2 rounded-md hover:bg-gray-100 hover:text-black transition"
                >
                  Dashboard
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={scrollToB2B}
                  className="text-white border hover:bg-white hover:text-black border-white font-bold px-6 py-2 rounded-md transition"
                >
                  REGISTER
                </button>
                <a href="/login">
                  <button className="bg-white text-red font-bold px-6 py-2 rounded-md hover:bg-gray-100 hover:text-black transition">
                    LOGIN
                  </button>
                </a>
              </>
            )}
          </div>
        </footer>
      </div>
    </div>
  );
}
