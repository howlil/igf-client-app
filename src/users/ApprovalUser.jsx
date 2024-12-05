import { useState, useEffect } from 'react';
import NotApprovalUser from "./components/pages/NotApprovalUser";
import ApprovalUserList from "./components/pages/ApprovalUserList";
import Layout from "./components/Layout";

export default function ApprovalUser() {
    const [activeTab, setActiveTab] = useState('approval');

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const approvalParam = params.get('approval');
        setActiveTab(approvalParam === 'true' ? 'approval' : 'request');
    }, []);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        const newUrl = `${window.location.pathname}?approval=${tab === 'approval'}`;
        window.history.pushState({}, '', newUrl);
    };

    return (
        <Layout>
            <section>
                <h1 className="text-2xl font-semibold text-center mb-3">Approval</h1>
                <p className="text-center text-gray-400">Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took <br /> a galley of type and scrambled it to make</p>

                <div className="mt-12 shadow-sm items-center rounded-md text-center grid grid-cols-2 w-full bg-gray-100">
                    <div 
                        className={`py-3 cursor-pointer ${activeTab === 'approval' ? 'bg-white text-red shadow-sm rounded-r-full' : ''}`}
                        onClick={() => handleTabChange('approval')}
                    >
                        Approval
                    </div>
                    <div 
                        className={`py-3 cursor-pointer ${activeTab === 'request' ? 'bg-white text-red shadow-sm rounded-l-full' : ''}`}
                        onClick={() => handleTabChange('request')}
                    >
                        Your Request
                    </div>
                </div>
                <div className="mt-12">
                    {activeTab === 'approval' ? <ApprovalUserList /> : <NotApprovalUser />}
                </div>
            </section>
        </Layout>
    );
}