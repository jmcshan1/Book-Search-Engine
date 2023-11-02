import './App.css';
import { Outlet } from 'react-router-dom';
// Import apolloclient, provider components
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import Navbar from './components/Navbar';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});


function App() {
  return (
    <ApolloClient client = {client}>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
