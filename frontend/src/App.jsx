import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/auth/login/LoginPage';
import SignUpPage from './pages/auth/signup/SignUpPage';
import TopNavbar from './components/common/TopNavbar';
import HomePage from './pages/home/HomePage';
// ROUTESS HEREE


function App (){

  return(
    <div>
      <Routes>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/signup' element={<SignUpPage/>}/>
        <Route path='/profile' element={<TopNavbar/>}/>
        <Route path='/home' element={<HomePage/>}/>






      </Routes>
    </div>
  )
}

export default App;