import React, { useState } from 'react'
import './App.css';
import { BrowserRouter , Routes , Route} from 'react-router-dom'
import { UserProvider } from './Context/UserContext';
import WeddingList from './pages/WeddingList';
import Navbar from './components/Navbar';
import WeddingDetail from './pages/WeddingDetail';
import Home from './pages/Home';
import ContactUs from './pages/ContactUs';
import AboutUs from './pages/AboutUs';
import Footer from './components/Footer';

function App() {
  const [activeTab, setActiveTab] = useState('');

  return (
    <BrowserRouter>
      <UserProvider>
        <Navbar activeTab={activeTab} />
        <Routes>
          <Route path='/' element={<Home setActiveTab={setActiveTab} />} />
          <Route path='/about-us' element={<AboutUs setActiveTab={setActiveTab} />} />
          <Route path='/contact-us' element={<ContactUs setActiveTab={setActiveTab} />} />
          <Route path='/weddings' element={<WeddingList setActiveTab={setActiveTab} />} />
          <Route path='/wedding/:id' element={<WeddingDetail />} />
        </Routes>
        <Footer />
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
