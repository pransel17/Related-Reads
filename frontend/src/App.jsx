import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/auth/login/LoginPage';
import SignUpPage from './pages/auth/signup/SignUpPage';
import HomePage from './pages/home/HomePage';
import ProfilePage from './pages/profile/ProfilePage';
import BookPage from './pages/book/BookPage';


// ROUTESS HEREE


function App (){

  return(
    <div>
      <Routes>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/signup' element={<SignUpPage/>}/>
        <Route path='/profile/:UserName' element={<ProfilePage/>}/>
        <Route path='/home' element={<HomePage/>}/>
        <Route path='/book/:id' element={<BookPage/>}/>


      </Routes>
    </div>
  )
}

export default App;