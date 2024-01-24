import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import useFetch from '../hooks/useFetch';
import { Link } from 'react-router-dom';

const formatDate = (date) => {
  const newDate = new Date(date);
  return newDate.toLocaleDateString();
};

const columns = [
  { field: 'id', headerName: 'ID', width: 72 },
  { field: 'name', headerName: 'Adı', width: 100 },
  { field: 'sur_name', headerName: 'Soyadı', width: 100 },
  { field: 'email', headerName: 'Email', width: 240 },
  { field: 'phone_number', headerName: 'Telefon', width: 150 },
  { field: 'position', headerName: 'Başvurduğu pozisyon', width: 180 },
  { field: 'city', headerName: 'Şehir', width: 120 },
  { field: 'department', headerName: 'Departman', width: 120 },
  {
    field: 'apply_time',
    headerName: 'Başvuru Tarihi',
    width: 150,
    renderCell: (params) => formatDate(params.row.apply_time),
  },
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

const DataTable = () => {
  const { data, loading } = useFetch('/api/candidates');
  return (
    <div className="h-[600px] w-full">
      {loading ? (
        'Loading...'
      ) : (
        <DataGrid
          rows={data}
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
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
      )}
    </div>
  );
};

export default DataTable;
