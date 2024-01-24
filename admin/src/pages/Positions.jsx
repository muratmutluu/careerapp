import { Briefcase } from 'lucide-react';
import PositionCard from '../components/PositionCard';
import useFetch from '../hooks/useFetch';

const Positions = () => {
  const { data, loading } = useFetch('/api/positions');

  return (
    <div className="max-w-6xl mx-auto p-4 flex flex-col items-start gap-4 ">
      <div className="flex items-center gap-2 ">
        <span>
          <Briefcase className="text-blue-600" size={28} />
        </span>
        <h1 className="flex items-start leading-normal text-2xl sm:text-3xl sm:leading-normal font-extrabold capitalize bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Pozisyonlar
        </h1>
      </div>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 w-full gap-8 pt-1">
        {loading ? (
          'Loading...'
        ) : (
          <>
            {data.map((item) => (
              <PositionCard item={item} key={item.id} />
            ))}
          </>
        )}
      </section>
    </div>
  );
};

export default Positions;
