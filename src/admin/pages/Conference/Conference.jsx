import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar";
import DynamicTable from "../../components/Table";
import { useEffect, useState } from "react";
import Input from "../../components/input";
import { FaEdit, FaTrash } from "react-icons/fa";
import Alert from "../../components/Alert";
import AlertSuccess from "../../components/AlertSuccess";
import api from '../../../utils/api'
import Swal from "sweetalert2";
import InputEdit from "../../components/InputEdit";

export default function Conference() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username')
    if (!token && username !== 'admin') {
      navigate('/notAllowed');
    }
  }, [navigate]);

  const [isModalOpenAdd, setModalOpenAdd] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isDelModalOpen, setDelModalOpen] = useState(false)
  const [isSuccModalOpen, setSuccModalOpen] = useState(false)
  const [dataConf, setData] = useState([])
  const [formState, setFormState] = useState({
    name: "",
    description: "",
    venue: "",
    date_start: "",
    date_end: "",
    time_start: "",
    time_end: "",
    speaker: "",
    moderator: "",
    sum_table: "",
  });
  const [isLoading, setLoading] = useState()

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const columns = [
    { key: "no", label: "No " },
    { key: "name", label: "Conference Name" },
    { key: "description", label: "Conference Description" },
    { key: "venue", label: "Conference Venue" },
    { key: "date", label: "Conference Date" },
    { key: "time", label: "Conference Time" },
    { key: "speaker", label: "Speaker" },
    { key: "moderator", label: "Moderator" },
    { key: "sum_table", label: "Number of Tables" },
    { key: "actions", label: "Actions" },
  ];

  const fetchConferences = async () => {
    try {
      const response = await api.get("/conferences");
  
      const formattedData = response.data.data.map((item, index) => ({
        no: String(index + 1).padStart(2, "0"),
        name: item.name,
        description: item.description,
        venue: item.venue,
        date: `${item.date_start} - ${item.date_end}`,
        time: `${item.time_start} - ${item.time_end}`,
        speaker: item.speaker,
        moderator: item.moderator,
        sum_table: String(item.sum_table),
        id: item.id
      }));
  
      setData(formattedData);
    } catch (error) {
      console.error("Error fetching conferences:", error);
    }
  };

  useEffect(() => {
    fetchConferences();
  }, []);

  useEffect(() => {
    setFilteredData(dataConf); 
  }, [dataConf]);

  const columnStyles = [
    "text-center",
    "text-left",
    "text-left",
    "text-center",
    "text-center",
    "text-center",
  ];

  const handleRowClick = (row, index) => {
    navigate(`/dashboard-table?index=${index}`);
  };

  const handleEdit = (row, event) => {
    event.stopPropagation()
    setSelectedRow(row); 
    setEditModalOpen(true); 
  };

  const handleDelete = (row, event) => {
    event.stopPropagation()
    setSelectedRow(row); 
    setDelModalOpen(true)
  };

  console.log(selectedRow)

  const handleConfirm = async () => {
    try {
      setLoading(true)
      const response = await api.delete(`/conferences/${selectedRow.id}`)
      if (response.data.success) {
          setDelModalOpen(false)
          setSuccModalOpen(true)
          fetchConferences()
      } else {
        Swal.fire({
          text: response.data.message,
          icon: "error",
          timer: 1000,
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

  const handleSubmitAdd = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const formData = new FormData();
      formData.append("name", formState.name);
      formData.append("description", formState.description);
      formData.append("venue", formState.venue);
      formData.append("date_start", formState.date_start);
      formData.append("date_end", formState.date_end);
      formData.append("time_start", formState.time_start);
      formData.append("time_end", formState.time_end);
      formData.append("speaker", formState.speaker);
      formData.append("moderator", formState.moderator);
      formData.append("sum_table", String(formState.sum_table));
      
      const response = await api.post('/conferences', formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      if (response.data.success) {
        setModalOpenAdd(false)
        setSuccModalOpen(true)
        fetchConferences()

      } else {
        Swal.fire({
          text: response.data.message,
          icon: "error",
          timer: 1000,
          showConfirmButton: false, 
        });
      }
    } catch (error) {
      console.error(error)
    }finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (selectedRow) {
      // Pisahkan date dan time
      const [date_start, date_end] = selectedRow.date.split(" - ");
      const [time_start, time_end] = selectedRow.time.split(" - ");
  
      // Set data pada formData
      setFormState({
        name: selectedRow.name,
        description: selectedRow.description,
        venue: selectedRow.venue,
        date_start: date_start,
        date_end: date_end,
        time_start: time_start,
        time_end: time_end,
        speaker: selectedRow.speaker,
        moderator: selectedRow.moderator,
        sum_table: selectedRow.sum_table,
      });
    }
  }, [selectedRow]);

  const handleSubmitEdit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const formData = new FormData();
      formData.append("_method", "PUT");
      formData.append("name", formState.name);
      formData.append("description", formState.description);
      formData.append("venue", formState.venue);
      formData.append("date_start", formState.date_start);
      formData.append("date_end", formState.date_end);
      formData.append("time_start", formState.time_start);
      formData.append("time_end", formState.time_end);
      formData.append("speaker", formState.speaker);
      formData.append("moderator", formState.moderator);
      formData.append("sum_table", String(formState.sum_table));
      
      const response = await api.post(`/conferences/${selectedRow.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      if (response.data.success) {
        setEditModalOpen(false)
        setSuccModalOpen(true)
        fetchConferences()
      } else {
        Swal.fire({
          text: response.data.message,
          icon: "error",
          timer: 1000,
          showConfirmButton: false, 
        });
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }

  }

  const [searchQuery, setSearchQuery] = useState(""); 
  const [filteredData, setFilteredData] = useState(dataConf); 

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredData(
      dataConf.filter(
        (item) =>
          item.no.toLowerCase().includes(query) ||
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.venue.toLowerCase().includes(query) ||
          item.date.toLowerCase().includes(query) ||
          item.time.toLowerCase().includes(query) ||
          item.speaker.toLowerCase().includes(query) ||
          item.moderator.toLowerCase().includes(query) ||
          item.sum_table.toLowerCase().includes(query)
      )
    );
  };


  return (
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
            <button
              onClick={() => setModalOpenAdd(true)}
              className="w-fit md:w-1/8 bg-red text-white px-4 py-2 border border-red x rounded hover:bg-white hover:text-red hover:border-red"
              
            >
              Add Data
            </button>
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
            data={filteredData.map((row) => ({
              ...row,
              actions: (
                <div className="flex justify-center space-x-2">
                  {/* Edit Button */}
                  <button
                    onClick={(event) => handleEdit(row, event)}
                    className="p-2 rounded-full bg-yellow-500 hover:bg-yellow-600 text-white"
                    title="Edit"
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
                        d="M16.862 3.487a2.25 2.25 0 013.182 3.182l-9.216 9.216a4.5 4.5 0 01-1.592 1.042l-3.079 1.027 1.027-3.079a4.5 4.5 0 011.042-1.592l9.216-9.216z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 7.5L16.5 4.5M3.75 20.25h16.5"
                      />
                    </svg>
                  </button>

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

      {/* Modal */}
      {isModalOpenAdd && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 my-8">
            {/* Modal Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold">Add Data Conference</h2>
              <button
                className="text-red-500 hover:text-red-700 text-lg"
                onClick={() => setModalOpenAdd(false)} 
              >
                ×
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 overflow-y-auto max-h-[80vh]">
              <form onSubmit={handleSubmitAdd}>
                <div className="mb-4">
                  <Input
                    id={'name'}
                    type={'text'}
                    label={'Name'}
                    name={'name'}
                    placeholder={'Name of Conference'}
                    value={formState.name}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-4">
                  <Input
                    id={'description'}
                    type={'text'}
                    label={'Description'}
                    name={'description'}
                    placeholder={'Description of Conference'}
                    value={formState.description}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-4">
                  <Input
                    id={'venue'}
                    type={'text'}
                    label={'Venue'}
                    name={'venue'}
                    placeholder={'Venue of Conference'}
                    value={formState.venue}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-4">
                  <Input
                    id={'date_start'}
                    type={'date'}
                    label={'Date Start'}
                    name={'date_start'}
                    value={formState.date_start}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-4">
                  <Input
                    id={'date_end'}
                    type={'date'}
                    label={'Date End'}
                    name={'date_end'}
                    value={formState.date_end}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-4">
                  <Input
                    id={'time_start'}
                    type={'time'}
                    label={'Time Start'}
                    name={'time_start'}
                    value={formState.time_start}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="mb-4">
                  <Input
                    id={'time_end'}
                    type={'time'}
                    label={'Time End'}
                    name={'time_end'}
                    value={formState.time_end}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-4">
                  <Input
                    id={'speaker'}
                    type={'text'}
                    label={'Speaker'}
                    name={'speaker'}
                    placeholder={'Speaker of Conference'}
                    value={formState.speaker}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-4">
                  <Input
                    id={'moderator'}
                    type={'text'}
                    label={'Moderator'}
                    name={'moderator'}
                    placeholder={'Moderator of Conference'}
                    value={formState.moderator}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-4">
                  <Input
                    id={'sum_table'}
                    type={'number'}
                    label={'Number of Tables'}
                    name={'sum_table'}
                    placeholder={'Number of Tables'}
                    value={formState.sum_table}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600"
                  >
                    {isLoading ? 'Loading...' : 'Submit'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}


      {/* modal edit */}
      {isEditModalOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 my-8 md:max-w-lg overflow-hidden">
          {/* Modal Header */}
          <div className="sticky top-0 bg-white z-10 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-bold">Edit Data Conference</h2>
            <button
              className="text-red-500 hover:text-red-700 text-lg"
              onClick={() => setEditModalOpen(false)}
            >
              ×
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 space-y-4 overflow-y-auto max-h-[80vh]">
            <form onSubmit={handleSubmitEdit}>
                  <div className="mb-4">
                    <InputEdit
                      id={'name'}
                      type={'text'}
                      label={'Name'}
                      name={'name'}
                      placeholder={'Name of Conference'}
                      value={formState.name}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-4">
                    <InputEdit
                      id={'description'}
                      type={'text'}
                      label={'Description'}
                      name={'description'}
                      placeholder={'Description of Conference'}
                      value={formState.description}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-4">
                    <InputEdit
                      id={'venue'}
                      type={'text'}
                      label={'Venue'}
                      name={'venue'}
                      placeholder={'Venue of Conference'}
                      value={formState.venue}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-4">
                    <InputEdit
                      id={'date_start'}
                      type={'date'}
                      label={'Date Start'}
                      name={'date_start'}
                      value={formState.date_start}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-4">
                    <InputEdit
                      id={'date_end'}
                      type={'date'}
                      label={'Date End'}
                      name={'date_end'}
                      value={formState.date_end}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-4">
                    <InputEdit
                      id={'time_start'}
                      type={'time'}
                      label={'Time Start'}
                      name={'time_start'}
                      value={formState.time_start}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="mb-4">
                    <InputEdit
                      id={'time_end'}
                      type={'time'}
                      label={'Time End'}
                      name={'time_end'}
                      value={formState.time_end}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-4">
                    <InputEdit
                      id={'speaker'}
                      type={'text'}
                      label={'Speaker'}
                      name={'speaker'}
                      placeholder={'Speaker of Conference'}
                      value={formState.speaker}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-4">
                    <InputEdit
                      id={'moderator'}
                      type={'text'}
                      label={'Moderator'}
                      name={'moderator'}
                      placeholder={'Moderator of Conference'}
                      value={formState.moderator}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-4">
                    <InputEdit
                      id={'sum_table'}
                      type={'number'}
                      label={'Number of Tables'}
                      name={'sum_table'}
                      placeholder={'Number of Tables'}
                      value={formState.sum_table}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600"
                    >
                      {isLoading ? 'Loading...' : 'Submit'}
                    </button>
                  </div>
                </form>
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
  );
}
