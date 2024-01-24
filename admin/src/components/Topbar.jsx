import { LogOut } from 'lucide-react';

const Topbar = () => {
  return (
    <header className="w-full h-20 p-6 sm:px-16 flex justify-end items-center border-b bg-gray-100  border-gray-300">
      <div className="flex items-center justify-between gap-2 text-gray-900">
        <span className="text-xl capitalize cursor-pointer border-r-2 border-gray-300 pr-2">
          Murat Mutlu
        </span>
        <LogOut />
      </div>
    </header>
  );
};

export default Topbar;
