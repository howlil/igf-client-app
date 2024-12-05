import React from 'react';

const TableApproval = () => {
  const data = [
    { id: '01', time: '13:00 - 14:00', company: 'Company A', logo: 'A', productLine: 'Online/PC Games', country: 'Asia', platform: 'PC', status: 'Approved' },
    { id: '02', time: '14:30 - 15:00', company: 'Company B', logo: 'B', productLine: 'Console Games', country: 'Middle East', platform: 'Console', status: 'Waiting for approval' },
    { id: '03', time: '14:30 - 15:00', company: 'Company B', logo: 'B', productLine: 'Console Games', country: 'Middle East', platform: 'Console', status: 'Rejected' },
    { id: '04', time: '13:00 - 14:00', company: 'Company A', logo: 'A', productLine: 'Online/PC Games', country: 'Asia', platform: 'PC', status: 'Approved' },
    { id: '05', time: '14:30 - 15:00', company: 'Company B', logo: 'B', productLine: 'Console Games', country: 'Middle East', platform: 'Console', status: 'Rejected' },
    { id: '06', time: '14:30 - 15:00', company: 'Company B', logo: 'B', productLine: 'Console Games', country: 'Middle East', platform: 'Console', status: 'Waiting for approval' },
    { id: '07', time: '14:30 - 15:00', company: 'Company B', logo: 'B', productLine: 'Console Games', country: 'Middle East', platform: 'Console', status: 'Waiting for approval' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved':
        return 'bg-blue-100 text-blue-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getLogo = (company) => {
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
            <th className="text-white text-left p-4 font-medium">No</th>
            <th className="text-white text-left p-4 font-medium">Time</th>
            <th className="text-white text-left p-4 font-medium">Company</th>
            <th className="text-white text-left p-4 font-medium">Key Product Line</th>
            <th className="text-white text-left p-4 font-medium">Country</th>
            <th className="text-white text-left p-4 font-medium">Platform</th>
            <th className="text-white text-left p-4 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} className="border-t border-gray-200">
              <td className="p-4 font-medium">{row.id}</td>
              <td className="p-4">{row.time}</td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  {getLogo(row.company)}
                  <span>{row.company}</span>
                </div>
              </td>
              <td className="p-4">{row.productLine}</td>
              <td className="p-4">{row.country}</td>
              <td className="p-4">{row.platform}</td>
              <td className="p-4">
                <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(row.status)}`}>
                  {row.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableApproval;