import { hero } from '../assets';

const Hero = () => {
  const handleScroll = () => {
    const nextSection = document.getElementById('discover');

    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="max-w-screen-2xl mx-auto px-4 md:px-8 py-4 flex flex-col lg:flex-row items-center gap-6 sm:gap-10 md:gap-16">
      <div className="flex-1 flex flex-col gap-10 text-center md:text-left lg:py-12 xl:py-24">
        <h1 className="text-5xl font-extrabold sm:text-6xl 2xl:text-7xl">Birlikte Yürüyelim</h1>
        <p className="text-2xl text-gray-900 font-light ">
          Her zaman bizimle hayallerimize ortak olacak, tutkulu ve gelişime açık ekip arkadaşları
          edinmek için hazırız.
        </p>
        <div className="flex flex-col md:flex-row">
          <button
            className=" bg-blue-600 text-white px-6 py-3 rounded-full  hover:bg-blue-700 transition duration-300 ease-in-out"
            onClick={handleScroll}
          >
            Açık Pozisyonlar
          </button>
        </div>
      </div>

      <div className="flex-1 lg:flex-[1.5] rounded-lg w-full bg-gray-100 shadow-lg">
        <img
          src={hero}
          alt="hero"
          className="w-full h-full object-contain object-center rounded-lg"
        />
      </div>
    </section>
  );
};

export default Hero;
