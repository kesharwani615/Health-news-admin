import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Login from './pages/Login/Login';
import Header from './common/Header/Header';
import Sidenavbar from './common/Sidenav/Sidenavbar';
import ForgotPassword from './pages/Forgot or Resset Password/ForgotPassword';
import ResetPassword from './pages/Forgot or Resset Password/ResetPassword';
import { routes } from './routers/router';
import Protected from './common/Protected/Protected';
import ForgetPasswordOutlet from './pages/Forgot or Resset Password/ForgetPasswordOutlet';

function App() {
  const location = useLocation();
  const currentPath = location.pathname;
  const CurrentRoute = currentPath.split('/').splice(1);
  
  const isRestrictedRoute = CurrentRoute.some((item,index)=>{

    return ['login', 'forgotPassword', 'ResetPassword'].includes(item)

  })
  
  const token = JSON.parse(localStorage.getItem('token')) || false;

  return (
    <>
      {!isRestrictedRoute && (
        <>
          <Header />
          <Sidenavbar />
        </>
      )}
      <Routes>

        <Route path='/login' element={token ?<Navigate to={'/'}/>:<Login />} /> 
        <Route path='/forgotPassword' element={token ?<Navigate to={'/'}/>:<ForgetPasswordOutlet />} >
          <Route index element={<ForgotPassword />} />
          <Route path='ResetPassword/:token' element={token ?<Navigate to={'/'}/>:<ResetPassword />} />
        </Route>

        {routes.map(({ path, element }, index) => (
        <Route key={index} path={path} element={
        <Protected>
          { element }
        </Protected>
        }/> 
      ))}
      </Routes>
    </>
  );
}

export default App;
