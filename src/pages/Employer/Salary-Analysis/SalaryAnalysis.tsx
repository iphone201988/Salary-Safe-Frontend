
import { FaChartPie, FaBalanceScale, FaUsers } from 'react-icons/fa';

const SalaryAnalysis = () => {
    return (
        <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Salary Analysis & Recommendations</h2>
            <div className="space-y-4">
                <div className="flex items-start space-x-4">
                    <FaChartPie className="text-[#019529] text-2xl" />
                    <div>
                        <h3 className="text-lg font-semibold">Internal Data Analysis</h3>
                        <p className="text-gray-600">
                            Employers obtain a comprehensive breakdown of their salary structures (median, average) in relation to market data.
                        </p>
                    </div>
                </div>
                
                <div className="flex items-start space-x-4">
                    <FaBalanceScale className="text-[#019529] text-2xl" />
                    <div>
                        <h3 className="text-lg font-semibold">Equity Recommendations</h3>
                        <p className="text-gray-600">
                            Data-driven insights recommend adjustments to enhance pay equity and competitiveness in job offers.
                        </p>
                    </div>
                </div>
                <div className="flex items-start space-x-4">
                    <FaUsers className="text-[#019529] text-2xl" />
                    <div>
                        <h3 className="text-lg font-semibold">Diversity and Equity Analytics</h3>
                        <p className="text-gray-600">
                            Insights on pay equity and diversity assist employers in promoting fair salary practices.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SalaryAnalysis;
