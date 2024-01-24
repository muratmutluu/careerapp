import { useState } from 'react';
import useFetch from '../hooks/useFetch';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PositionForm = ({ positionId }) => {
  const { data, loading } = useFetch(`/api/positions/criteria/${positionId}`);
  const navigate = useNavigate();
  const [err, setErr] = useState(null);

  const [canInputs, setCanInputs] = useState({});
  const [scoreInputs, setScoreInputs] = useState({});

  const handleChangeScores = (e) => {
    setScoreInputs((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleChangeCandidates = (e) => {
    setCanInputs((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    setErr(null);
  };

  const params = {
    candidateData: canInputs,
    scoreData: scoreInputs,
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/candidates/${positionId}`, params);
      navigate('/');
    } catch (err) {
      setErr(err.response.data.message);
      console.log(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto mt-12 rounded-lg border flex flex-col gap-4 border-gray-200 w-full shadow-md overflow-hidden "
      name="criteriaForm"
    >
      <div>
        <h2 className="flex items-center justify-center font-extrabold text-2xl py-2 text-gray-900 bg-gray-50 border-b">
          Aday Bilgileri
        </h2>
        <div className="flex flex-col gap-4 p-4 md:p-8">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="w-full">
              <label htmlFor="name" className="text-md text-gray-600 ml-1">
                Ad <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="name"
                className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-900 outline-none ring-blue-600 transition duration-100 focus:ring"
                placeholder="Murat"
                required
                id="name"
                onChange={handleChangeCandidates}
              />
            </div>
            <div className="w-full">
              <label htmlFor="surname" className="text-md text-gray-600 ml-1">
                Soyad <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-900 outline-none ring-blue-600 transition duration-100 focus:ring"
                placeholder="Mutlu"
                onChange={handleChangeCandidates}
                id="surname"
                required
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="w-full">
              <label htmlFor="email" className="text-md text-gray-600 ml-1">
                E-mail <span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                name="email"
                className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-900 outline-none ring-blue-600 transition duration-100 focus:ring"
                placeholder="murat@example.com"
                required
                id="email"
                onChange={handleChangeCandidates}
              />
            </div>
            <div className="w-full">
              <label htmlFor="phone" className="text-md text-gray-600 ml-1">
                Telefon No <span className="text-red-600">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-900 outline-none ring-blue-600 transition duration-100 focus:ring"
                placeholder="+90 555 555 55 55"
                required
                id="phone"
                onChange={handleChangeCandidates}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="w-full">
              <label htmlFor="linkedin" className="text-md text-gray-600 ml-1">
                LinkedIn
              </label>
              <input
                type="text"
                name="linkedin"
                className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-900 outline-none ring-blue-600 transition duration-100 focus:ring"
                placeholder="www.linkedin.com/in/muratmutlu10/"
                id="linkedin"
                onChange={handleChangeCandidates}
              />
            </div>
            <div className="w-full">
              <label htmlFor="cv" className="text-md text-gray-600 ml-1">
                Özgeçmiş
              </label>
              <input
                type="text"
                name="cv"
                className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-900 outline-none ring-blue-600 transition duration-100 focus:ring"
                placeholder="www.example.com/mycv/"
                id="cv"
                onChange={handleChangeCandidates}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="w-full">
              <label htmlFor="lastCompany" className="text-md text-gray-600 ml-1">
                Daha önce çalıştığınız şirket ?
              </label>
              <input
                type="text"
                name="lastCompany"
                className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-900 outline-none ring-blue-600 transition duration-100 focus:ring"
                placeholder="Example Inc."
                id="lastCompany"
                onChange={handleChangeCandidates}
              />
            </div>
            <div className="w-full">
              <label htmlFor="lastPosition" className="text-md text-gray-600 ml-1">
                Daha önce çalıştığınız pozisyon ?
              </label>
              <input
                type="text"
                name="lastPosition"
                className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-900 outline-none ring-blue-600 transition duration-100 focus:ring"
                placeholder="Data Engineer"
                id="lastPosition"
                onChange={handleChangeCandidates}
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="flex items-center justify-center font-extrabold text-2xl py-2 text-gray-900 bg-gray-50 border-y">
          Kriter Formu
        </h2>
        <div className="flex flex-col gap-10 p-4 md:p-8">
          {loading
            ? 'Loading...'
            : data.map((item) => (
                <div className="flex flex-col gap-2 border-b pb-8" key={item.id}>
                  <label htmlFor={`criteria${item.id}`} className="text-lg font-bold">
                    {item.criterion}
                    <span className="text-lg font-normal ml-1.5 text-gray-900">
                      konusunda ne kadar tecrübelisin ?
                    </span>
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={10}
                    name={`criteria${item.id}`}
                    id={item.id}
                    value={scoreInputs[item.id] || 1}
                    className="w-full"
                    step="1"
                    onChange={handleChangeScores}
                  />

                  <div className="w-full flex justify-between text-xs sm:text-sm px-1">
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                    <span>5</span>
                    <span>6</span>
                    <span>7</span>
                    <span>8</span>
                    <span>9</span>
                    <span>10</span>
                  </div>
                </div>
              ))}
        </div>
      </div>
      {err && <p className="text-red-600 text-center">{err}</p>}
      <button
        disabled={err}
        className=" bg-blue-600 text-white px-6 py-3 rounded-full  hover:bg-blue-700 transition duration-300 ease-in-out mb-12 max-w-xs mx-auto disabled:bg-red-600"
      >
        {!err ? 'Başvuruyu Gönder' : 'Başvuruyu Gönderemessiniz'}
      </button>
    </form>
  );
};

export default PositionForm;
