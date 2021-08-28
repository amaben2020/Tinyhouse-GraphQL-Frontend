import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { NotFound, Listing, Listings, Home, User } from './sections';
const client = new ApolloClient({
  uri: '/api',
});

function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/listing/:id" component={Listing} />
            <Route exact path="/listings/:location?" component={Listings} />
            <Route exact path="/user" component={User} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </ApolloProvider>
    </div>
  );
}

export default App;
