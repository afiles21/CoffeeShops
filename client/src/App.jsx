import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Dashboard from './views/Dashboard';
import AuthorizationPage from './views/AuthorizationPage';
import CreateCafe from './components/CreateCafe';
import ViewCafe from './components/ViewCafe';
import EditCafe from './components/EditCafe';


function App() {

  const [loggedUser, setLoggedUser] = useState(null);
  const [ allCafes, setAllCafes ] = useState([]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<AuthorizationPage setLoggedUser={setLoggedUser}/>} />
        <Route path={'/dashboard'} element={<Dashboard setLoggedUser={setLoggedUser} loggedUser={loggedUser} allCafes={allCafes} setAllCafes={setAllCafes}/>}/>
        <Route path={'/coffee/new'} element={<CreateCafe loggedUser={loggedUser} allCafes={allCafes} setAllCafes={setAllCafes}/>} />
        <Route path={'/coffee/view/:id'} element={<ViewCafe loggedUser={loggedUser}/>}/>
        <Route path={'/coffee/edit/:id'} element={<EditCafe loggedUser={loggedUser}/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
