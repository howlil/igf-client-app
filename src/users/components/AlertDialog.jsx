import {  AlertTriangle, CheckCircle } from 'lucide-react';

const AlertDialog = ({ isOpen, onClose, title, description, onConfirm, type = "warning" }) => {
    if (!isOpen) return null;

    const IconComponent = type === "warning" ? AlertTriangle : CheckCircle;
    const colorClass = type === "warning" ? "red" : "green";

    return (
        <div className="fixed inset-0  z-50 overflow-y-auto">
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl w-full sm:max-w-lg">
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className={`mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-${colorClass}-100 sm:mx-0 sm:h-10 sm:w-10`}>
                                <IconComponent className={`h-6 w-6 text-${colorClass}-600`} />
                            </div>
                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                <h3 className="text-base font-semibold text-gray-900">
                                    {title}
                                </h3>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">{description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <button
                            type="button"
                            onClick={() => {
                                onConfirm();
                                onClose();
                            }}
                            className={`inline-flex w-full justify-center rounded-md bg-${colorClass}-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-${colorClass}-500 sm:ml-3 sm:w-auto`}
                        >
                            Confirm
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AlertDialog