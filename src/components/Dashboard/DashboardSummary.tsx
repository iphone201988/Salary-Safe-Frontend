import React from "react";

const DashboardSummary: React.FC = () => {
  const [selectedAnalytics, setSelectedAnalytics] = React.useState({
    salaryAlignment: false,
    jobPerformance: false,
    interviewScheduling: false,
  });

  const toggleAnalytics = (event: any) => {
    const { name, checked } = event.target;
    setSelectedAnalytics((prev: any) => ({
      ...prev,
      [name]: checked,
    }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <main className="flex-1 max-w-7xl mr-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <aside className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold mb-4">Select Analytics</h2>
            <form>
              <div className="mb-4">
                <label className="block mb-2">
                  <input
                    type="checkbox"
                    name="salaryAlignment"
                    checked={selectedAnalytics.salaryAlignment}
                    onChange={toggleAnalytics}
                    className="mr-2"
                  />
                  Candidate Salary Alignment
                </label>
              </div>
              <div className="mb-4">
                <label className="block mb-2">
                  <input
                    type="checkbox"
                    name="jobPerformance"
                    checked={selectedAnalytics.jobPerformance}
                    onChange={toggleAnalytics}
                    className="mr-2"
                  />
                  Job Listing Performance
                </label>
              </div>
              <div className="mb-4">
                <label className="block mb-2">
                  <input
                    type="checkbox"
                    name="interviewScheduling"
                    checked={selectedAnalytics.interviewScheduling}
                    onChange={toggleAnalytics}
                    className="mr-2"
                  />
                  Interview Scheduling
                </label>
              </div>
              <button
                type="button"
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
                // onClick={}
              >
                Update Dashboard
              </button>
            </form>
          </aside>
          <section className="md:col-span-2">
            <div className="grid grid-cols-1 gap-6">
              {selectedAnalytics.salaryAlignment && (
                <div className="bg-white rounded-lg shadow p-4">
                  <h3 className="text-xl font-semibold mb-4">
                    Candidate Salary Alignment
                  </h3>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Average Salary:</span>
                    <span className="font-bold">$70,000</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Top Salary:</span>
                    <span className="font-bold">$120,000</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Lowest Salary:</span>
                    <span className="font-bold">$40,000</span>
                  </div>
                </div>
              )}
              {selectedAnalytics.jobPerformance && (
                <div className="bg-white rounded-lg shadow p-4">
                  <h3 className="text-xl font-semibold mb-4">
                    Job Listing Performance
                  </h3>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Total Listings:</span>
                    <span className="font-bold">50</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">
                      Applications Received:
                    </span>
                    <span className="font-bold">120</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Interviews Scheduled:</span>
                    <span className="font-bold">30</span>
                  </div>
                </div>
              )}
              {selectedAnalytics.interviewScheduling && (
                <div className="bg-white rounded-lg shadow p-4">
                  <h3 className="text-xl font-semibold mb-4">
                    Interview Scheduling
                  </h3>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Upcoming Interviews:</span>
                    <span className="font-bold">15</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Interviews Completed:</span>
                    <span className="font-bold">25</span>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default DashboardSummary;
