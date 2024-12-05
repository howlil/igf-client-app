import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar";
import DynamicTable from "../../components/Table";

export default function Conference(){
    const navigate = useNavigate()
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
      
    return(
        <>
        <div className="bg-white h-screen">
            {/* Navbar */}
            <Navbar/>
            <div className="p-8">
                <h1 className="text-2xl font-bold mb-4">Conference</h1>
                <p className="w-full md:w-1/2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti quaerat laboriosam earum voluptatibus soluta amet autem aperiam, eum vero, est praesentium reprehenderit minima reiciendis mollitia! Non odit tempore maiores nesciunt?</p>
                <DynamicTable columns={columns} data={data} positionTH={'text-center'} columnStyles={columnStyles} onRowClick={handleRowClick}/>
            </div>
        </div>
        </>
    )
}