import './App.css';
import {Route, Routes, Link} from "react-router-dom"
import { useState } from 'react';
import Cookies from 'js-cookie';
import Get from './Get';
import Create from './Create';
import GetAll from './GetAll';
import Login from './Login';

function App() {
  
  const [isLoggedIn, setLoggedIn] = useState(Cookies.get('token'));
  console.log("isLoggedIn ", isLoggedIn);

  const setToken = (token) => {
    console.log("setToken", token);
    Cookies.set('token', token);
    setLoggedIn(true)
  }

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<GetAll/>}/>
        <Route path="/create" element={<Create/>}/>
        <Route path="/get" element={<Get/>}/>
        <Route path="/login" element={<Login setToken={setToken}/>}/>
      </Routes>
      { isLoggedIn &&
        <Link to="/create">Create</Link>
      }
      <br/>
      <Link to="/get">Get</Link><br/>
      <Link to="/">Home</Link><br/>
      <Link to="/login">Login</Link><br/>
    </div>
  );
}

export default App;
