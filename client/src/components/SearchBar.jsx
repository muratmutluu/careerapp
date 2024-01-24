import { useState } from 'react';
import SearchPosition from './SearchPosition';

const Searchbar = ({data}) => {
  const [position, setPosition] = useState('');
  const handleSearch = () => {};
  return (
    <form
      className="flex items-center justify-start max-sm:flex-col w-full relative max-sm:gap-4 max-w-2xl"
      onSubmit={handleSearch}
    >
      <div className="flex-1 max-sm:w-full flex justify-start items-center relative">
        <SearchPosition position={position} setPosition={setPosition} data={data} />
      </div>
    </form>
  );
};

export default Searchbar;
