import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar";
import DynamicTable from "../../components/Table";
import { useEffect, useState } from "react";
import Alert from "../../components/Alert";
import AlertSuccess from "../../components/AlertSuccess";
import api from "../../../utils/api";
import Swal from "sweetalert2";
import Spinner from "../../components/Spinner";

export default function Company(){
    const navigate = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem('token');
      const username = localStorage.getItem('username')
      if (!token && username !== 'admin') {
        navigate('/notAllowed');
      }
    }, [navigate]);

    const [selectedRow, setSelectedRow] = useState(null);
    const [isDelModalOpen, setDelModalOpen] = useState(false)
    const [isSuccModalOpen, setSuccModalOpen] = useState(false)
    const [isDetailModalOpen, setDetailModalOpen] = useState(false)
    const columns = [
        { key: "no", label: "No " },
        { key: "company_name", label: "Coompany Name" },
        { key: "representative_name", label: "Representative Name" },
        { key: "company_type", label: "Type" },
        { key: "country", label: "Country" },
        { key: "actions", label: "Actions" },
    ];
    const [companyData, setCompanyData] = useState([])
    const [isLoading, setLoading] = useState(false)


    useEffect(() => {
      fetchCompanies();
    }, []);
  
    const fetchCompanies = async () => {
      try {
        const response = await api.get("/companys");
  
        const formattedData = response.data.data.map((item, index) => {
          const scheduleMap = item.schedule.reduce((acc, schedule) => {
            const existingSchedule = acc.find((s) => s.date === schedule.date);
            if (existingSchedule) {
              existingSchedule.times.push(`${schedule.time_start} - ${schedule.time_end}`);
            } else {
              acc.push({
                date: schedule.date,
                times: [`${schedule.time_start} - ${schedule.time_end}`],
              });
            }
            return acc;
          }, []);
  
          return {
            no: String(index + 1).padStart(2, "0"),
            company_name: item.company_name,
            representative_name: item.representative_name,
            address: item.address,
            company_logo: `${import.meta.env.VITE_API_URL}/${item.company_logo}`,
            about_us: item.about_us,
            company_type: item.company_type,
            key_product_line: item.key_product_line.map((line) => line.name),
            country: item.country,
            schedule: scheduleMap,
            biz_match: item.biz_match.map((match) => match.name),
            preferred_platform: item.preferred_platform.map((platform) => platform.name),
            status: item.status === "1" ? "active" : "inactive",
            id: item.id
          };
        });
  
        setCompanyData(formattedData);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

    const columnStyles = [
        "text-center",
        "text-left",
        "text-left",
        "text-center",
        "text-center",
        "text-center",
    ];
      

    const [searchQuery, setSearchQuery] = useState(""); 
    const [filteredData, setFilteredData] = useState(companyData); 
  


    const handleRowClick = (row) => {
        setSelectedRow(row);
        setDetailModalOpen(true)
    };

    const handleDelete = (row, event) => {
        event.stopPropagation()
        setSelectedRow(row); 
        setDelModalOpen(true)
    };

    const handleConfirm = async () => {
      try {
        setLoading(true)
        const response = await api.delete(`/conmpanys/${selectedRow.id}`)
        if (response.data.success) {
            setDelModalOpen(false)
            setSuccModalOpen(true)
            fetchCompanies()
        } else {
          Swal.fire({
            text: response.data.message,
            icon: "error",
            timer: 700,
            showConfirmButton: false, 
          });
        }
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    
    const handleCancel = () => {
        setDelModalOpen(false)
    }

    const handleConfirmSucc = () => {
        setSuccModalOpen(false)
    }

    const handleToggleStatus = async (row, event) => {
      event.stopPropagation();
    
      try {
        const newStatus = row.status === "active" ? 0 : 1;

        const formData = new FormData();
        formData.append("status", newStatus);
        formData.append("_method", "PUT");
    
        const response = await api.post(`/companys/${row.id}`, formData);
    
        if (response.data.success) {
          const updatedData = companyData.map((company) =>
            company.no === row.no
              ? { ...company, status: newStatus === 1 ? "active" : "inactive" }
              : company
          );
    
          setCompanyData(updatedData);
          setFilteredData(
            updatedData.filter((item) =>
              [item.no, item.company_name, item.representative_name, item.company_type, item.country]
                .some((field) => field.toLowerCase().includes(searchQuery))
            )
          );
    
          await fetchCompanies();
        } else {
          Swal.fire({
            text: response.data.message,
            icon: "error",
            timer: 700,
            showConfirmButton: false,
          });
        }
      } catch (error) {
        console.error("Error toggling status:", error);
        Swal.fire({
          text: "An error occurred while updating status.",
          icon: "error",
          timer: 700,
          showConfirmButton: false,
        });
      }
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value.toLowerCase());
    };

    const displayedData = companyData.filter(
        (item) =>
          item.no.toLowerCase().includes(searchQuery) ||
          item.company_name.toLowerCase().includes(searchQuery) ||
          item.representative_name.toLowerCase().includes(searchQuery) ||
          item.company_type.toLowerCase().includes(searchQuery) ||
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
                <h1 className="text-2xl font-bold pb-5">Company</h1>
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
                    src={selectedRow.company_logo}
                    alt="Company Logo"
                    className="w-16 h-16 rounded-full object-cover border border-gray-200"
                    />
                    <div>
                    <h3 className="text-lg font-semibold">{selectedRow.company_name}</h3>
                    <p className="text-sm text-gray-600">{selectedRow.company_type}</p>
                    </div>
                </div>
                <p className="mt-4 text-sm text-gray-700">{selectedRow.about_us}</p>
                </div>

                {/* Contact Info */}
                <div>
                <h3 className="text-lg font-semibold border-b pb-2 mb-4">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                    <p className="text-sm font-medium text-gray-600">Representative Name:</p>
                    <p className="text-lg text-gray-800">{selectedRow.representative_name}</p>
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
                    <p className="text-lg text-gray-800">{selectedRow.company_type}</p>
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
                        {selectedRow.key_product_line.map((product, index) => (
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

      {isLoading && <Spinner />}



        </>
    )
}