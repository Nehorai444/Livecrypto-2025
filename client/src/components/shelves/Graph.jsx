import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useTranslation } from 'react-i18next';

const Graph = (props) => {
    const { data, setFlag } = props;
    const { t } = useTranslation();

    // Assuming data is an array of objects with eventTimestamp and currentPrice properties
    const formattedData = data.map((entry) => ({
        time: new Date(entry.eventTimestamp).toLocaleString(),
        price: entry.currentPrice,
    }));

    function onClick() {
        setFlag(false);
    }
    return (
        <div className="chart-container bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-lg shadow-md p-6 mt-6 w-full h-[400px]">
            {/* Chart Title */}
            <h2 className="chart-title text-xl font-semibold mb-4 text-center">
                {data[0]?.tradingPair}
            </h2>

            {/* Chart */}
            <ResponsiveContainer width="100%" height="80%">
                <LineChart
                    data={formattedData}
                    margin={{ top: 5, right: 10, left: 20, bottom: 5 }}
                >
                    <XAxis dataKey="time" stroke="#8884d8" />
                    <YAxis stroke="#8884d8" />
                    <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                    <Tooltip />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="price"
                        stroke="#6366f1" // Tailwind's indigo-500
                        strokeWidth={2}
                        activeDot={{ r: 8 }}
                    />
                </LineChart>
            </ResponsiveContainer>

            {/* Hide Button */}
            <div className="flex justify-center mt-4">
                <button
                    onClick={onClick}
                    className="hide-button bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    {t('hideButtonText')}
                </button>
            </div>
        </div>
    );
};

export default Graph;
