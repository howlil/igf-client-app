import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar";
import DynamicTable from "../../components/Table";
import { useState } from "react";
import Alert from "../../components/Alert";
import AlertSuccess from "../../components/AlertSuccess";

export default function Company(){
    const navigate = useNavigate();

    const [isModalOpenAdd, setModalOpenAdd] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [isDelModalOpen, setDelModalOpen] = useState(false)
    const [isSuccModalOpen, setSuccModalOpen] = useState(false)
    const [isDetailModalOpen, setDetailModalOpen] = useState(false)
    const [filter, setFilter] = useState("All");
    const columns = [
        { key: "no", label: "No " },
        { key: "name", label: "Coompany Name" },
        { key: "representative", label: "Representative Name" },
        { key: "email", label: "Email" },
        { key: "type", label: "Type" },
        { key: "country", label: "Country" },
        { key: "actions", label: "Actions" },
    ];

    const data = [
        {
          no: "01",
          name: "Tech Innovations Ltd.",
          email: "nadiniannisabyant26@gmail.com",
          representative: "John Doe",
          address: "123 Innovation Drive, Silicon Valley, CA",
          logo: "https://via.placeholder.com/100",
          about: "A leading company in tech innovation, specializing in AI and software development.",
          type: "Private Business",
          keyProducts: ["AI Solutions", "Software Development", "Cloud Services"],
          country: "United States",
          schedule: [
            { date: "2024-07-27", times: ["08:00 - 08:30", "09:30 - 10:00"] },
            { date: "2024-07-28", times: ["11:00 - 11:30", "12:30 - 13:00"] },
            { date: "2024-07-29", times: ["11:00 - 11:30", "12:30 - 13:00"] },
            { date: "2024-07-30", times: ["11:00 - 11:30", "12:30 - 13:00"] },
            { date: "2024-08-1", times: ["11:00 - 11:30", "12:30 - 13:00"] },
            { date: "2024-08-2", times: ["11:00 - 11:30", "12:30 - 13:00"] },
            { date: "2024-08-3", times: ["11:00 - 11:30", "12:30 - 13:00"] },
            { date: "2024-08-4", times: ["11:00 - 11:30", "12:30 - 13:00"] },
            { date: "2024-08-5", times: ["11:00 - 11:30", "12:30 - 13:00"] },
            { date: "2024-08-6", times: ["11:00 - 11:30", "12:30 - 13:00"] },
          ],
        status: "active"
        },
        {
          no: "02",
          name: "Green Energy Corp.",
          email: "nadiniannisabyant26@gmail.com",
          representative: "Jane Smith",
          address: "456 Renewable Way, Toronto, Canada",
          logo: "https://via.placeholder.com/100",
          about: "Promoting sustainable energy solutions and innovations.",
          type: "Government",
          keyProducts: ["Solar Panels", "Wind Turbines", "Hydropower"],
          country: "Canada",
          schedule: [
            { date: "2024-08-01", times: ["10:00 - 10:30", "11:00 - 11:30"] },
            { date: "2024-08-02", times: ["13:00 - 13:30"] },
          ],
          status: "active"
        },
        {
          no: "03",
          name: "Digital Horizons",
          email: "nadiniannisabyant26@gmail.com",
          representative: "Alice Johnson",
          address: "789 Future Lane, London, UK",
          logo: "https://via.placeholder.com/100",
          about: "Innovating the future of digital marketing and advertising.",
          type: "Public Institution",
          keyProducts: ["Digital Marketing", "SEO Tools", "Social Media Analytics"],
          country: "United Kingdom",
          schedule: [
            { date: "2024-09-15", times: ["08:00 - 08:30", "10:00 - 10:30"] },
          ],
          status: "active"
        },
        {
          no: "04",
          name: "Innovate Solutions",
          email: "nadiniannisabyant26@gmail.com",
          representative: "Michael Lee",
          address: "101 Solution Blvd, Sydney, Australia",
          logo: "https://via.placeholder.com/100",
          about: "Providing cutting-edge solutions for modern businesses.",
          type: "Private Business",
          keyProducts: ["Business Automation", "IT Support", "Cybersecurity"],
          country: "Australia",
          schedule: [
            { date: "2024-07-22", times: ["09:00 - 09:30"] },
            { date: "2024-07-23", times: ["14:00 - 14:30", "15:00 - 15:30"] },
          ],
          status: "active"
        },
        {
          no: "05",
          name: "Cybernetics Inc.",
          email: "nadiniannisabyant26@gmail.com",
          representative: "Emma Brown",
          address: "202 Security Drive, Berlin, Germany",
          logo: "https://via.placeholder.com/100",
          about: "Experts in cybersecurity and network infrastructure.",
          type: "Universities/Research Institutions",
          keyProducts: ["Network Security", "Data Encryption", "Threat Analysis"],
          country: "Germany",
          schedule: [
            { date: "2024-08-12", times: ["08:00 - 08:30", "09:30 - 10:00"] },
            { date: "2024-08-13", times: ["11:00 - 11:30"] },
          ],
          status: "active"
        },
        {
          no: "06",
          name: "Global Tech",
          email: "nadiniannisabyant26@gmail.com",
          representative: "David Wilson",
          address: "303 Tech Park, Tokyo, Japan",
          logo: "https://via.placeholder.com/100",
          about: "Driving global innovation in tech and robotics.",
          type: "Associations/Organizations",
          keyProducts: ["Robotics", "AI Assistants", "Smart Devices"],
          country: "Japan",
          schedule: [
            { date: "2024-07-10", times: ["10:00 - 10:30", "12:00 - 12:30"] },
          ],
          status: "active"
        },
        {
          no: "07",
          name: "Bright Future Ltd.",
          email: "nadiniannisabyant26@gmail.com",
          representative: "Olivia Martinez",
          address: "404 Future Road, New Delhi, India",
          logo: "https://via.placeholder.com/100",
          about: "Focused on the future of education and learning technologies.",
          type: "Private Business",
          keyProducts: ["E-Learning Platforms", "Virtual Classrooms", "Online Certifications"],
          country: "India",
          schedule: [
            { date: "2024-07-05", times: ["13:00 - 13:30", "14:00 - 14:30"] },
          ],
          status: "active"
        },
        {
          no: "08",
          name: "SustainAbility",
          email: "nadiniannisabyant26@gmail.com",
          representative: "James Taylor",
          address: "505 Eco Lane, Cape Town, South Africa",
          logo: "https://via.placeholder.com/100",
          about: "Advancing sustainability in industries worldwide.",
          type: "Public Institution",
          keyProducts: ["Sustainable Products", "Eco-Friendly Packaging", "Green Technologies"],
          country: "South Africa",
          schedule: [
            { date: "2024-08-20", times: ["09:00 - 09:30", "10:30 - 11:00"] },
          ],
          status: "active"
        },
        {
          no: "09",
          name: "NextGen Robotics",
          email: "nadiniannisabyant26@gmail.com",
          representative: "Sophia Anderson",
          address: "606 Robotics Ave, Beijing, China",
          logo: "https://via.placeholder.com/100",
          about: "Creating the next generation of intelligent robots.",
          type: "Universities/Research Institutions",
          keyProducts: ["Industrial Robots", "AI-Driven Automation"],
          country: "China",
          schedule: [
            { date: "2024-09-01", times: ["08:00 - 08:30", "09:30 - 10:00"] },
          ],
          status: "active"
        },
        {
          no: "10",
          name: "AI Visionaries",
          email: "nadiniannisabyant26@gmail.com",
          representative: "Liam Thomas",
          address: "707 AI Blvd, São Paulo, Brazil",
          logo: "https://via.placeholder.com/100",
          about: "Pioneers in artificial intelligence and machine learning.",
          type: "Private Business",
          keyProducts: ["ML Models", "AI SaaS", "Predictive Analytics"],
          country: "Brazil",
          schedule: [
            { date: "2024-07-18", times: ["08:00 - 08:30", "09:00 - 09:30", "10:00 - 10:30"] },
          ],
          status: "deactive"
        },
        {
            no: "11",
            name: "Tech Innovations Ltd.",
            email: "nadiniannisabyant26@gmail.com",
            representative: "John Doe",
            address: "123 Innovation Drive, Silicon Valley, CA",
            logo: "https://via.placeholder.com/100",
            about: "A leading company in tech innovation, specializing in AI and software development.",
            type: "Private Business",
            keyProducts: ["AI Solutions", "Software Development", "Cloud Services"],
            country: "United States",
            schedule: [
              { date: "2024-07-27", times: ["08:00 - 08:30", "09:30 - 10:00"] },
              { date: "2024-07-28", times: ["11:00 - 11:30", "12:30 - 13:00"] },
            ],
            status: "deactive"
          },
          {
            no: "12",
            name: "Green Energy Corp.",
            email: "nadiniannisabyant26@gmail.com",
            representative: "Jane Smith",
            address: "456 Renewable Way, Toronto, Canada",
            logo: "https://via.placeholder.com/100",
            about: "Promoting sustainable energy solutions and innovations.",
            type: "Government",
            keyProducts: ["Solar Panels", "Wind Turbines", "Hydropower"],
            country: "Canada",
            schedule: [
              { date: "2024-08-01", times: ["10:00 - 10:30", "11:00 - 11:30"] },
              { date: "2024-08-02", times: ["13:00 - 13:30"] },
            ],
            status: "deactive"
          },
          {
            no: "13",
            name: "Digital Horizons",
            email: "nadiniannisabyant26@gmail.com",
            representative: "Alice Johnson",
            address: "789 Future Lane, London, UK",
            logo: "https://via.placeholder.com/100",
            about: "Innovating the future of digital marketing and advertising.",
            type: "Public Institution",
            keyProducts: ["Digital Marketing", "SEO Tools", "Social Media Analytics"],
            country: "United Kingdom",
            schedule: [
              { date: "2024-09-15", times: ["08:00 - 08:30", "10:00 - 10:30"] },
            ],
            status: "deactive"
          },
          {
            no: "14",
            name: "Innovate Solutions",
            email: "nadiniannisabyant26@gmail.com",
            representative: "Michael Lee",
            address: "101 Solution Blvd, Sydney, Australia",
            logo: "https://via.placeholder.com/100",
            about: "Providing cutting-edge solutions for modern businesses.",
            type: "Private Business",
            keyProducts: ["Business Automation", "IT Support", "Cybersecurity"],
            country: "Australia",
            schedule: [
              { date: "2024-07-22", times: ["09:00 - 09:30"] },
              { date: "2024-07-23", times: ["14:00 - 14:30", "15:00 - 15:30"] },
            ],
            status: "deactive"
          },
          {
            no: "15",
            name: "Cybernetics Inc.",
            email: "nadiniannisabyant26@gmail.com",
            representative: "Emma Brown",
            address: "202 Security Drive, Berlin, Germany",
            logo: "https://via.placeholder.com/100",
            about: "Experts in cybersecurity and network infrastructure.",
            type: "Universities/Research Institutions",
            keyProducts: ["Network Security", "Data Encryption", "Threat Analysis"],
            country: "Germany",
            schedule: [
              { date: "2024-08-12", times: ["08:00 - 08:30", "09:30 - 10:00"] },
              { date: "2024-08-13", times: ["11:00 - 11:30"] },
            ],
            status: "deactive"
          },
          {
            no: "16",
            name: "Global Tech",
            email: "nadiniannisabyant26@gmail.com",
            representative: "David Wilson",
            address: "303 Tech Park, Tokyo, Japan",
            logo: "https://via.placeholder.com/100",
            about: "Driving global innovation in tech and robotics.",
            type: "Associations/Organizations",
            keyProducts: ["Robotics", "AI Assistants", "Smart Devices"],
            country: "Japan",
            schedule: [
              { date: "2024-07-10", times: ["10:00 - 10:30", "12:00 - 12:30"] },
            ],
            status: "deactive"
          },
          {
            no: "17",
            name: "Bright Future Ltd.",
            email: "nadiniannisabyant26@gmail.com",
            representative: "Olivia Martinez",
            address: "404 Future Road, New Delhi, India",
            logo: "https://via.placeholder.com/100",
            about: "Focused on the future of education and learning technologies.",
            type: "Private Business",
            keyProducts: ["E-Learning Platforms", "Virtual Classrooms", "Online Certifications"],
            country: "India",
            schedule: [
              { date: "2024-07-05", times: ["13:00 - 13:30", "14:00 - 14:30"] },
            ],
            status: "deactive"
          },
          {
            no: "18",
            name: "SustainAbility",
            email: "nadiniannisabyant26@gmail.com",
            representative: "James Taylor",
            address: "505 Eco Lane, Cape Town, South Africa",
            logo: "https://via.placeholder.com/100",
            about: "Advancing sustainability in industries worldwide.",
            type: "Public Institution",
            keyProducts: ["Sustainable Products", "Eco-Friendly Packaging", "Green Technologies"],
            country: "South Africa",
            schedule: [
              { date: "2024-08-20", times: ["09:00 - 09:30", "10:30 - 11:00"] },
            ],
            status: "deactive"
          },
          {
            no: "19",
            name: "NextGen Robotics",
            email: "nadiniannisabyant26@gmail.com",
            representative: "Sophia Anderson",
            address: "606 Robotics Ave, Beijing, China",
            logo: "https://via.placeholder.com/100",
            about: "Creating the next generation of intelligent robots.",
            type: "Universities/Research Institutions",
            keyProducts: ["Industrial Robots", "AI-Driven Automation"],
            country: "China",
            schedule: [
              { date: "2024-09-01", times: ["08:00 - 08:30", "09:30 - 10:00"] },
            ],
            status: "deactive"
          },
          {
            no: "20",
            name: "AI Visionaries",
            email: "nadiniannisabyant26@gmail.com",
            representative: "Liam Thomas",
            address: "707 AI Blvd, São Paulo, Brazil",
            logo: "https://via.placeholder.com/100",
            about: "Pioneers in artificial intelligence and machine learning.",
            type: "Private Business",
            keyProducts: ["ML Models", "AI SaaS", "Predictive Analytics"],
            country: "Brazil",
            schedule: [
              { date: "2024-07-18", times: ["08:00 - 08:30", "09:00 - 09:30", "10:00 - 10:30"] },
            ],
            status: "deactive"
          },
    ];

    const [companyData, setCompanyData] = useState(data)

    const columnStyles = [
        "text-center",
        "text-left",
        "text-left",
        "text-center",
        "text-center",
        "text-center",
    ];
      

    const [searchQuery, setSearchQuery] = useState(""); 
    const [filteredData, setFilteredData] = useState(data); 
  


    const handleRowClick = (row) => {
        setSelectedRow(row);
        setDetailModalOpen(true)
    };

    const handleDelete = (row, event) => {
        event.stopPropagation()
        setSelectedRow(row); 
        setDelModalOpen(true)
    };

    const handleConfirm = () => {
        setDelModalOpen(false)
        setSuccModalOpen(true)
    }
    
    const handleCancel = () => {
        setDelModalOpen(false)
    }

    const handleConfirmSucc = () => {
        setSuccModalOpen(false)
    }

    const handleToggleStatus = (row, event) => {
        event.stopPropagation(); // Prevent triggering row click event
        const updatedData = companyData.map((company) =>
          company.no === row.no
            ? { ...company, status: company.status === "active" ? "deactive" : "active" }
            : company
        );
        setCompanyData(updatedData);
      
        // Update the filtered data as well to reflect the change in the UI
        const updatedFilteredData = updatedData.filter(
          (item) =>
            item.no.toLowerCase().includes(searchQuery) ||
            item.name.toLowerCase().includes(searchQuery) ||
            item.representative.toLowerCase().includes(searchQuery) ||
            item.email.toLowerCase().includes(searchQuery) ||
            item.type.toLowerCase().includes(searchQuery) ||
            item.country.toLowerCase().includes(searchQuery)
        );
        setFilteredData(updatedFilteredData);
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value.toLowerCase());
    };

    const displayedData = companyData.filter(
        (item) =>
          item.no.toLowerCase().includes(searchQuery) ||
          item.name.toLowerCase().includes(searchQuery) ||
          item.representative.toLowerCase().includes(searchQuery) ||
          item.email.toLowerCase().includes(searchQuery) ||
          item.type.toLowerCase().includes(searchQuery) ||
          item.country.toLowerCase().includes(searchQuery)
    );
    

    return(
        <>
        <div className="bg-white h-screen">
            {/* Navbar */}
            <Navbar />
            <div className="p-8">
            {/* Title and Button */}
            <div className="flex justify-between items-center mb-4">
                <div>
                <h1 className="text-2xl font-bold">Conference</h1>
                <p className="w-full md:w-1/2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Deleniti quaerat laboriosam earum voluptatibus soluta amet autem
                    aperiam, eum vero, est praesentium reprehenderit minima
                    reiciendis mollitia! Non odit tempore maiores nesciunt?
                </p>
                </div>
            </div>

            <div className="flex justify-end">
              {/* Search input */}
              <div className="w-full md:w-1/4">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                />
              </div>
          </div>

            {/* Table */}
            <DynamicTable
                columns={columns}
                data={displayedData.map((row) => ({
                ...row,
                actions: (
                    <div className="flex justify-center space-x-2">

                    {/* Toggle Switch */}
                    <div className="flex items-center">
                        <button
                        onClick={(event) => handleToggleStatus(row, event)}
                        className={`relative w-12 h-6 flex items-center rounded-full transition-colors ${
                            row.status === "active" ? "bg-green-500" : "bg-gray-300"
                        }`}
                        >
                        <span
                            className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                            row.status === "active" ? "translate-x-6" : "translate-x-0"
                            }`}
                        ></span>
                        </button>
                    </div>

                    {/* Delete Button */}
                    <button
                        onClick={(event) => handleDelete(row, event)}
                        className="p-2 rounded-full bg-red-500 hover:bg-red-600 text-white"
                        title="Delete"
                    >
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                        >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10.5 6h3m4.5 0h2.25m-13.5 0H6m3.75 0V5.25c0-.414.336-.75.75-.75h3c.414 0 .75.336.75.75V6m2.25 0v12a2.25 2.25 0 01-2.25 2.25h-4.5A2.25 2.25 0 019 18V6h6zm-3 6v6m-3-6v6m6-6v6"
                        />
                        </svg>
                    </button>
                    </div>
                ),
                }))}
                positionTH={"text-center"}
                columnStyles={columnStyles}
                onRowClick={handleRowClick}
            />
            </div>
        </div>

        {/* Modal Detail */}
        {isDetailModalOpen && selectedRow && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl mx-4 max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-bold">Company Details</h2>
                <button
                className="text-red-500 hover:text-red-700 text-lg"
                onClick={() => setDetailModalOpen(false)}
                >
                ×
                </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 overflow-y-auto max-h-[80vh]">
                {/* Company Info Section */}
                <div>
                <div className="flex items-center space-x-4">
                    <img
                    src={selectedRow.logo}
                    alt="Company Logo"
                    className="w-16 h-16 rounded-full object-cover border border-gray-200"
                    />
                    <div>
                    <h3 className="text-lg font-semibold">{selectedRow.name}</h3>
                    <p className="text-sm text-gray-600">{selectedRow.type}</p>
                    </div>
                </div>
                <p className="mt-4 text-sm text-gray-700">{selectedRow.about}</p>
                </div>

                {/* Contact Info */}
                <div>
                <h3 className="text-lg font-semibold border-b pb-2 mb-4">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                    <p className="text-sm font-medium text-gray-600">Representative Name:</p>
                    <p className="text-lg text-gray-800">{selectedRow.representative}</p>
                    </div>
                    <div>
                    <p className="text-sm font-medium text-gray-600">Email:</p>
                    <p className="text-lg text-gray-800">{selectedRow.email}</p>
                    </div>
                    <div className="md:col-span-2">
                    <p className="text-sm font-medium text-gray-600">Address:</p>
                    <p className="text-lg text-gray-800">{selectedRow.address}</p>
                    </div>
                </div>
                </div>

                {/* Classification */}
                <div>
                <h3 className="text-lg font-semibold border-b pb-2 mb-4">Classification</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                    <p className="text-sm font-medium text-gray-600">Type:</p>
                    <p className="text-lg text-gray-800">{selectedRow.type}</p>
                    </div>
                    <div>
                    <p className="text-sm font-medium text-gray-600">Country:</p>
                    <p className="text-lg text-gray-800">{selectedRow.country}</p>
                    </div>
                </div>
                </div>

                {/* Key Product Lines and Schedule */}
                <div>
                <h3 className="text-lg font-semibold border-b pb-2 mb-4">Key Product Lines & Schedule</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Key Product Lines */}
                    <div>
                    <p className="text-sm font-medium text-gray-600">Key Product Lines:</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {selectedRow.keyProducts.map((product, index) => (
                        <span
                            key={index}
                            className="px-3 py-1 text-sm bg-blue-100 text-gray-800 rounded-full"
                        >
                            {product}
                        </span>
                        ))}
                    </div>
                    </div>

                    {/* Schedule */}
                    <div>
                    <p className="text-sm font-medium text-gray-600">Schedule:</p>
                    <div className="flex flex-wrap gap-4 mt-2">
                        {selectedRow.schedule.map((scheduleItem, index) => (
                        <div key={index} className="bg-red-100 p-2 rounded shadow-sm">
                            <p className="text-sm font-medium text-gray-700">Date: {scheduleItem.date}</p>
                            <ul className="list-disc pl-4 text-sm text-gray-600 mt-1">
                            {scheduleItem.times.map((time, timeIndex) => (
                                <li key={timeIndex}>{time}</li>
                            ))}
                            </ul>
                        </div>
                        ))}
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        )}

      {/* modal delete */}
      {isDelModalOpen && (
        <Alert
          title="Delete Item"
          description="Are you sure you want to delete this item? This action cannot be undone."
          confirmLabel="Delete"
          cancelLabel="Go Back"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}

            {/* modal success */}
      {isSuccModalOpen && (
        <AlertSuccess
          title="Operation Successful"
          description="Your data has been saved successfully."
          confirmLabel="Got it"
          onConfirm={handleConfirmSucc}
        />
      )}



        </>
    )
}