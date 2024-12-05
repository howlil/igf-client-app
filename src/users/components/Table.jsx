import React from 'react';
import { X, Check } from 'lucide-react';

const ScheduleTable = () => {
  const data = [
    { id: '01', time: '13:00 - 14:00', company: 'Company A', productLine: 'Online/PC Games', country: 'Asia', platform: 'PC', status: 'Approved' },
    { id: '02', time: '14:30 - 15:00', company: 'Company B', productLine: 'Console Games', country: 'Middle East', platform: 'Console', status: 'Rejected' },
    { id: '03', time: '14:30 - 15:00', company: 'Company B', productLine: 'Console Games', country: 'Middle East', platform: 'Console', status: 'Rejected' },
    { id: '04', time: '13:00 - 14:00', company: 'Company A', productLine: 'Online/PC Games', country: 'Asia', platform: 'PC', status: 'Approved' },
    { id: '05', time: '14:30 - 15:00', company: 'Company B', productLine: 'Console Games', country: 'Middle East', platform: 'Console', status: 'Rejected' },
    { id: '06', time: '13:00 - 14:00', company: 'Company A', productLine: 'Online/PC Games', country: 'Asia', platform: 'PC', status: 'pending' },
    { id: '07', time: '13:00 - 14:00', company: 'Company A', productLine: 'Online/PC Games', country: 'Asia', platform: 'PC', status: 'pending' },
    { id: '08', time: '13:00 - 14:00', company: 'Company A', productLine: 'Online/PC Games', country: 'Asia', platform: 'PC', status: 'pending' },
    { id: '09', time: '13:00 - 14:00', company: 'Company A', productLine: 'Online/PC Games', country: 'Asia', platform: 'PC', status: 'pending' },
    { id: '10', time: '13:00 - 14:00', company: 'Company A', productLine: 'Online/PC Games', country: 'Asia', platform: 'PC', status: 'pending' },
  ];

  const renderStatus = (status) => {
    switch (status) {
      case 'Approved':
        return <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Approved</span>;
      case 'Rejected':
        return <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">Rejected</span>;
      case 'pending':
        return (
          <div className="flex gap-2">
            <button className="flex items-center gap-1 text-gray-700">
              <X size={16} /> Reject
            </button>
            <button className="flex items-center gap-1 text-gray-700">
              <Check size={16} /> Approve
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  const renderLogo = (company) => {
    return company === 'Company A' ? (
      <div className="bg-gray-800 rounded-full w-8 h-8 flex items-center justify-center">
        <span className="text-white text-sm">A</span>
      </div>
    ) : (
      <div className="bg-gradient-to-br from-purple-500 to-blue-500 rounded-full w-8 h-8 flex items-center justify-center">
        <span className="text-white text-sm">B</span>
      </div>
    );
  };

  return (
    <div className="rounded-lg border shadow-sm w-full overflow-hidden">
      <table className="w-full border-collapse">
        <thead className="bg-red">
          <tr>
            <th className="text-white text-left p-4">No</th>
            <th className="text-white text-left p-4">Time</th>
            <th className="text-white text-left p-4">Company</th>
            <th className="text-white text-left p-4">Key Product Line</th>
            <th className="text-white text-left p-4">Country</th>
            <th className="text-white text-left p-4">Platform</th>
            <th className="text-white text-left p-4">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {data.map((row) => (
            <tr key={row.id} className="border-t border-gray-200">
              <td className="p-4">{row.id}</td>
              <td className="p-4">{row.time}</td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  {renderLogo(row.company)}
                  <span>{row.company}</span>
                </div>
              </td>
              <td className="p-4">{row.productLine}</td>
              <td className="p-4">{row.country}</td>
              <td className="p-4">{row.platform}</td>
              <td className="p-4">{renderStatus(row.status)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleTable;