import { Link } from 'react-router-dom';

const PositionCard = ({ item }) => {
  return (
    <div className="group flex flex-col gap-4 p-6 items- justify-center text-gray-900 bg-blue-50 hover:bg-white hover:shadow-md rounded-3xl">
      <div className="w-full flex justify-between items-center gap-5 text-lg">
        <span className="bg-orange-200 p-1 flex-1 border inline-flex justify-center border-red-300 rounded-md text-gray-900">
          {item.department}
        </span>
        <span className="bg-green-200 p-1 flex-1 border inline-flex justify-center border-blue-300 rounded-md text-gray-900">
          {item.city}
        </span>
      </div>
      <div className="w-full max-h-80 block overflow-hidden rounded-2xl">
        {console.log(item?.img)}
        <img
          src={`http://localhost:5173/public/uploads/${item?.img}`}
          alt="position-img"
          className="object-cover object-center w-full h-full transition duration-200 group-hover:scale-110"
        />
      </div>
      <h2 className="text-2xl leading-6 font-bold capitalize text-center">{item.position}</h2>

      <Link
        reloadDocument
        to={`/basvuru/${item.id}`}
        className=" bg-blue-600 text-white px-6 py-3 rounded-full inline-flex items-center justify-center hover:bg-blue-700 transition duration-300 ease-in-out"
      >
        Başvur
      </Link>
    </div>
  );
};

export default PositionCard;
