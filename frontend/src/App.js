import './App.css';
import { BrowserRouter , Routes , Route} from 'react-router-dom'
import React , {useState , useEffect} from 'react'
import Register from './pages/Register';
import Login from './pages/Login';
import WeddingRegister from './pages/WeddingRegister';
import WeddingList from './pages/WeddingList';
import { UserProvider } from './Context/UserContext';
import Navbar from './components/Navbar';
import WeddingDetail from './pages/WeddingDetail';
import Home from './pages/Home';
import ContactUs from './pages/ContactUs';
import AboutUs from './pages/AboutUs';
import Footer from './components/Footer';

function App() {

  return (
    
      <BrowserRouter>
      <UserProvider>
      <Navbar/>
        <Routes>
          <Route path='/' Component={Home}></Route>
          <Route path='/about-us' Component={AboutUs}></Route>
          <Route path='/contact-us' Component={ContactUs}></Route>
          <Route path='/' Component={Home}></Route>
          <Route path='/login' Component={Login}></Route>
          <Route path='/register' Component={Register}></Route>
          <Route path='/register-wedding' Component={WeddingRegister}></Route>
          <Route path='/weddings' Component={WeddingList}></Route>
          <Route path='/wedding/:id' Component={WeddingDetail}></Route>
        </Routes>
      <Footer/>
        </UserProvider>
      </BrowserRouter>
  );
}

export default App;
