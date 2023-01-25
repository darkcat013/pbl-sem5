import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Catalog from './pages/Catalog';
import ErrorPage from './pages/ErrorPage';
import { useEffect, useState } from 'react';
import { roles } from './constants';
import Navbar from './components/Navbar';
import Profile from './pages/Profile';
import Schedule from './pages/Schedule';
import CreateAccount from './pages/CreateAccount';
import Login from './pages/Login';
import { hasRefreshToken, refreshTokenExpired } from './utils/tokens';
import { userInRole } from './utils/user';
import TwoFactor from './pages/TwoFactor';
import { useAuthStore } from './contexts/AuthContex';
import { Observer } from 'mobx-react';
import { AxiosInterceptor } from './contexts/AxiosInterceptor';
import { UserProvider } from './contexts/UserContext';
import Schools from './pages/Schools';
import CreateSchool from './pages/CreateSchool';

function App() {
  const authStore = useAuthStore();
  useEffect(() => {
    authStore.setLoggedIn(hasRefreshToken() && !refreshTokenExpired())

  }, [])
  const [in2fa, set2fa] = useState<Boolean>(false)

  return (
    <Observer>
      {() =>
        <BrowserRouter>
          <Routes>
            {authStore.loggedIn ? (
              <Route path="/" element={
                <AxiosInterceptor>
                  <UserProvider>
                    <Navbar />
                  </UserProvider>
                </AxiosInterceptor>
              } >

                {userInRole(roles.admin) ?
                  <>
                    <Route path="schools" element={<Schools />} />
                    <Route path="create-school" element={<CreateSchool />}/>
                    <Route path="create" element={<CreateAccount />} />
                    <Route index element={<Navigate to='schools' />} />
                  </>
                  :
                  <>
                    <Route path="profile" element={<Profile />} />
                    <Route path="catalog" element={<Catalog />} >
                      <Route path=":discipline" element={<Catalog />} />
                    </Route>
                    <Route path="schedule" element={<Schedule />} />
                    {!userInRole(roles.student) &&
                      <Route path="create" element={<CreateAccount />} />
                    }
                    <Route index element={<Navigate to='profile' />} />
                  </>
                }
                <Route path="*" element={<ErrorPage />} />
              </Route>
            ) : (
              <>
                {in2fa && <Route path="/2fa" element={<TwoFactor />} />}
                <Route path="/" element={<Login set2fa={set2fa} />} />
                <Route path="*" element={<Navigate to='/' />} />
              </>
            )}
          </Routes>
        </BrowserRouter>
      }
    </Observer>
  );
}

export default App
