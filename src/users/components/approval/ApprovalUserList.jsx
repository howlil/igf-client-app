import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import AlertDialog from '../AlertDialog';

const TableCell = ({ children, className }) => (
    <td className={`px-4 py-3 text-xs ${className} whitespace-nowrap border-b border-r border-gray-300`}>
        {children}
    </td>
);



export default function ApprovalUserList() {
    const [selectedAction, setSelectedAction] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);

    const data = [
        { id: '01', time: '13:00 - 14:00', company: 'Company A', productLine: 'Online/PC Games', country: 'Asia', platform: 'PC', status: 'Approved' },
        { id: '02', time: '14:30 - 15:00', company: 'Company B', productLine: 'Console Games', country: 'Middle East', platform: 'Console', status: 'Rejected' },
        { id: '03', time: '14:30 - 15:00', company: 'Company B', productLine: 'Console Games', country: 'Middle East', platform: 'Console', status: 'Rejected' },
        { id: '04', time: '13:00 - 14:00', company: 'Company A', productLine: 'Online/PC Games', country: 'Asia', platform: 'PC', status: 'pending' },
        { id: '05', time: '14:30 - 15:00', company: 'Company B', productLine: 'Console Games', country: 'Middle East', platform: 'Console', status: 'pending' },
    ];

    const handleAction = (action, row) => {
        setSelectedAction(action);
        setSelectedRow(row);
    };

    const handleConfirm = () => {
        console.log(`Confirmed ${selectedAction} for row:`, selectedRow);
        // Handle the action here
        setSelectedAction(null);
        setSelectedRow(null);
    };

    const renderStatus = (status, row) => {
        switch (status) {
            case 'Approved':
                return <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Approved</span>;
            case 'Rejected':
                return <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">Rejected</span>;
            case 'pending':
                return (
                    <div className="flex gap-2">
                        <button 
                            onClick={() => handleAction('reject', row)}
                            className="flex items-center gap-1 text-gray-700 hover:text-red-600 transition-colors"
                        >
                            <X className="w-4 h-4" /> Reject
                        </button>
                        <button 
                            onClick={() => handleAction('approve', row)}
                            className="flex items-center gap-1 text-gray-700 hover:text-green-600 transition-colors"
                        >
                            <Check className="w-4 h-4" /> Approve
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
        <div className="w-full overflow-x-auto rounded-lg border border-gray-300">
            <table className="w-full border-collapse table-auto">
                <thead className="bg-red-500">
                    <tr>
                        {['No', 'Time', 'Company', 'Key Product Line', 'Country', 'Platform', 'Actions'].map((header, index) => (
                            <th key={index} className="px-4 py-3 text-left text-xs font-medium text-white whitespace-nowrap border-b border-r border-gray-300">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={row.id} className={`${index % 2 === 1 ? 'bg-red-50' : 'bg-white'} hover:bg-gray-50`}>
                            <TableCell className="font-medium text-gray-900">{row.id}</TableCell>
                            <TableCell className="text-gray-800">{row.time}</TableCell>
                            <TableCell className="text-gray-800">
                                <div className="flex items-center gap-2">
                                    {renderLogo(row.company)}
                                    <span>{row.company}</span>
                                </div>
                            </TableCell>
                            <TableCell className="text-gray-800">{row.productLine}</TableCell>
                            <TableCell className="text-gray-800">{row.country}</TableCell>
                            <TableCell className="text-gray-800">{row.platform}</TableCell>
                            <TableCell className="text-gray-800">{renderStatus(row.status, row)}</TableCell>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedAction === 'reject' && (
                <AlertDialog
                    isOpen={true}
                    onClose={() => setSelectedAction(null)}
                    title="Confirm Rejection"
                    description="Are you sure you want to reject this application? This action cannot be undone."
                    onConfirm={handleConfirm}
                    type="warning"
                />
            )}

            {selectedAction === 'approve' && (
                <AlertDialog
                    isOpen={true}
                    onClose={() => setSelectedAction(null)}
                    title="Confirm Approval"
                    description="Are you sure you want to approve this application?"
                    onConfirm={handleConfirm}
                    type="success"
                />
            )}
        </div>
    );
}