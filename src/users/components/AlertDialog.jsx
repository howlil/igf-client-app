import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom'; 
import api from '../../utils/api';
import Slider from 'react-slick';

export default function LandingPage() {
  const [dataConf, setData] = useState([]);
  const b2bRef = useRef(null);

  const scrollToB2B = () => {
    if (b2bRef.current) {
      b2bRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
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
        moderator: item.moderator
      }));
      setData(formattedData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchConf();
  }, []);

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true, // Menampilkan tombol kiri dan kanan
    prevArrow: <button className="slick-prev slick-arrow">{"<"}</button>,
    nextArrow: <button className="slick-next slick-arrow">{">"}</button>
  };

  return (
    <div className="bg-gradient-to-b from-gray-200 via-white to-gray-200">
      {/* Header */}
      <header className="flex items-center justify-center h-screen px-4">
        <div className="flex items-center justify-center">
          <img
            src="/admin/logo.png"
            alt="Logo"
            className="w-3/4 md:w-1/2"
          />
        </div>
      </header>

      {/* B2B Matchmaking Section */}
      <div className="flex items-center justify-center h-auto md:h-screen px-4 py-10" ref={b2bRef}>
        <section className="text-center w-full md:w-3/4 lg:w-1/2">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-6">
            B<span className="text-red">2</span>B Matchmaking
          </h2>
          <p className="text-gray-600 text-sm md:text-base mb-10">
            Learn more about us, connect with others in the industry, and create
            powerful business relationships at ISF Connect. Engage in B2B matchmaking
            sessions and connect with industry leaders at ISF.
          </p>

          {/* Conference Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {dataConf.map((conference) => (
              <Link
                to={`/register?id=${conference.id}`} // Mengarahkan ke halaman register dengan ID sebagai query parameter
                key={conference.id}
              >
                <div
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                >
                  <img
                    src={`https://via.placeholder.com/300x200`} // Gambar placeholder
                    alt={conference.name}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-base md:text-lg font-bold text-gray-700">{conference.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* Detail Conference Section - Before Footer */}
      <div className="py-20 px-4 bg-gray-100">
        <h2 className="text-2xl md:text-4xl font-bold text-center text-gray-800 mb-10">
          Conference Details
        </h2>

        <Slider {...sliderSettings}>
          {dataConf.map((conference) => (
            <div key={conference.id} className="flex justify-center items-center space-x-4">
              <div className="w-1/2">
                <img
                  src={`https://via.placeholder.com/600x400`} // Gambar conference
                  alt={conference.name}
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                />
              </div>

              <div className="w-1/2 text-gray-800">
                <h3 className="text-xl font-bold mb-4">{conference.name}</h3>
                <p className="text-base mb-4">{conference.description}</p>
                <div className="mb-4">
                  <h4 className="font-semibold">Speaker:</h4>
                  <p className="text-sm">{conference.speaker}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Moderator:</h4>
                  <p className="text-sm">{conference.moderator}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Footer */}
      <div className="bg-bg-login bg-center bg-cover">
        <footer className="bg-red opacity-70 z-10 py-10 px-4">
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6">
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
          </div>
        </footer>
      </div>
    </div>
  );
}
