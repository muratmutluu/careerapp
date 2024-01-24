import { Link } from 'react-router-dom';
import { logo } from '../assets';

const Navbar = () => {
  return (
    <header className="w-full border-b border-gray-100 mb-4">
      <nav className="max-w-screen-2xl mx-auto flex justify-between items-center px-4 md:px-8 py-4 bg-transparent">
        <Link to="/">
          <img src={logo} alt="logo" width={180} height={45} className="object-contain" />
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
