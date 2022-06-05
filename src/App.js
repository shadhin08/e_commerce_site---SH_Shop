import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import Error from './components/Error/Error';
import Shipment from './components/Shipment/Shipment';
import Login from './components/Login/Login';
import ProductDetail from './components/ProductDetail/ProductDetail';
import { createContext } from 'react';
import { useState } from 'react/cjs/react.development';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const userContext=createContext();
function App() {
  const [loggdInUser, setLoggedInUser]=useState({});
  return (
    <userContext.Provider value={[loggdInUser, setLoggedInUser]}>
      <div className="body">
        <h3>Email: {loggdInUser.email}</h3>
        <Header></Header>
        <Router>
          <Switch>
            <Route exact path="/">
              <Shop></Shop>
            </Route>
            <Route path="/shop">
              <Shop></Shop>
            </Route>
            <Route path="/order">
              <Review></Review>
            </Route>
            <Route path="/inventory">
              <Inventory></Inventory>
            </Route>
            <Route path="/product/:key">
              <ProductDetail></ProductDetail>
            </Route>
            
            <PrivateRoute path="/shipment">
              <Shipment></Shipment>
            </PrivateRoute>
            <Route path="/login">
              <Login></Login>
            </Route>
            <Route path="*">
              <Error></Error>
            </Route>
          </Switch>
        </Router>
      </div>
    </userContext.Provider>
  );
}

export default App;
