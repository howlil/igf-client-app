import React, { useEffect, useState } from "react";
import { XMarkIcon, CheckIcon } from "@heroicons/react/24/outline"; // Using Heroicons for close and approve icons
import DynamicTable from "../../components/Table";
import Navbar from "../../components/navbar";
import Alert from "../../components/Alert";
import AlertSuccess from "../../components/AlertSuccess";
import api from "../../../utils/api";
import Swal from "sweetalert2";
import Spinner from "../../components/Spinner";

export default function Approval() {

  const [isSuccModalOpen, setSuccModalOpen] = useState(false)
  const [isAlertOpenReject, setAlertOpenReject] = useState(false)
  const [isAlertOpenApprov, setAlertOpenApprov] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null)
  const [dataApprov, setData] = useState([])
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    fetchApprove();
  }, []);

  const columns = [
    { key: "no", label: "No" },
    { key: "table", label: "Table" },
    { key: "date", label: "Date" },
    { key: "time", label: "Time" },
    { key: "company", label: "Company" },
    {
      key: "actions",
      label: "Actions",
      render: (value, row) => (
        <div className="flex space-x-2 justify-center">
          {value === "Approved" && (
            <span className="px-2 py-1 text-sm rounded bg-blue-100 text-blue-600 font-bold">
              Approved
            </span>
          )}
          {value === "Rejected" && (
            <span className="px-3 py-1 text-sm rounded bg-red-100 text-red-600 font-bold">
              Rejected
            </span>
          )}
          {value === "Pending" && (
            <>
              <button
                className="px-2 py-1 flex items-center text-black hover:text-white hover:bg-red-500"
                title="Reject"
                onClick={(event) => handleReject(row, event)}
              >
                <XMarkIcon className="h-4 w-4" />
                <span className="ml-1 text-sm">Reject</span>
              </button>
              <button
                className="px-2 py-1 flex items-center text-black hover:text-white hover:bg-green-500"
                title="Approve"
                onClick={(event) => handleApprove(row, event)}
              >
                <CheckIcon className="h-4 w-4" />
                <span className="ml-1 text-sm">Approve</span>
              </button>
            </>
          )}
        </div>
      ),
    },
  ];

  const handleReject = (row, event) => {
    event.stopPropagation()
    setSelectedRow(row); 
    setAlertOpenReject(true)
  }

  const handleConfirmReject = async () => {
    try {
      setLoading(true)
      const formData = new FormData()
      formData.append('approved_admin', '0')
      const response = await api.post(`/matchmaking-approval/${selectedRow.id}`, formData)
      if (response.data.success) {
        setSuccModalOpen(true)
        fetchApprove()
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

  const handleCancelReject = () => {
    setAlertOpenReject(false)
  }

  const handleConfirmSucc = () => {
    setSuccModalOpen(false)
    setAlertOpenReject(false)
    setAlertOpenApprov(false)
  }

  const handleApprove = (row, event) => {
    event.stopPropagation()
    setSelectedRow(row)
    setAlertOpenApprov(true)
  }

  const handleConfirmApprove = async () => {
    try {
      setLoading(true)
      const formData = new FormData()
      formData.append('approved_admin', '1')
      const response = await api.post(`/matchmaking-approval/${selectedRow.id}`, formData)
      if (response.data.success) {
        setSuccModalOpen(true)
        fetchApprove()
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

  const handleCancelApprove = () => {
    setAlertOpenApprov(false)
  }

const fetchApprove = async () => {
  try {
    const response = await api.get("/matchmakings/approved-company")

    const formattedData = response.data.data.map((item, index) => ({
      id: item.id,
      no: String(index + 1).padStart(2, "0"),
      table: item.table.name_table,
      date: item.table.date,
      time: `${item.time_start} - ${item.time_end}`,
      company:`${item.company_book.company_name} - ${item.company_match.company_name}`,
      actions: item.approved_admin == null
        ? 'Pending'
        : item.approved_admin == 1
        ? 'Approved'
        : 'Rejected',
    }));

    setData(formattedData);

  } catch (error) {
    console.error(error)
  }
}

  const columnStyles = [
    "text-center",
    "text-left",
    "text-center",
    "text-center",
    "text-center",
    "text-center",
  ];

  const columnWidths = [
    "50px",
    "200px",
    "150px",
    "150px",
    "300px",
    "200px",
    "200px"
  ];

  const [searchQuery, setSearchQuery] = useState(""); 
  const [filteredData, setFilteredData] = useState(dataApprov); 

  useEffect(() => {
    setFilteredData(dataApprov);
  }, [dataApprov]);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredData(
      dataApprov.filter(
        (item) =>
          item.no.toLowerCase().includes(query) ||
          item.table.toLowerCase().includes(query) ||
          item.date.toLowerCase().includes(query) ||
          item.time.toLowerCase().includes(query) ||
          item.company.toLowerCase().includes(query)
      )
    );
  };

  return (
    <>
        <div className="bg-white h-screen">
      {/* Navbar */}
      <Navbar />

      <div className="p-8">
        <div className="flex justify-between items-center mb-4">
          {/* Title and description */}
          <div>
            <h1 className="text-2xl font-bold">Approval Table</h1>
            <p className="w-full md:w-1/2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
              quaerat laboriosam earum voluptatibus soluta amet autem aperiam,
              eum vero, est praesentium reprehenderit minima reiciendis
              mollitia! Non odit tempore maiores nesciunt?
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
          data={filteredData}
          positionTH={"text-center"}
          columnStyles={columnStyles}
          columnWidths={columnWidths}
        />
        

      </div>
      
      </div>

      {/* alert reject */}
      {isAlertOpenReject && (
        <Alert
        title="Reject Item"
        description="Are you sure you want to reject this item? This action cannot be undone."
        confirmLabel="Reject"
        cancelLabel="Go Back"
        onConfirm={handleConfirmReject}
        onCancel={handleCancelReject}
        />
      )}

      {/* alert approve */}
      {isAlertOpenApprov && (
        <Alert
        title="Approve Item"
        description="Are you sure you want to approve this item? This action cannot be undone."
        confirmLabel="Approve"
        cancelLabel="Go Back"
        onConfirm={handleConfirmApprove}
        onCancel={handleCancelApprove}
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

      {/* spinner */}
      {isLoading && <Spinner />}
    </>
  );
  
}
