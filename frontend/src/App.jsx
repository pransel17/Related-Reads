import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/auth/login/LoginPage';
// ROUTESS HEREE


function App (){

  return(
    <div>
      <Routes>
        <Route path='/login' element={<LoginPage/>}/>



      </Routes>
    </div>
  )
}

export default App;