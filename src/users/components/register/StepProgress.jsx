const StepProgress = ({ currentStep }) => {
  const steps = ['Account', 'Company', 'Classification', 'Schedule'];
  
  return (
    <div className="flex flex-wrap md:flex-nowrap gap-2 bg-gray-100 p-2 rounded-lg mb-6">
      {steps.map((step, index) => (
        <button
          key={index}
          className={`flex items-center justify-center min-w-[calc(50%-0.25rem)] md:min-w-0 md:flex-1 px-3 py-2 rounded-lg transition-colors ${
            index + 1 === currentStep
              ? 'bg-red-600 text-white'
              : 'text-gray-600 hover:bg-gray-200'
          }`}
        >
          <span className="md:hidden font-medium">{index + 1}</span>
          <span className="hidden md:inline text-sm">{`${index + 1}. ${step}`}</span>
          <span className="text-xs md:hidden">{`. ${step}`}</span>
        </button>
      ))}
    </div>
  );
};

export default StepProgress;