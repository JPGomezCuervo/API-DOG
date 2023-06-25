import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import DetailCard from './components/DetailCard/DetailCard';
import FormBeta from './components/Form/FormBeta';
import LandingPage from './components/LandingPage/LandingPage';
import Footer from './components/Footer/Footer';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/homepage' element={<HomePage />} />
        <Route path='/detail/:id' element={<DetailCard />} />
        <Route path= '/form' element={<FormBeta/>} />
        <Route path='/' element={<LandingPage/>} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
