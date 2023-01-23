import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Catalog from './pages/Catalog';
import ErrorPage from './pages/ErrorPage';
import { useState } from 'react';
import Login from './pages/login';
import { localStorageKeys, roles } from './constants';
import Navbar from './components/Navbar';
import Profile from './pages/Profile';
import Schedule from './pages/Schedule';
import CreateAccount from './pages/CreateAccount';

function App() {
  const [loggedIn, setLoggedIn] = useState<Boolean>(!!localStorage.getItem(localStorageKeys.role))
  return (
    <BrowserRouter>
      <Routes>
        {loggedIn ? (
          <>
            <Route path="/" element={<Navbar setLoggedIn={setLoggedIn}/>} >
              <Route path="profile" element={<Profile />} />
              <Route path="catalog" element={<Catalog />} >
                <Route path=":discipline" element={<Catalog />} />
              </Route>
              <Route path="schedule" element={<Schedule />} />
              {localStorage.getItem(localStorageKeys.role) && localStorage.getItem(localStorageKeys.role) != roles.student &&
                <Route path="create" element={<CreateAccount />} />
              }
              <Route path="*" element={<ErrorPage />} />
            </Route>
          </>
        ) : (
          <>
            <Route path="/" element={<Login setLoggedIn={setLoggedIn} />} />
            <Route path="*" element={<Navigate to='/'/>} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App
