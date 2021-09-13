import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Contact from "./Components/Contact";
import Product from "./Components/Product";
import ProductDetails from "./Components/ProductDetails";
import ProductAdd from "./Components/ProductAdd";
import ProductUpdate from "./Components/ProductUpdate";
import Home from "./Components/Home";
import HomePage from "./Components/HomePage";
import Login from "./Components/Login";
import FinalHome from "./Components/FinalHome";
import Cart from "./Components/Cart";
import UserProductDetails from "./Components/UserProductDetails";
import CheckOut from "./Components/CheckOut";
import './Components/CheckOut';
import Invoice from "./Components/Invoice";
import { isAuthenticated } from "./repository";

export default class App extends Component {

  state = {
    loggedIn: false
  }

  loginHandle = () => {
    this.setState(prevState => ({
      loggedIn: !prevState.loggedIn
    }))
  }

  logout() {
    localStorage.removeItem('username');
  }

  render() {
    const auth = isAuthenticated();
    return (
      <div className="container">
        <Router>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to={'/'} className="navbar-brand">FoodBox</Link>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                {/* <li className="nav-item">
                  <Link to={'/home'} className="nav-link">Home</Link>
                </li> */}
                <li className="nav-item">
                  <Link to={'/final-home'} className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                  {auth ?
                  <Link to={'/cart'} className="nav-link">Cart</Link> : null}
                </li>
                <li className="nav-item">
                  {auth ?
                    <Link to={'/product'} className="nav-link">Manage Product</Link> : null}
                </li>
                <li className="nav-item">
                  <Link to={'/contact'} className="nav-link">Contact</Link>
                </li>
                <li className="nav-item">
                  {auth ?
                    <a onClick={this.logout} className="btn btn-secondary">Logout</a> :
                    <Link to={'/login'} className="btn btn-secondary">Login</Link>}
                </li>
              </ul>
            </div>
          </nav> <br />

          <div>
            <Route path='/' exact render={HomePage} />
            <Route path='/home' render={Home} />
            <Route path='/contact' render={Contact} />
            <Route path='/product' component={Product}/>
            <Route path='/product-details/:id' component={ProductDetails}/>
            <Route path='/product-add' component={ProductAdd}/>
            <Route path='/product-update/:id' component={ProductUpdate}/>
            <Route path='/login' component={Login} />
            <Route path='/final-home' component={FinalHome}/>
            <Route path='/cart' component={Cart}/>
            <Route path='/upd/:id' component={UserProductDetails}/>
            <Route path='/checkout-form' component={CheckOut}/>
            <Route path='/invoice' component={Invoice}/>
          </div>
        </Router>
      </div>
    );
  }
}
