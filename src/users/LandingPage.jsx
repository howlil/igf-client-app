export default function LandingPage() {
  return (
    <div className="bg-gradient-to-b from-gray-200 via-white to-gray-200">
      {/* Header */}
      <header className="flex items-center justify-center h-screen px-4">
        <div className="flex items-center justify-center">
          <img
            src="/public/admin/logo.png"
            alt="Logo"
            className="w-3/4 md:w-1/2"
          />
        </div>
      </header>

      {/* B2B Matchmaking Section */}
      <div className="flex items-center justify-center h-auto md:h-screen px-4 py-10">
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
            {["Conference A", "Conference B", "Conference C", "Conference D"].map(
              (conference, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                >
                  <img
                    src={`https://via.placeholder.com/300x200`} // Replace with actual conference images
                    alt={conference}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-base md:text-lg font-bold text-gray-700">{conference}</h3>
                  </div>
                </div>
              )
            )}
          </div>
        </section>
      </div>

      {/* Footer */}
      <div className="bg-bg-login bg-center bg-cover">
        <footer className="bg-red opacity-70 z-10 py-10 px-4">
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6">
            <a href="/register">
              <button className="text-white border hover:bg-white hover:text-black border-white font-bold px-6 py-2 rounded-md transition">
                REGISTER
              </button>
            </a>
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
