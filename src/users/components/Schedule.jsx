import React from 'react';
import { Calendar, Clock } from 'lucide-react';

const CompanyLogo = ({ size = 'md' }) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12'
  };
  
  return (
    <div className={`${sizes[size]} bg-gradient-to-br from-slate-800 to-slate-900 rounded-full flex items-center justify-center shadow-lg`}>
      <div className="w-6 h-6 text-white">⚓</div>
    </div>
  );
};

const Tag = ({ children, variant = 'default' }) => {
  const variants = {
    default: 'bg-gradient-to-r from-pink-100 to-pink-200 text-pink-700 border border-pink-200',
    pc: 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 border border-gray-200',
    mobile: 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 border border-blue-200',
    console: 'bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700 border border-purple-200',
    shooting: 'bg-gradient-to-r from-indigo-100 to-indigo-200 text-indigo-700 border border-indigo-200'
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${variants[variant]} shadow-sm transition-all hover:shadow-md mr-2`}>
      {children}
    </span>
  );
};

const BookButton = ({ status }) => {
  const variants = {
    book: 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-red-200 hover:from-red-700 hover:to-red-800',
    upcoming: 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 shadow-blue-100',
    waiting: 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600 shadow-gray-100',
    'book-meeting': 'border-2 border-red-600 text-red-600 hover:bg-red-50'
  };

  return (
    <button className={`px-6 py-2 rounded-full font-medium transition-all duration-200 shadow-lg hover:shadow-xl ${variants[status]}`}>
      {status === 'book-meeting' ? 'Book Meeting' : 
       status === 'upcoming' ? 'Upcoming' :
       status === 'waiting' ? 'Waiting for approval' : 'Book'}
    </button>
  );
};

const TimeSlot = ({ time, children }) => (
  <div className="flex border-b border-gray-100 py-6 group transition-colors hover:bg-gray-50">
    <div className="w-40 text-gray-600 flex items-center gap-2 pl-4">
      <Clock className="w-4 h-4" />
      <span>{time}</span>
    </div>
    <div className="flex-1 px-4">{children}</div>
  </div>
);

const ScheduleItem = ({ company, tags, category, type, status }) => (
  <div className="flex items-center justify-between p-4 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200">
    <div className="flex items-center gap-6">
      <CompanyLogo />
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="font-bold text-lg text-gray-900">{company}</span>
          {tags?.includes('Associations/Organizations') && 
            <span className="text-gray-500 italic">Associations/Organizations</span>}
        </div>
        <div className="flex items-center">
          <Tag>{category}</Tag>
          <Tag variant={type.toLowerCase()}>{type}</Tag>
          {tags?.includes('Shooting') && <Tag variant="shooting">Shooting</Tag>}
        </div>
      </div>
    </div>
    <div className="flex items-center gap-8">
      {tags?.includes('Asia') && (
        <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium">Country</span>
            <span className="text-gray-500">: Asia</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">Biz Matching</span>
            <span className="text-gray-500">: Publisher</span>
          </div>
        </div>
      )}
      <BookButton status={status} />
    </div>
  </div>
);

const Section = ({ title, children }) => (
  <div>
    <div className="flex items-center gap-2 mb-6">
      <h2 className="text-xl font-bold text-gray-900">{title}</h2>
      <div className="flex-1 h-px bg-gradient-to-r from-gray-200 to-transparent ml-4" />
    </div>
    {children}
  </div>
);

const DashboardSchedule = () => (
  <div className="max-w-7xl mx-auto p-8 bg-gray-50 min-h-screen">
    <div className="flex items-center justify-between mb-12">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard Schedule</h1>
      <div className="flex items-center gap-2 text-gray-600">
        <Calendar className="w-5 h-5" />
        <span>Saturday, 07 December 2024</span>
      </div>
    </div>
    
    <div className="flex gap-12">
      <div className="w-1/2">
        <Section title="SUGGESTIONS MATCHMAKING">
          <div className="space-y-4">
            {['Online/PC Games', 'Mobile Games', 'Console Games', 'E-Sports'].map((category, i) => (
              <ScheduleItem 
                key={i}
                company="Company A"
                category={category}
                type={category.includes('Games') ? category.split(' ')[1].replace('Games', '') : 'Mobile'}
                status="book"
              />
            ))}
          </div>
        </Section>
      </div>
      
      <div className="w-1/2">
        <Section title="CALENDAR">
          <div className="border border-gray-200 rounded-xl bg-white overflow-hidden">
            {[
              { time: '08:00 - 08:30', content: <ScheduleItem 
                  company="Company A" 
                  category="Online/PC Games" 
                  type="PC"
                  tags={['Associations/Organizations', 'Asia', 'Shooting']}
                  status="waiting"
                /> },
              { time: '08:30 - 09:00', content: <div className="flex justify-end"><BookButton status="book-meeting" /></div> },
              { time: '09:00 - 09:30', content: <div className="text-gray-600 font-medium">Not Available</div> },
              { time: '12:00 - 12:30', content: 
                <div className="bg-gradient-to-r from-gray-100 to-gray-50 p-4 rounded-lg text-center">
                  <span className="font-medium text-gray-700">Lunch Break</span>
                </div> 
              }
            ].map((slot, i) => (
              <TimeSlot key={i} time={slot.time}>{slot.content}</TimeSlot>
            ))}
          </div>
        </Section>
      </div>
    </div>
  </div>
);

export default DashboardSchedule;