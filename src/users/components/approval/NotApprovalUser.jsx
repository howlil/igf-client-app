import React, { useState, useEffect } from 'react';
import api from "../../../utils/api"

const TableCell = ({ children, className }) => (
    <td className={`px-4 py-3 text-xs ${className} whitespace-nowrap border-b border-r border-gray-300`}>
        {children}
    </td>
);

const TableRow = ({ row, index, getLogo, getStatusColor }) => {
    const getApprovalStatus = (approvedCompany, approvedAdmin) => {
        if (approvedCompany === 1) return 'Approved';
        if (approvedCompany === 0) return 'Rejected';
        return 'Waiting for approval';
    };

    return (
        <tr className={`${index % 2 === 1 ? 'bg-red-50' : 'bg-white'} hover:bg-gray-50`}>
            <TableCell className="font-medium text-gray-900">{row.id}</TableCell>
            <TableCell className="text-gray-800">
                {row.time_start} - {row.time_end}
            </TableCell>
            <TableCell className="text-gray-800">
                <div className="flex items-center gap-2">
                    {getLogo(row.company_match.company_name)}
                    <span>{row.company_match.company_name}</span>
                </div>
            </TableCell>
            <TableCell className="text-gray-800">{row.table.name_table}</TableCell>
            <TableCell className="text-gray-800">{row.table.date}</TableCell>
            <TableCell className="text-gray-800">-</TableCell>
            <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(getApprovalStatus(row.approved_company, row.approved_admin))}`}>
                    {getApprovalStatus(row.approved_company, row.approved_admin)}
                </span>
            </TableCell>
        </tr>
    );
};

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
    const [matchmakings, setMatchmakings] = useState([]);

    async function getData() {
        try {
            const res = await api.get("/matchmakings/bycompany-match");
            setMatchmakings(res.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getData();
    }, []);

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

    const getLogo = (companyName) => {
        const initial = companyName.charAt(0).toUpperCase();
        const isCompanyA = companyName.includes('Company A');
        
        return isCompanyA ? (
            <div className="bg-gray-800 rounded-full w-8 h-8 flex items-center justify-center">
                <span className="text-white text-sm">{initial}</span>
            </div>
        ) : (
            <div className="bg-gradient-to-br from-purple-500 to-blue-500 rounded-full w-8 h-8 flex items-center justify-center">
                <span className="text-white text-sm">{initial}</span>
            </div>
        );
    };

    const columns = [
        'No', 'Time', 'Company', 'Table', 'Date', 'Platform', 'Status'
    ];

    return (
        <div className="w-full overflow-x-auto rounded-lg border border-gray-300">
            <table className="w-full border-collapse table-auto">
                <TableHeader columns={columns} />
                <tbody>
                    {matchmakings.map((row, index) => (
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