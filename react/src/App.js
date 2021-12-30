import './App.css';
import {Route, Routes, Link} from "react-router-dom"
import {ApolloClient, ApolloLink, HttpLink, InMemoryCache} from 'apollo-boost'
import Cookies from 'js-cookie';
import { useState } from 'react';
import Get from './Get';
import Create from './Create';
import GetAll from './GetAll';
import Login from './Login';

const endpointGraphQL = "http://172.31.223.23:80/graphql";

const authLink = new ApolloLink((operation, forward) => {
  const login = Cookies.get('token');
  if(login){
    operation.setContext({
      headers: {
        'authorization': 'Bearer ' + login
      }
    })
  }
  return forward(operation);
});

const client = new ApolloClient({
  link: ApolloLink.from([
    authLink,
    new HttpLink({uri: endpointGraphQL})
  ]),
  cache: new InMemoryCache()
});

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
        <Route exact path="/" element={<GetAll apolloClient={client}/>}/>
        <Route path="/create" element={<Create apolloClient={client}/>}/>
        <Route path="/get" element={<Get apolloClient={client}/>}/>
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
