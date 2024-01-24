import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import PositionAdd from './pages/PositionAdd';
import Topbar from './components/Topbar';
import Dashboard from './pages/Dashboard';
import Positions from './pages/Positions';
import Candidates from './pages/Candidates';
import CriteriaCompare from './pages/CriteriaCompare';
import CompareCandidates from './pages/CompareCandidates';
import CompareCandidate from './pages/CompareCandidate';
import Candidate from './pages/Candidate';

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <Topbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/positions" element={<Positions />} />
            <Route path="/candidates" element={<Candidates />} />
            <Route path="/candidate/:id" element={<Candidate />} />
            <Route path="/position-add" element={<PositionAdd />} />
            <Route path="/compare-candidates/" element={<CompareCandidates />} />
            <Route path="/compare-candidate/:id" element={<CompareCandidate />} />
            <Route path="/compare-criteria/:id" element={<CriteriaCompare />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
