import logo from './logo.svg';
import './App.css';
import {Route, Routes, Link} from "react-router-dom"
import {ApolloClient, HttpLink, InMemoryCache} from 'apollo-boost'
import Get from './Get';
import Create from './Create';
import GetAll from './GetAll';

const endpointGraphQL = "http://172.31.223.23:80/graphql";

const client = new ApolloClient({
  link: new HttpLink({uri: endpointGraphQL}),
  cache: new InMemoryCache()
});

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<GetAll apolloClient={client}/>}/>
        <Route path="/create" element={<Create/>}/>
        <Route path="/get" element={<Get apolloClient={client}/>}/>
      </Routes>
      <Link to="/create">Create</Link><br/>
      <Link to="/get">Get</Link><br/>
      <Link to="/">Home</Link><br/>
    </div>
  );
}

export default App;
