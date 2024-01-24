import { BadgePlus, Plus, SendHorizontal } from 'lucide-react';
import DynamicInput from '../components/DynamicInput';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PositionAdd = () => {
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  const [posInputs, setPosInputs] = useState({});
  const [criInputs, setCriInputs] = useState({});
  const [image, setImage] = useState(null);

  const handleChangePos = (e) => {
    setPosInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleChangeCri = (e) => {
    setCriInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    uploadImage();
  };

  const uploadImage = async () => {
    try {
      const formData = new FormData();
      formData.append('file', image);
      const res = await axios.post('/api/upload', formData);
      setPosInputs((prev) => ({ ...prev, img: res.data }));
    } catch (error) {
      console.log(error);
    }
  };
  const inputs = {
    positionData: posInputs,
    criteriaData: criInputs,
  };
  console.log(inputs);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/positions/', inputs);
      const newPositionId = res.data.id;
      navigate(`/compare-criteria/${newPositionId}`);
    } catch (err) {
      setErr(err.response.data);
    }
  };
  // console.log(inputs);

  return (
    <div className="max-w-6xl mx-auto py-4 px-8 flex flex-col items-start gap-4">
      <div className="flex items-center justify-between gap-2 ">
        <span>
          <BadgePlus className="text-blue-600" size={28} />
        </span>
        <h1 className="flex items-start leading-normal text-2xl sm:text-3xl sm:leading-normal font-extrabold capitalize bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
          Yeni bir pozisyon ekle
        </h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="mx-auto  rounded-lg border flex flex-col gap-4 border-gray-200 w-full shadow-md overflow-hidden "
      >
        <div>
          <h2 className="flex items-center justify-center font-extrabold text-2xl py-2 text-gray-900 bg-gray-50 border-b">
            Pozisyon Bilgileri
          </h2>
          <div className="flex flex-col gap-4 p-4 md:p-8">
            <div className="flex flex-col lg:flex-row justify-between gap-4">
              <div className="w-full">
                <label htmlFor="name" className="text-md text-gray-600 ml-1">
                  Pozisyon Adı <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="position"
                  className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-900 outline-none ring-blue-600 transition duration-100 focus:ring"
                  placeholder="Backend Developer"
                  required
                  id="position"
                  onChange={handleChangePos}
                />
              </div>
              <div className="w-full">
                <label htmlFor="surname" className="text-md text-gray-600 ml-1">
                  Pozisyon Departmanı <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="department"
                  className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-900 outline-none ring-blue-600 transition duration-100 focus:ring"
                  placeholder="Engineering"
                  id="department"
                  required
                  onChange={handleChangePos}
                />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row justify-between gap-4">
              <div className="w-full">
                <label htmlFor="email" className="text-md text-gray-600 ml-1">
                  Lokasyon <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="city"
                  className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-900 outline-none ring-blue-600 transition duration-100 focus:ring"
                  placeholder="Bursa"
                  required
                  id="city"
                  onChange={handleChangePos}
                />
              </div>
              <div className="w-full">
                <label htmlFor="cv" className="text-md text-gray-600 ml-1">
                  Kapak Fotoğrafı
                </label>
                <div className="flex gap-1">
                  <input
                    type="file"
                    name="img"
                    className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-900 outline-none ring-blue-600 transition duration-100 focus:ring"
                    id="img"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                  <button
                    type="button"
                    className="px-3 py-2 text-green-600 border rounded bg-gray-50"
                    onClick={handleClick}
                  >
                    <SendHorizontal />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <DynamicInput handleChange={handleChangeCri} />
            </div>
          </div>
        </div>
        {err && <p className="text-red-600 text-center">{err}</p>}
        <button
          disabled={err}
          type="submit"
          className=" bg-blue-600 text-white px-6 py-3 rounded-full flex gap-2  hover:bg-blue-700 transition duration-300 ease-in-out mb-12 max-w-xs mx-auto disabled:bg-red-600"
        >
          <Plus />
          {!err ? 'Pozisyon ekle' : 'Hata var'}
        </button>
      </form>
    </div>
  );
};

export default PositionAdd;
