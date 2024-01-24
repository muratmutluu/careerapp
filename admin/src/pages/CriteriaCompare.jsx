import { Briefcase, Plus } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { useState } from 'react';
import axios from 'axios';
import saaty from '../assets/saaty.png';
const CriteriaCompare = () => {
  const location = useLocation();
  const [err, setErr] = useState(null);
  const id = location.pathname.split('/')[2];
  const { data } = useFetch(`/api/positions/compare-criteria/${id}`);
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const evalValue = (v) => {
    if (!v.includes('/')) return parseFloat(v);
    const parts = v.split('/');

    const result = parseFloat(parts[0]) / parseFloat(parts[1]);

    return parseFloat(result);
  };

  const lastInputs = data.map((item, index) => ({
    ...item,
    rank: evalValue(String(inputs[`rank${index}`])),
  }));
  console.log(lastInputs);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/positions/compare-criteria/${id}`, lastInputs);
      const data = res.data;
      if (data.success === false) {
        setErr(data.message);
        return;
      }
      navigate('/positions');
    } catch (err) {
      setErr(err);
      console.log(err);
    }
  };
  // console.log(inputs);
  return (
    <div className="max-w-8xl mx-auto p-4 flex flex-col items-start gap-4">
      <div className="flex items-center gap-2 ">
        <span>
          <Briefcase className="text-blue-600" size={28} />
        </span>
        <h1 className="flex items-start leading-normal text-2xl sm:text-3xl sm:leading-normal font-extrabold capitalize bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
          Kriterleri Karşılaştır
        </h1>
      </div>
      <div className="mx-auto">
        <h2 className="leading-normal text-2xl sm:text-3xl sm:leading-normal font-extrabold capitalize bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent text-center mb-3">
          Saaty Tarafından Önerilen Önem Skalası
        </h2>
        <img src={saaty} alt="" className="w-full h-96" />
      </div>
      {/* {console.log(data)} */}
      <form onSubmit={handleSubmit} className="w-full mx-auto flex flex-col gap-2">
        {data.map((item, index) => (
          <div
            className="flex gap-2 text-xl p-2 bg-gray-100 shadow-md border rounded-md "
            key={index}
          >
            <span className="text-red-600">{item.criterion1}</span> kriteri
            <span className="text-blue-600">{item.criterion2}</span>
            kriterine göre
            <select name={`rank${index}`} onChange={handleChange}>
              <option value="">Seçiniz</option>
              <option value="1/9">1/9</option>
              <option value="1/8">1/8</option>
              <option value="1/7">1/7</option>
              <option value="1/6">1/6</option>
              <option value="1/5">1/5</option>
              <option value="1/4">1/4</option>
              <option value="1/3">1/3</option>
              <option value="1/2">1/2</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
            </select>
            önem derecesine sahiptir.
          </div>
        ))}
        <button
          disabled={err}
          type="submit"
          className=" bg-blue-600 text-white px-6 py-3 rounded-full flex gap-2  hover:bg-blue-700 transition duration-300 ease-in-out mb-12 max-w-xs mx-auto disabled:bg-red-600"
        >
          <Plus />
          {!err ? 'Kriterleri gönder' : 'Hata var'}
        </button>
        {err && <p className="text-red-600">{err}</p>}
      </form>
    </div>
  );
};

export default CriteriaCompare;
