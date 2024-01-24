import { UserRound } from 'lucide-react';
import DataTable from '../components/DataTable';

const Candidates = () => {
  return (
    <div className="max-w-8xl mx-auto py-4 px-6 flex flex-col items-start gap-4 overflow-hidden">
      <div className="flex items-center gap-2 ">
        <span>
          <UserRound className="text-blue-600" size={28} />
        </span>
        <h1 className="flex items-start leading-normal text-2xl sm:text-3xl sm:leading-normal font-extrabold capitalize bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
          Adaylar
        </h1>
      </div>
      <DataTable />
    </div>
  );
};

export default Candidates;
