import { FaChartLine, FaEye, FaClipboardCheck } from 'react-icons/fa';

const ReportingInsightsHub = () => {
    return (
        <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Reporting & Insights Hub</h2>
            <div className="space-y-4">
                <div className="flex items-start space-x-4">
                    <FaChartLine className="text-[#019529] text-2xl" />
                    <div>
                        <h3 className="text-lg font-semibold">Market Comparison Reports</h3>
                        <p className="text-gray-600">
                            Employers can view how their salary offers compare to industry averages, receiving regular updates as market data evolves.
                        </p>
                    </div>
                </div>
            
                <div className="flex items-start space-x-4">
                    <FaEye className="text-[#019529] text-2xl" />
                    <div>
                        <h3 className="text-lg font-semibold">Candidate Engagement Metrics</h3>
                        <p className="text-gray-600">
                            Employers track candidate views, application rates, and alignment with salary expectations to optimize job listings.
                        </p>
                    </div>
                </div>
                <div className="flex items-start space-x-4">
                    <FaClipboardCheck className="text-[#019529] text-2xl" />
                    <div>
                        <h3 className="text-lg font-semibold">Blockchain-Based Recordkeeping</h3>
                        <p className="text-gray-600">
                            Salary offers, insights, and transparency agreements are securely recorded for compliance audits and future reference.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportingInsightsHub;
