import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Sparkles, Trash2 } from 'lucide-react';

const PositionCard = ({ item }) => {
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.delete('http://localhost:3000/api/positions/' + item.id);

      navigate('/positions');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="group flex flex-col gap-4 p-6 justify-between text-gray-900 bg-blue-50 hover:bg-white hover:shadow-md rounded-3xl">
      <div className="w-full flex justify-between items-center gap-5 text-lg">
        <span className="bg-orange-200 p-1 flex-1 border inline-flex justify-center border-red-300 rounded-md text-gray-900">
          {item.department}
        </span>
        <span className="bg-green-200 p-1 flex-1 border inline-flex justify-center border-blue-300 rounded-md text-gray-900">
          {item.city}
        </span>
      </div>
      <div className="w-full max-h-80 block overflow-hidden rounded-2xl">
        {console.log(item.img)}
        <img
          src={'../../public/uploads/' + item?.img}
          alt="position-img"
          className="object-cover object-center w-full h-full transition duration-200 group-hover:scale-110"
        />
      </div>
      <h2 className="text-2xl leading-6 font-bold capitalize text-center">{item.position}</h2>

      <div className="flex justify-between gap-2 items-center">
        <Link
          reloadDocument
          to={`/compare-candidate/${item.id}`}
          className=" bg-green-600 text-white px-6 py-3 rounded-full inline-flex items-center justify-center hover:bg-green-700 transition duration-300 ease-in-out text-lg w-full"
        >
          Karşılaştır
          <Sparkles className="ml-2" />
        </Link>
        <button
          type="button"
          className="p-2 text-red-600 border rounded bg-gray-50"
          onClick={handleClick}
        >
          <Trash2 />
        </button>
      </div>
    </div>
  );
};

export default PositionCard;
