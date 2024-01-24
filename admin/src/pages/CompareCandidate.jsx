import { Medal } from 'lucide-react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import useFetch from '../hooks/useFetch';
import { MagnifyingGlass } from 'react-loader-spinner';
import Confetti from 'react-confetti';
import { useLocation, Link } from 'react-router-dom';

const columns = [
  { field: 'id', headerName: 'ID', width: 72 },
  { field: 'name', headerName: 'Adı', width: 100 },
  { field: 'sur_name', headerName: 'Soyadı', width: 100 },
  { field: 'email', headerName: 'Email', width: 240 },
  { field: 'phone_number', headerName: 'Telefon', width: 150 },
  { field: 'apply_time', headerName: 'Başvuru Tarihi', width: 200 },
  { field: 'score', headerName: 'Puan %', width: 100 },
  {
    field: 'actions',
    headerName: 'İşlemler',
    width: 150,
    sortable: false,
    renderCell: (params) => (
      <Link
        to={`/candidate/${params.row.id}`}
        className="bg-blue-600 text-white px-4 py-2  rounded-full  hover:bg-blue-700 transition duration-300 ease-in-out max-w-xs mx-auto"
      >
        Git
      </Link>
    ),
  },
];

const CompareCandidate = () => {
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const { data, loading } = useFetch(`/api/ahp/${id}}`, true);

  const mergedData = data?.candidatesData?.map((candidate) => {
    const matchingScore = data?.transformedMap.find(
      (scoreData) => parseInt(scoreData.id) === candidate.id
    );

    if (matchingScore) {
      const fixedScore = (matchingScore.score * 100).toFixed(2);
      return {
        ...candidate,
        score: parseFloat(fixedScore),
        apply_time: new Date(candidate.apply_time).toLocaleDateString(),
      };
    }

    return candidate;
  });

  return (
    <div className="max-w-8xl mx-auto py-4 px-6 flex flex-col items-start gap-4">
      <div className="flex items-center gap-2 ">
        <span>
          <Medal className="text-blue-600" size={28} />
        </span>
        <h1 className="flex  leading-normal text-2xl sm:text-3xl sm:leading-normal font-extrabold capitalize bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
          {data.candidatesData?.[0].position} Pozisyonu İçin Karşılaştırma Sonuçları
        </h1>
      </div>
      <div className="h-[600px] w-full ">
        {loading ? (
          <div className="flex flex-col items-center mt-24">
            <MagnifyingGlass
              visible={true}
              height="200"
              width="200"
              ariaLabel="MagnifyingGlass-loading"
              wrapperStyle={{}}
              wrapperClass="MagnifyingGlass-wrapper"
              glassColor="#c0efff"
              color="#e15b64"
            />
            <span className=" leading-normal text-2xl sm:text-5xl sm:leading-normal font-extrabold capitalize bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Adaylar Karşılaştırılıyor...
            </span>
          </div>
        ) : (
          <div>
            <Confetti recycle={false} numberOfPieces={1000} />

            <DataGrid
              rows={mergedData || []}
              disableColumnFilter
              disableColumnSelector
              disableDensitySelector
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
                sorting: {
                  sortModel: [{ field: 'score', sort: 'desc' }],
                },
              }}
              pageSizeOptions={[5, 10, 20, 50, 100]}
              slots={{ toolbar: GridToolbar }}
              slotProps={{
                toolbar: {
                  showQuickFilter: true,
                },
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CompareCandidate;
