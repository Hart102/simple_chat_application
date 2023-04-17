import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle'
import { 
  BrowserRouter, 
  Route, 
  Routes
} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/UserAuthentication/Login';
import Signup from './pages/UserAuthentication/Signup';
import ChatApp from './pages/ChatApp/ChatApp';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/chat/authenticate' element={<Login />} />
        <Route path='/chat/signup' element={<Signup />} />
        <Route path='/chat/room' element={<ChatApp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
