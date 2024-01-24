import { UserRound } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

const Candidate = () => {
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const { data, loading } = useFetch(`/api/candidates/${id}}`);
  console.log(data);
  return (
    <div className="max-w-8xl mx-auto py-4 px-6 flex flex-col items-start gap-4">
      <div className="flex items-center gap-2 ">
        <span>
          <UserRound className="text-blue-600" size={28} />
        </span>
        <h1 className="flex items-start leading-normal text-2xl sm:text-3xl sm:leading-normal font-extrabold capitalize bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
          Adaylar
        </h1>
      </div>
      {loading ? (
        'Loading...'
      ) : (
        <section className="flex flex-col justify-start border p-9 rounded-lg w-full gap-10">
          <div className="flex gap-20 items-center">
            <div className="rounded-lg overflow-hidden shadow-md">
              <img
                src="https://th.bing.com/th/id/OIG.GDuKu6_kJRMv.tJoaYRj?pid=ImgGn"
                alt=""
                className="object-cover object-center w-60 h-full"
              />
            </div>
            <div className="flex flex-col gap-5 border p-3 rounded-md border-gray-300 shadow-md">
              <div className="flex items-center gap-5 justify-start">
                <span className="text-2xl">
                  Adı: <span className="text-2xl font-bold">{data[0]?.name}</span>
                </span>
                <span className="text-2xl">
                  Soyadı: <span className="text-2xl font-bold">{data[0]?.sur_name}</span>
                </span>
              </div>
              <span className="text-2xl">
                E-mail: <span className="text-2xl font-bold">{data[0]?.email}</span>
              </span>
              <span className="text-2xl">
                Tel No: <span className="text-2xl font-bold">{data[0]?.phone_number}</span>
              </span>
              <div className="flex items-center gap-3 w-full">
                <span className="bg-orange-200 w-full p-1 border inline-flex justify-center border-red-300 rounded-md text-gray-900">
                  {data[0]?.position}
                </span>
                <span className="bg-green-200 w-full p-1 border inline-flex justify-center border-blue-300 rounded-md text-gray-900">
                  {data[0]?.city}
                </span>
              </div>
              <span className="text-2xl">
                Başvuru Tarihi:
                <span className="text-2xl font-bold">
                  {new Date(data[0]?.apply_time).toLocaleDateString()}
                </span>
              </span>
            </div>
          </div>
          <div className="flex justify-between">
            <div className='flex flex-col gap-4 border p-3 rounded-md border-gray-300 shadow-md'>
              <span className="text-2xl">
                Son çalıştığı pozisyon: <span className="text-2xl font-bold">{data[0]?.last_position}</span>
              </span>
              <span className="text-2xl">
                Son çalıştığı şirket: <span className="text-2xl font-bold">{data[0]?.last_company}</span>
              </span>
            </div>
            <div className='flex flex-col gap-4 border p-3 rounded-md border-gray-300 shadow-md'>
              <span className="text-2xl">
                Özgeçmiş:{' '}
                <span className="text-2xl text-blue-600 underline">
                  <a href={data[0]?.cv_url}>{data[0]?.cv_url}</a>
                </span>
              </span>
              <span className="text-2xl">
                LinkedIn:
                <span className="text-2xl text-blue-600 underline">
                  <a href={data[0]?.linkedin} target="_blank" rel="noreferrer">
                    {data[0]?.linkedin}
                  </a>
                </span>
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <h1 className="text-center leading-normal text-2xl sm:text-5xl sm:leading-normal font-extrabold capitalize bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Değerlendirme Cevapları</h1>
            <ul className='text-xl mb-3 max-w-2xl border p-3 rounded-md border-gray-300 shadow-md mx-auto px-16 py-8'>
              {
                data?.map((item,index) => (
                  <li key={index} className='flex mb-4 gap-4 justify-between'>
                    <span>{item.criterion}</span>
                    <span className='text-3xl'>{item.score}</span>
                  </li>
                ))
              }
            </ul>
          </div>
        </section>
      )}
    </div>
  );
};

export default Candidate;
