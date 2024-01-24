import PositionForm from '../components/PositionForm';
import useFetch from '../hooks/useFetch';
import { useLocation } from 'react-router-dom';

const Basvuru = () => {
  const location = useLocation();

  const id = location.pathname.split('/')[2];
  const { data, loading } = useFetch(`/api/positions/${id}`);

  return (
    <>
      {loading ? (
        'Loading'
      ) : (
        <main className="max-w-screen-2xl mx-auto px-4 md:px-8 py-4 mt-4 flex flex-col  items-center">
          <h1 className="text-center leading-normal text-5xl sm:text-6xl sm:leading-normal font-extrabold capitalize bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            {data.position}
          </h1>
          <p className="mt-2  text-lg text-gray-900 sm:text-xl max-w-2xl;">
            → <span className="font-bold">{data.city}</span> ilinde bulunan ofisimizde{' '}
            <span className="font-bold">{data.department}</span> departmanımızda tam zamanlı
            çalışmak üzere
            <span className="font-bold"> {data.position} </span> arayışımız bulunmaktadır.
          </p>

          <PositionForm positionId={id} />
        </main>
      )}
    </>
  );
};

export default Basvuru;
