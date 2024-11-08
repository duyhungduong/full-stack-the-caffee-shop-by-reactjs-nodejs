import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Khách hàng', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Đơn gọi món', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Bàn', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Doanh thu', uv: 2780, pv: 3908, amt: 2000 }
];

function BarChartt() {
    return (
        <div className="flex-2 shadow-lg w-full h-full p-6 rounded-lg">
            <div className="mb-4">
                <h3 className="text-lg font-semibold">Earning</h3>
                <p className="text-sm text-gray-600">Doanh thu hàng tháng trong 6 tháng qua.</p>
            </div>
            <div className="flex items-center justify-center">
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={data}>
                        <defs>
                            <linearGradient id="pvGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="uvGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" tickLine={false} />
                        <YAxis tickFormatter={(value) => `${value}k`} />
                        <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)} />
                        <Legend />
                        <Bar dataKey="pv" fill="url(#pvGradient)" animationDuration={500} />
                        <Bar dataKey="uv" fill="url(#uvGradient)" animationDuration={500} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default BarChartt;
