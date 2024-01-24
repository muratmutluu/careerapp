import { Briefcase, Layers3, LayoutDashboard, UserRound, Workflow } from 'lucide-react';
import useFetch from '../hooks/useFetch';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Filler,
  Title,
} from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { chartDataBar, chartDataLine, chartDataPie, options } from '../utils/chartData';
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  LineElement,
  PointElement,
  Filler
);

const Dashboard = () => {
  const { data, loading } = useFetch('/api/dashboard');
  console.log(data);

  return loading ? (
    'Loading...'
  ) : (
    <div className="max-w-7xl mx-auto p-4 flex flex-col items-start gap-4 ">
      <div className="flex items-center gap-2 ">
        <span>
          <LayoutDashboard className="text-blue-600" size={28} />
        </span>
        <h1 className="flex items-start leading-normal text-2xl sm:text-3xl sm:leading-normal font-extrabold capitalize bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
          Dashboard
        </h1>
      </div>
      <section className="mx-auto p-2">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-10 xl:grid-cols-4 2xl:gap-7.5">
          <div className="rounded-md border bg-gray-100 px-2 py-6 justify-center  shadow-md flex flex-col items-center gap-3">
            <div className="text-xl text-gray-900">Toplam Pozisyon Sayısı</div>
            <span className="text-2xl flex gap-3 items-center text-blue-600">
              <Briefcase />
              {data.data?.[0]?.pozisyon_sayisi}
            </span>
          </div>
          <div className="rounded-md border bg-gray-100 px-2 py-6 justify-center  shadow-md flex flex-col items-center gap-3">
            <div className="text-xl text-gray-900">Toplam Aday Sayısı</div>
            <span className="text-2xl flex gap-3 items-center text-blue-600">
              <UserRound />
              {data.data?.[0]?.aday_sayisi}
            </span>
          </div>
          <div className="rounded-md border bg-gray-100 px-2 py-6 justify-center  shadow-md flex flex-col items-center gap-3">
            <div className="text-xl text-gray-900">Toplam Departman Sayısı</div>
            <span className="text-2xl flex gap-3 items-center text-blue-600">
              <Layers3 />
              {data.data?.[0]?.departman_sayisi}
            </span>
          </div>
          <div className="rounded-md border bg-gray-100 px-2 py-6 justify-center  shadow-md flex flex-col items-center gap-3">
            <div className="text-xl text-gray-900">Toplam Kriter Sayısı</div>
            <span className="text-2xl flex gap-3 items-center text-blue-600">
              <Workflow />
              {data.data?.[0]?.kriter_sayisi}
            </span>
          </div>
        </div>

        <div className="flex flex-col mt-10 gap-10">
          <div className="flex w-full gap-5">
            <div className="border rounded-md shadow-md bg-gray-50 p-4 w-full max-w-sm">
              <Pie
                options={options('Departmanlara göre aday sayısı')}
                data={chartDataPie(data.data4)}
              />
            </div>
            <div className="border rounded-md shadow-md bg-gray-50 p-4 w-full">
              <Bar
                options={options('Pozisyonlara göre aday sayısı')}
                data={chartDataBar(data.data3)}
              />
            </div>
          </div>
          <div className="flex w-full">
            <Line
              options={options('Pozisyonlara göre aday sayısı')}
              data={chartDataLine(data.data2)}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
