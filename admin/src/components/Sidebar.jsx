import { NavLink, Link } from 'react-router-dom';
import { logoAdmin } from '../assets';
import {
  Briefcase,
  LayoutDashboard,
  MenuSquare,
  PlusCircle,
  Sparkles,
  UserRound,
} from 'lucide-react';
import { useState } from 'react';

const navLinks = [
  { id: 1, name: 'Dashboard', path: '/', icon: <LayoutDashboard /> },
  { id: 2, name: 'Pozisyonlar', path: '/positions', icon: <Briefcase /> },
  { id: 3, name: 'Adaylar', path: '/candidates', icon: <UserRound /> },
  { id: 4, name: 'Pozisyon ekle', path: '/position-add', icon: <PlusCircle /> },
  { id: 5, name: 'Adayları karşılaştır', path: '/compare-candidates', icon: <Sparkles /> },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <aside
      className={`${
        isOpen ? 'w-72' : 'w-24'
      } flex h-screen bg-neutral-100  flex-col overflow-hidden duration-300 ease-linear  sticky top-0 left-0 lg:translate-x-0  border-r border-gray-300`}
    >
      <div
        className={`justify-center items-center px-4 h-20 border-b border-gray-300 ${
          isOpen ? 'flex' : 'hidden'
        }`}
      >
        <Link to="/">
          <img src={logoAdmin} alt="logo-admin" width={180} />
        </Link>
      </div>
      <div className="flex flex-col overflow-y-auto p-4 duration-300 ease-linear">
        <nav className="mt-4">
          <ul className="flex flex-col gap-4 text-xl">
            <button
              className="flex items-center gap-2 p-2 justify-center bg-green-400 text-white rounded-md"
              onClick={() => setIsOpen(!isOpen)}
            >
              <MenuSquare  />
              <span>{isOpen && "Menü Kapat" }</span>
            </button>
            {navLinks.map((link) => (
              <li key={link.id}>
                <NavLink
                  to={link.path}
                  className={`flex items-center gap-2 p-4 justify-center hover:bg-blue-600 hover:text-white rounded-full aria-[current=page]:bg-blue-600 aria-[current=page]:text-white }`}
                >
                  {link.icon}
                  {isOpen && link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
