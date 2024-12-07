import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import AlertDialog from '../AlertDialog';
import api from "../../../utils/api"

const TableCell = ({ children, className }) => (
    <td className={`px-4 py-3 text-xs ${className} whitespace-nowrap border-b border-r border-gray-300`}>
        {children}
    </td>
);

export default function ApprovalUserList() {
    const [selectedAction, setSelectedAction] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
    const [matchmakings, setMatchmakings] = useState([]);

    async function getData() {
        try {
            const res = await api.get("/matchmakings/bycompany-book");
            console.log(res.data.data)
            setMatchmakings(res.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    const handleAction = (action, row) => {
        console.log(row.company_id_match)
        setSelectedAction(action);
        setSelectedRow(row);
    };

    const handleConfirm = async () => {
        try {
            const formData = new FormData();
            formData.append('approved_company', selectedAction === 'approve' ? 1 : 0);

            await api.post(`/matchmaking-approval/${selectedRow.id}`, formData);
            
            getData();
            
            // Reset states
            setSelectedAction(null);
            setSelectedRow(null);
        } catch (error) {
            console.error('Error updating status:', error);
            // You might want to show an error message to the user here
        }
    };

    const getApprovalStatus = (approvedCompany) => {
        if (approvedCompany === 1) return 'Approved';
        if (approvedCompany === 0) return 'Rejected';
        return 'pending';
    };

    const renderStatus = (row) => {
        const status = getApprovalStatus(row.approved_company);
        
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
        const initial = company.charAt(0).toUpperCase();
        return (
            <div className="bg-gradient-to-br from-purple-500 to-blue-500 rounded-full w-8 h-8 flex items-center justify-center">
                <span className="text-white text-sm">{initial}</span>
            </div>
        );
    };

    return (
        <div className="w-full overflow-x-auto rounded-lg border border-gray-300">
            <table className="w-full border-collapse table-auto">
                <thead className="bg-red-500">
                    <tr>
                        {['No', 'Time', 'Company', 'Table', 'Date', 'Status'].map((header, index) => (
                            <th key={index} className="px-4 py-3 text-left text-xs font-medium text-white whitespace-nowrap border-b border-r border-gray-300">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {matchmakings.map((row, index) => (
                        <tr key={row.id} className={`${index % 2 === 1 ? 'bg-red-50' : 'bg-white'} hover:bg-gray-50`}>
                            <TableCell className="font-medium text-gray-900">{index +1}</TableCell>
                            <TableCell className="text-gray-800">
                                {row.time_start} - {row.time_end}
                            </TableCell>
                            <TableCell className="text-gray-800">
                                <div className="flex items-center gap-2">
                                    {renderLogo(row.company_match.company_name)}
                                    <span>{row.company_match.company_name}</span>
                                </div>
                            </TableCell>
                            <TableCell className="text-gray-800">{row.table.name_table}</TableCell>
                            <TableCell className="text-gray-800">{row.table.date}</TableCell>
                            <TableCell className="text-gray-800">{renderStatus(row)}</TableCell>
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