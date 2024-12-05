import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar";
import DynamicTable from "../../components/Table";
import { useState } from "react";
import Input from "../../components/input";
import { FaEdit, FaTrash } from "react-icons/fa";
import Alert from "../../components/Alert";
import AlertSuccess from "../../components/AlertSuccess";

export default function Conference() {
  const navigate = useNavigate();

  const [isModalOpenAdd, setModalOpenAdd] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isDelModalOpen, setDelModalOpen] = useState(false)
  const [isSuccModalOpen, setSuccModalOpen] = useState(false)
  
  const columns = [
    { key: "no", label: "No " },
    { key: "nameConference", label: "Conference Name" },
    { key: "descriptionConference", label: "Conference Description" },
    { key: "venueConference", label: "Conference Venue" },
    { key: "dateConference", label: "Conference Date" },
    { key: "timeConference", label: "Conference Time" },
    { key: "speakerConference", label: "Speaker" },
    { key: "moderatorConference", label: "Moderator" },
    { key: "tableCount", label: "Number of Tables" },
    { key: "actions", label: "Actions" },
  ];

  const data = [
    {
      no: "01",
      nameConference: "Tech Innovations 2024",
      descriptionConference: "Exploring the latest advancements in technology.",
      venueConference: "Hall A",
      dateConference: "2024-07-27",
      timeConference: "10:00 - 12:00",
      speakerConference: "Dr. John Doe",
      moderatorConference: "Ms. Jane Smith",
      tableCount: "15",
    },
    {
      no: "02",
      nameConference: "Healthcare Summit",
      descriptionConference: "Discussing the future of global healthcare systems.",
      venueConference: "Hall B",
      dateConference: "2024-08-15",
      timeConference: "09:00 - 11:30",
      speakerConference: "Prof. Alice Johnson",
      moderatorConference: "Mr. David Clark",
      tableCount: "20",
    },
    {
      no: "03",
      nameConference: "AI and Society",
      descriptionConference: "The impact of artificial intelligence on society and ethics.",
      venueConference: "Auditorium",
      dateConference: "2024-09-10",
      timeConference: "14:00 - 16:00",
      speakerConference: "Dr. Emily Davis",
      moderatorConference: "Mr. Robert Brown",
      tableCount: "12",
    },
    {
      no: "04",
      nameConference: "Business Trends 2024",
      descriptionConference: "Analyzing key business trends for the upcoming year.",
      venueConference: "Room 101",
      dateConference: "2024-10-05",
      timeConference: "13:00 - 15:00",
      speakerConference: "Dr. Michael Lee",
      moderatorConference: "Ms. Sarah Wilson",
      tableCount: "18",
    },
    {
      no: "05",
      nameConference: "Green Energy Forum",
      descriptionConference: "Strategies and solutions for sustainable energy.",
      venueConference: "Hall A",
      dateConference: "2024-11-12",
      timeConference: "11:00 - 13:00",
      speakerConference: "Dr. Karen White",
      moderatorConference: "Mr. James Taylor",
      tableCount: "10",
    },
    {
      no: "06",
      nameConference: "Education Reimagined",
      descriptionConference: "Future innovations in education and learning technologies.",
      venueConference: "Hall B",
      dateConference: "2024-12-01",
      timeConference: "09:30 - 11:30",
      speakerConference: "Prof. Olivia Martin",
      moderatorConference: "Ms. Laura Adams",
      tableCount: "25",
    },
    {
      no: "07",
      nameConference: "Digital Marketing Strategies",
      descriptionConference: "Latest techniques and tools in digital marketing.",
      venueConference: "Room 102",
      dateConference: "2024-06-15",
      timeConference: "10:00 - 12:30",
      speakerConference: "Dr. Patrick Hill",
      moderatorConference: "Ms. Rachel Green",
      tableCount: "22",
    },
    {
      no: "08",
      nameConference: "Blockchain Revolution",
      descriptionConference: "The transformative impact of blockchain technology.",
      venueConference: "Auditorium",
      dateConference: "2024-07-20",
      timeConference: "15:00 - 17:00",
      speakerConference: "Mr. George Evans",
      moderatorConference: "Ms. Diana Moore",
      tableCount: "30",
    },
    {
      no: "09",
      nameConference: "Space Exploration",
      descriptionConference: "The next frontier in space science and technology.",
      venueConference: "Hall A",
      dateConference: "2024-08-02",
      timeConference: "13:00 - 15:30",
      speakerConference: "Dr. Steven Carter",
      moderatorConference: "Mr. Brian Harris",
      tableCount: "28",
    },
    {
      no: "10",
      nameConference: "Financial Leadership Summit",
      descriptionConference: "Key insights into financial leadership and strategies.",
      venueConference: "Room 103",
      dateConference: "2024-09-25",
      timeConference: "14:00 - 16:30",
      speakerConference: "Ms. Charlotte Baker",
      moderatorConference: "Mr. Henry Scott",
      tableCount: "16",
    },
    {
      no: "11",
      nameConference: "Cultural Diversity Forum",
      descriptionConference: "Celebrating and discussing cultural diversity worldwide.",
      venueConference: "Hall B",
      dateConference: "2024-10-10",
      timeConference: "09:00 - 11:00",
      speakerConference: "Dr. Emma Brooks",
      moderatorConference: "Ms. Clara Reed",
      tableCount: "12",
    },
    {
      no: "12",
      nameConference: "Cybersecurity Advances",
      descriptionConference: "Exploring the latest in cybersecurity technologies.",
      venueConference: "Auditorium",
      dateConference: "2024-11-08",
      timeConference: "11:30 - 13:30",
      speakerConference: "Mr. Alan Cooper",
      moderatorConference: "Ms. Grace Turner",
      tableCount: "20",
    },
    {
      no: "13",
      nameConference: "Global Climate Change",
      descriptionConference: "Addressing the challenges of global climate change.",
      venueConference: "Hall A",
      dateConference: "2024-12-15",
      timeConference: "15:00 - 17:30",
      speakerConference: "Dr. William King",
      moderatorConference: "Ms. Anna James",
      tableCount: "18",
    },
    {
      no: "14",
      nameConference: "Quantum Computing",
      descriptionConference: "The future of computing with quantum technologies.",
      venueConference: "Room 104",
      dateConference: "2024-01-20",
      timeConference: "10:00 - 12:00",
      speakerConference: "Dr. Peter Rogers",
      moderatorConference: "Ms. Emily Carter",
      tableCount: "22",
    },
    {
      no: "15",
      nameConference: "Entrepreneurship Summit",
      descriptionConference: "Strategies for successful startups and entrepreneurship.",
      venueConference: "Hall B",
      dateConference: "2024-02-18",
      timeConference: "13:00 - 15:00",
      speakerConference: "Ms. Megan Bailey",
      moderatorConference: "Mr. Jason Long",
      tableCount: "19",
    },
    {
      no: "16",
      nameConference: "Women in Leadership",
      descriptionConference: "Empowering women in leadership roles.",
      venueConference: "Room 105",
      dateConference: "2024-03-08",
      timeConference: "09:30 - 11:30",
      speakerConference: "Ms. Sophia Perez",
      moderatorConference: "Ms. Chloe Nelson",
      tableCount: "17",
    },
    {
      no: "17",
      nameConference: "Future of Mobility",
      descriptionConference: "Innovations in transportation and mobility.",
      venueConference: "Auditorium",
      dateConference: "2024-04-10",
      timeConference: "10:00 - 12:30",
      speakerConference: "Mr. Oliver Wood",
      moderatorConference: "Mr. Liam Mitchell",
      tableCount: "15",
    },
    {
      no: "18",
      nameConference: "Renewable Energy Forum",
      descriptionConference: "Discussions on renewable energy innovations.",
      venueConference: "Hall A",
      dateConference: "2024-05-22",
      timeConference: "14:00 - 16:00",
      speakerConference: "Dr. Jacob Young",
      moderatorConference: "Ms. Zoe Allen",
      tableCount: "14",
    },
    {
      no: "19",
      nameConference: "E-commerce Innovations",
      descriptionConference: "Trends and tools shaping the future of e-commerce.",
      venueConference: "Room 106",
      dateConference: "2024-06-14",
      timeConference: "11:00 - 13:00",
      speakerConference: "Ms. Amelia Green",
      moderatorConference: "Mr. Lucas Adams",
      tableCount: "12",
    },
    {
      no: "20",
      nameConference: "Digital Transformation",
      descriptionConference: "The evolution of digital technologies in business.",
      venueConference: "Hall B",
      dateConference: "2024-07-19",
      timeConference: "10:30 - 12:30",
      speakerConference: "Mr. Ethan Hill",
      moderatorConference: "Ms. Ava Carter",
      tableCount: "20",
    },
];

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

  const handleSubmitAdd = () => {
    setModalOpenAdd(false)
    setSuccModalOpen(true)
  }

  const handleSubmitEdit = () => {
    setEditModalOpen(false)
    setSuccModalOpen(true)
  }

  const [searchQuery, setSearchQuery] = useState(""); 
  const [filteredData, setFilteredData] = useState(data); 

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredData(
      data.filter(
        (item) =>
          item.no.toLowerCase().includes(query) ||
          item.nameConference.toLowerCase().includes(query) ||
          item.descriptionConference.toLowerCase().includes(query) ||
          item.venueConference.toLowerCase().includes(query) ||
          item.dateConference.toLowerCase().includes(query) ||
          item.speakerConference.toLowerCase().includes(query) ||
          item.moderatorConference.toLowerCase().includes(query) ||
          item.tableCount.toLowerCase().includes(query)
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
              <form>
                <div className="mb-4">
                  <Input
                    id={'conference_name'}
                    type={'text'}
                    label={'Name'}
                    name={'conference_name'}
                    placeholder={'Name of Conference'}
                  />
                </div>

                <div className="mb-4">
                  <Input
                    id={'conference_description'}
                    type={'text'}
                    label={'Description'}
                    name={'conference_description'}
                    placeholder={'Description of Conference'}
                  />
                </div>

                <div className="mb-4">
                  <Input
                    id={'conference_venue'}
                    type={'text'}
                    label={'Venue'}
                    name={'conference_venue'}
                    placeholder={'Venue of Conference'}
                  />
                </div>

                <div className="mb-4">
                  <Input
                    id={'conference_date'}
                    type={'date'}
                    label={'Date'}
                    name={'conference_date'}
                  />
                </div>

                <div className="mb-4">
                  <Input
                    id={'conference_time'}
                    type={'time'}
                    label={'Time'}
                    name={'conference_time'}
                  />
                </div>

                <div className="mb-4">
                  <Input
                    id={'conference_speaker'}
                    type={'text'}
                    label={'Speaker'}
                    name={'conference_speaker'}
                    placeholder={'Speaker of Conference'}
                  />
                </div>

                <div className="mb-4">
                  <Input
                    id={'conference_moderator'}
                    type={'text'}
                    label={'Moderator'}
                    name={'conference_moderator'}
                    placeholder={'Moderator of Conference'}
                  />
                </div>

                <div className="mb-4">
                  <Input
                    id={'conference_table'}
                    type={'number'}
                    label={'Number of Tables'}
                    name={'conference_table'}
                    placeholder={'Number of Tables'}
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                  <button
                    type="button"
                    className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600"
                    onClick={handleSubmitAdd}
                  >
                    Submit
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
            <form>
              <div className="mb-4">
                <Input
                  id="conference_name"
                  type="text"
                  label="Name"
                  name="conference_name"
                  placeholder="Name of Conference"
                />
              </div>

              <div className="mb-4">
                <Input
                  id="conference_description"
                  type="text"
                  label="Description"
                  name="conference_description"
                  placeholder="Description of Conference"
                />
              </div>

              <div className="mb-4">
                <Input
                  id="conference_venue"
                  type="text"
                  label="Venue"
                  name="conference_venue"
                  placeholder="Venue of Conference"
                />
              </div>

              <div className="mb-4">
                <Input id="conference_date" type="date" label="Date" name="conference_date" />
              </div>

              <div className="mb-4">
                <Input id="conference_time" type="time" label="Time" name="conference_time" />
              </div>

              <div className="mb-4">
                <Input
                  id="conference_speaker"
                  type="text"
                  label="Speaker"
                  name="conference_speaker"
                  placeholder="Speaker of Conference"
                />
              </div>

              <div className="mb-4">
                <Input
                  id="conference_moderator"
                  type="text"
                  label="Moderator"
                  name="conference_moderator"
                  placeholder="Moderator of Conference"
                />
              </div>

              <div className="mb-4">
                <Input
                  id="conference_table"
                  type="number"
                  label="Number of Tables"
                  name="conference_table"
                  placeholder="Number of Tables"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <button
                  type="button"
                  className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600"
                  onClick={handleSubmitEdit}
                >
                  Submit
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
