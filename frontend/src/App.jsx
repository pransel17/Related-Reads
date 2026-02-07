import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/auth/login/LoginPage';
import SignUpPage from './pages/auth/signup/SignUpPage';
import HomePage from './pages/home/HomePage';
import TopNavbar from './components/common/topnavbar';
import ProfilePage from './pages/profile/ProfilePage';


// ROUTESS HEREE


function App (){

  return(
    <div>
      <Routes>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/signup' element={<SignUpPage/>}/>
        <Route path='/profile/:UserName' element={<ProfilePage/>}/>
        <Route path='/home' element={<HomePage/>}/>






      </Routes>
    </div>
  )
}

export default App;