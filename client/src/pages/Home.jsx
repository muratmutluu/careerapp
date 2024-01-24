// import CustomFilter from '../components/CustomFilter';
import Hero from '../components/Hero';
import PositionCard from '../components/PositionCard';
import Searchbar from '../components/Searchbar';
// import { fetchPositions } from '../utils';
// import { data } from '../constants';
import useFetch from '../hooks/useFetch';

const Home = () => {
  const { data, loading } = useFetch('/api/positions');

  return (
    <main>
      <Hero />

      <div className="max-w-screen-2xl mx-auto px-4 md:px-8 py-4 mt-12" id="discover">
        <h2 className="text-2xl font-extrabold text-gray-900">Açık pozisyonlarımıza göz atın</h2>

        <div className="mt-12 w-full flex justify-between items-center flex-wrap gap-5">
          <Searchbar data={data} />

          {/* <div className="flex justify-start flex-wrap items-center gap-2">
            <CustomFilter />
            <CustomFilter />
          </div> */}
        </div>

        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 w-full gap-8 pt-14">
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
    </main>
  );
};

export default Home;
