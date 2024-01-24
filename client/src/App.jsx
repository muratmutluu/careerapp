import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Basvuru from './pages/Basvuru';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
      
        <Route path="/" element={<Home />} />
        <Route path="/basvuru/:id" element={<Basvuru />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
