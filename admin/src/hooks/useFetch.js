import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetch = (url, fakeLoading = false) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(url);
        setData(res.data);
      } catch (error) {
        setError(error);
      }
      fakeLoading && setTimeout(() => setLoading(false), 1500);
      !fakeLoading && setLoading(false);
    };
    fetchData();
  }, [url, fakeLoading]);

  const reFetch = async () => {
    setLoading(true);
    try {
      const res = await axios.get(url);
      setData(res.data);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };
  return { data, loading, error, reFetch };
};

export default useFetch;
