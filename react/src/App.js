import logo from './logo.svg';
import './App.css';
import {Route, Routes, Link} from "react-router-dom"
import Get from './Get';
import Create from './Create';
import GetAll from './GetAll';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<GetAll/>}/>
        <Route path="/create" element={<Create/>}/>
        <Route path="/get" element={<Get/>}/>
      </Routes>
      <Link to="/create">Create</Link><br/>
      <Link to="/get">Get</Link><br/>
      <Link to="/">Home</Link><br/>
    </div>
  );
}

export default App;
