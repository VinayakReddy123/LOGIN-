import './App.css';
import Header from './components/Header';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { Welcome } from './components/Welcome';
import {Routes,Route } from 'react-router-dom';
function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/user' element={<Welcome />} />
      </Routes>
    </>
  );
}

export default App;
