import React from 'react';

const TableCell = ({ children, className }) => (
    <td className={`px-4 py-3 text-xs ${className} whitespace-nowrap border-b border-r border-gray-300`}>
        {children}
    </td>
);

const TableRow = ({ row, index, getLogo, getStatusColor }) => (
    <tr className={`${index % 2 === 1 ? 'bg-red-50' : 'bg-white'} hover:bg-gray-50`}>
        <TableCell className="font-medium text-gray-900">{row.id}</TableCell>
        <TableCell className="text-gray-800">{row.time}</TableCell>
        <TableCell className="text-gray-800">
            <div className="flex items-center gap-2">
                {getLogo(row.company)}
                <span>{row.company}</span>
            </div>
        </TableCell>
        <TableCell className="text-gray-800">{row.productLine}</TableCell>
        <TableCell className="text-gray-800">{row.country}</TableCell>
        <TableCell className="text-gray-800">{row.platform}</TableCell>
        <TableCell>
            <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(row.status)}`}>
                {row.status}
            </span>
        </TableCell>
    </tr>
);

const TableHeader = ({ columns }) => (
    <thead className="bg-red-500">
        <tr>
            {columns.map((column, index) => (
                <th
                    key={index}
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-white whitespace-nowrap border-b border-r border-gray-300"
                >
                    {column}
                </th>
            ))}
        </tr>
    </thead>
);

export default function NotApprovalUser() {
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

    const columns = [
        'No', 'Time', 'Company', 'Key Product Line', 'Country', 'Platform', 'Actions'
    ];

    return (
        <div className="w-full overflow-x-auto rounded-lg border border-gray-300">
            <table className="w-full border-collapse table-auto">
                <TableHeader columns={columns} />
                <tbody>
                    {data.map((row, index) => (
                        <TableRow 
                            key={row.id} 
                            row={row} 
                            index={index} 
                            getLogo={getLogo} 
                            getStatusColor={getStatusColor} 
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}