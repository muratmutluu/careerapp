import { Link } from 'react-router-dom';
import { logo } from '../assets';
import { footerLinks } from '../constants';

const Footer = () => {
  return (
    <footer className="flex flex-col text-gray-900 mt-5 border-t border-gray-100">
      <div className="max-w-screen-2xl mx-auto w-full">
        <div className="flex max-md:flex-col flex-wrap justify-between gap-5 px-4 md:px-8 py-10">
          <div className="flex flex-col justify-start items-start gap-6">
            <img src={logo} alt="logo" width={180} height={45} className="object-contain" />
            <p className="text-base text-gray-700">
              Careerapp 2023
              <br />
              Tüm hakları saklıdır &copy;
            </p>
          </div>
          <div className="flex-1 w-full flex md:justify-end flex-wrap max-md:mt-10 gap-20">
            {footerLinks.map((item) => (
              <div className="flex flex-col gap-6 text-base min-w-[170px]" key={item.title}>
                <h3 className="font-bold">{item.title}</h3>
                <div className="flex flex-col gap-5">
                  {item.links.map((link) => (
                    <Link to={link.url} key={link.title} className="text-gray-500">
                      {link.title}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between items-center flex-wrap mt-10 border-t border-gray-100 px-4 md:px-8 py-10">
          <p>@2023 Careerapp. Tüm hakları saklıdır.</p>

          <div className="flex-1 flex sm:justify-end justify-center max-sm:mt-4 gap-10">
            <Link href="/" className="text-gray-500">
              Gizlilik Politikası
            </Link>
            <Link href="/" className="text-gray-500">
              Kullanım Koşulları
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
