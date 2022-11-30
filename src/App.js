import './App.css';
import NavBar from './component/NavBar';
import Home from './component/Home';
import About from './component/About';
import Login from './component/Login';
import Signup from './component/Signup';
import NoteState from './context/notes/NoteState';
import Alert from './component/Alert';
import { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert(
      {
        msg: message,
        type: type
      },
      setTimeout(() => {
        showAlert(null);
      }, 2000
      )
    )
  }
  return (
    <>
      <NoteState>
        <Router>
          <NavBar />
          <Alert alert={alert} />
          <div className='container'>
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert} />} />
              <Route exact path='/about' element={<About />} />
              <Route exact path='/Login' element={<Login showAlert={showAlert} />} />
              <Route exact path='/Signup' element={<Signup showAlert={showAlert} />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
