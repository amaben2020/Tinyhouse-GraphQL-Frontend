import './App.css';
import Listings from './components/Listings/Listings';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
const client = new ApolloClient({
  uri: '/api',
});

function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <Listings title="Tinyhouse Course" />
      </ApolloProvider>
    </div>
  );
}

export default App;
