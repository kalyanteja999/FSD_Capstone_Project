import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

export default class CheckOut extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cart: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8083/api/cart/')
            .then(result => {
                console.log(result);
                this.setState({ cart: result.data })
            })
            .catch(error => {
                console.log(error);
            })
    }

    handleSubmit = (event) => {
        this.props.history.push('/invoice');
    }

    render() {
        return(
            <div className="maincontainer">
            <div class="container">
               <div class="py-5 text-center">
                 <h2>Checkout form</h2>
               </div>
               <div class="row">
                 <div class="col-md-4 order-md-2 mb-4">
                   <h4 class="d-flex justify-content-between align-items-center mb-3">
                     <span class="text-muted">Your cart</span>
                     <span class="badge badge-secondary badge-pill">3</span>
                   </h4>

                   
                   <ul class="list-group mb-3">

                   {this.state.cart.map((crt, index) => {
                       return(
                            <div key={index}>
                            <li class="list-group-item d-flex justify-content-between lh-condensed">
                            <div>
                            <h6 class="my-0">{crt.product_name}</h6>
                            
                            </div>
                            <span class="text-muted">Rs. {crt.amount}/-</span>
                            </li>
                        </div> 
                       );
                    })}
                     <li class="list-group-item d-flex justify-content-between">
                       <span>Total (IND)</span>
                       <strong>Rs. 1070/-</strong>
                     </li>
                   </ul>
                    
                   <form class="card p-2">
                     <div class="input-group">
                       <input type="text" class="form-control" placeholder="Promo code"/>
                       <div class="input-group-append">
                         <button type="button" class="btn btn-secondary">Redeem</button>
                       </div>
                     </div>
                   </form>
                 </div>
                 <div class="col-md-8 order-md-1">
                   <h4 class="mb-3">Billing address</h4>
                   <form class="needs-validation" novalidate>
                     <div class="row">
                       <div class="col-md-6 mb-3">
                         <label for="firstName">First name</label>
                         <input type="text" class="form-control" id="firstName" placeholder="" value=""  />
                         <div class="invalid-feedback">
                           Valid first name is required.
                         </div>
                       </div>
                       <div class="col-md-6 mb-3">
                         <label for="lastName">Last name</label>
                         <input type="text" class="form-control" id="lastName" placeholder="" value=""  />
                         <div class="invalid-feedback">
                           Valid last name is required.
                         </div>
                       </div>
                     </div>
                     <div class="mb-3">
                       <label for="username">Username</label>
                       <div class="input-group">
                         <div class="input-group-prepend">
                           <span class="input-group-text">@</span>
                         </div>
                         <input type="text" class="form-control" id="username" placeholder="Username"  />
                         <div class="invalid-feedback">
                           Your username is required.
                         </div>
                       </div>
                     </div>
                     <div class="mb-3">
                       <label for="email">Email <span class="text-muted">(Optional)</span></label>
                       <input type="email" class="form-control" id="email" placeholder="you@example.com" />
                       <div class="invalid-feedback">
                         Please enter a valid email address for shipping updates.
                       </div>
                     </div>
                     <div class="mb-3">
                       <label for="address">Address</label>
                       <input type="text" class="form-control" id="address" placeholder="1234 Main St"  />
                       <div class="invalid-feedback">
                         Please enter your shipping address.
                       </div>
                     </div>
                     <div class="mb-3">
                       <label for="address2">Address 2 <span class="text-muted">(Optional)</span></label>
                       <input type="text" class="form-control" id="address2" placeholder="Apartment or suite" />
                     </div>
                     <div class="row">
                       <div class="col-md-5 mb-3">
                         <label for="country">Country</label>
                         <select class="custom-select d-block w-100" id="country" >
                           <option value="">Choose...</option>
                           <option>United States</option>
                         </select>
                         <div class="invalid-feedback">
                           Please select a valid country.
                         </div>
                       </div>
                       <div class="col-md-4 mb-3">
                         <label for="state">State</label>
                         <select class="custom-select d-block w-100" id="state" >
                           <option value="">Choose...</option>
                           <option>California</option>
                         </select>
                         <div class="invalid-feedback">
                           Please provide a valid state.
                         </div>
                       </div>
                       <div class="col-md-3 mb-3">
                         <label for="zip">Zip</label>
                         <input type="text" class="form-control" id="zip" placeholder=""  />
                         <div class="invalid-feedback">
                           Zip code required.
                         </div>
                       </div>
                     </div>
                     <hr class="mb-4" />
                     <div class="custom-control custom-checkbox">
                       <input type="checkbox" class="custom-control-input" id="same-address" />
                       <label class="custom-control-label" for="same-address">Shipping address is the same as my billing address</label>
                     </div>
                     <div class="custom-control custom-checkbox">
                       <input type="checkbox" class="custom-control-input" id="save-info" />
                       <label class="custom-control-label" for="save-info">Save this information for next time</label>
                     </div>
                     <hr class="mb-4" />
                     <h4 class="mb-3">Payment</h4>
                     <div class="d-block my-3">
                       <div class="custom-control custom-radio">
                         <input id="credit" name="paymentMethod" type="radio" class="custom-control-input" checked  />
                         <label class="custom-control-label" for="credit">Credit card</label>
                       </div>
                       <div class="custom-control custom-radio">
                         <input id="debit" name="paymentMethod" type="radio" class="custom-control-input"  />
                         <label class="custom-control-label" for="debit">Debit card</label>
                       </div>
                       <div class="custom-control custom-radio">
                         <input id="paypal" name="paymentMethod" type="radio" class="custom-control-input"  />
                         <label class="custom-control-label" for="paypal">Paypal</label>
                       </div>
                     </div>
                     <div class="row">
                       <div class="col-md-6 mb-3">
                         <label for="cc-name">Name on card</label>
                         <input type="text" class="form-control" id="cc-name" placeholder=""  />
                         <small class="text-muted">Full name as displayed on card</small>
                         <div class="invalid-feedback">
                           Name on card is required
                         </div>
                       </div>
                       <div class="col-md-6 mb-3">
                         <label for="cc-number">Credit card number</label>
                         <input type="text" class="form-control" id="cc-number" placeholder=""  />
                         <div class="invalid-feedback">
                           Credit card number is required
                         </div>
                       </div>
                     </div>
                     <div class="row">
                       <div class="col-md-3 mb-3">
                         <label for="cc-expiration">Expiration</label>
                         <input type="text" class="form-control" id="cc-expiration" placeholder=""  />
                         <div class="invalid-feedback">
                           Expiration date required
                         </div>
                       </div>
                       <div class="col-md-3 mb-3">
                         <label for="cc-expiration">CVV</label>
                         <input type="text" class="form-control" id="cc-cvv" placeholder=""  />
                         <div class="invalid-feedback">
                           Security code required
                         </div>
                       </div>
                     </div>
                     <hr class="mb-4" />
                     <button class="btn btn-primary btn-lg btn-block" type="submit">Continue to checkout</button>
                   </form>
                 </div>
               </div>
               <footer class="my-5 pt-5 text-muted text-center text-small">
                 <p class="mb-1">&copy; 2020-2021 therichpost.com</p>
                 <ul class="list-inline">
                   <li class="list-inline-item"><a href="#">Privacy</a></li>
                   <li class="list-inline-item"><a href="#">Terms</a></li>
                   <li class="list-inline-item"><a href="#">Support</a></li>
                 </ul>
               </footer>
             </div>
          
           </div>
        );
    }
}






//----------------------------------------------------------------------

// import React, { Component } from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import axios from "axios";

// export default class CheckOut extends Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             cart: []
//         }
//     }

//     componentDidMount() {
//         axios.get('http://localhost:8083/api/cart/')
//             .then(result => {
//                 console.log(result);
//                 this.setState({ cart: result.data })
//             })
//             .catch(error => {
//                 console.log(error);
//             })
//     }

//     handleSubmit = (event) => {
//         this.props.history.push('/invoice');
//     }

//     render() {
//         return(
//             <div className="maincontainer">
//             <div class="container">
//                <div class="py-5 text-center">
//                  <h2>Checkout form</h2>
//                </div>
//                <div class="row">
//                  <div class="col-md-4 order-md-2 mb-4">
//                    <h4 class="d-flex justify-content-between align-items-center mb-3">
//                      <span class="text-muted">Your cart</span>
//                      <span class="badge badge-secondary badge-pill">3</span>
//                    </h4>

                   
//                    <ul class="list-group mb-3">

//                    {this.state.cart.map((crt, index) => {
//                        return(
//                             <div key={index}>
//                             <li class="list-group-item d-flex justify-content-between lh-condensed">
//                             <div>
//                             <h6 class="my-0">{crt.product_name}</h6>
                            
//                             </div>
//                             <span class="text-muted">Rs. {crt.amount}/-</span>
//                             </li>
//                         </div> 
//                        );
//                     })}
//                      <li class="list-group-item d-flex justify-content-between">
//                        <span>Total (IND)</span>
//                        <strong>Rs. 1070/-</strong>
//                      </li>
//                    </ul>
                    
//                    <form class="card p-2">
//                      <div class="input-group">
//                        <input type="text" class="form-control" placeholder="Promo code"/>
//                        <div class="input-group-append">
//                          <button type="button" class="btn btn-secondary">Redeem</button>
//                        </div>
//                      </div>
//                    </form>
//                  </div>
//                  <div class="col-md-8 order-md-1">
//                    <h4 class="mb-3">Billing address</h4>
//                    <form class="needs-validation" novalidate>
//                      <div class="row">
//                        <div class="col-md-6 mb-3">
//                          <label for="firstName">First name</label>
//                          <input type="text" class="form-control" id="firstName" placeholder="" value="" required />
//                          <div class="invalid-feedback">
//                            Valid first name is required.
//                          </div>
//                        </div>
//                        <div class="col-md-6 mb-3">
//                          <label for="lastName">Last name</label>
//                          <input type="text" class="form-control" id="lastName" placeholder="" value="" required />
//                          <div class="invalid-feedback">
//                            Valid last name is required.
//                          </div>
//                        </div>
//                      </div>
//                      <div class="mb-3">
//                        <label for="username">Username</label>
//                        <div class="input-group">
//                          <div class="input-group-prepend">
//                            <span class="input-group-text">@</span>
//                          </div>
//                          <input type="text" class="form-control" id="username" placeholder="Username" required />
//                          <div class="invalid-feedback">
//                            Your username is required.
//                          </div>
//                        </div>
//                      </div>
//                      <div class="mb-3">
//                        <label for="email">Email <span class="text-muted">(Optional)</span></label>
//                        <input type="email" class="form-control" id="email" placeholder="you@example.com" />
//                        <div class="invalid-feedback">
//                          Please enter a valid email address for shipping updates.
//                        </div>
//                      </div>
//                      <div class="mb-3">
//                        <label for="address">Address</label>
//                        <input type="text" class="form-control" id="address" placeholder="1234 Main St" required />
//                        <div class="invalid-feedback">
//                          Please enter your shipping address.
//                        </div>
//                      </div>
//                      <div class="mb-3">
//                        <label for="address2">Address 2 <span class="text-muted">(Optional)</span></label>
//                        <input type="text" class="form-control" id="address2" placeholder="Apartment or suite" />
//                      </div>
//                      <div class="row">
//                        <div class="col-md-5 mb-3">
//                          <label for="country">Country</label>
//                          <select class="custom-select d-block w-100" id="country" required>
//                            <option value="">Choose...</option>
//                            <option>United States</option>
//                          </select>
//                          <div class="invalid-feedback">
//                            Please select a valid country.
//                          </div>
//                        </div>
//                        <div class="col-md-4 mb-3">
//                          <label for="state">State</label>
//                          <select class="custom-select d-block w-100" id="state" required>
//                            <option value="">Choose...</option>
//                            <option>California</option>
//                          </select>
//                          <div class="invalid-feedback">
//                            Please provide a valid state.
//                          </div>
//                        </div>
//                        <div class="col-md-3 mb-3">
//                          <label for="zip">Zip</label>
//                          <input type="text" class="form-control" id="zip" placeholder="" required />
//                          <div class="invalid-feedback">
//                            Zip code required.
//                          </div>
//                        </div>
//                      </div>
//                      <hr class="mb-4" />
//                      <div class="custom-control custom-checkbox">
//                        <input type="checkbox" class="custom-control-input" id="same-address" />
//                        <label class="custom-control-label" for="same-address">Shipping address is the same as my billing address</label>
//                      </div>
//                      <div class="custom-control custom-checkbox">
//                        <input type="checkbox" class="custom-control-input" id="save-info" />
//                        <label class="custom-control-label" for="save-info">Save this information for next time</label>
//                      </div>
//                      <hr class="mb-4" />
//                      <h4 class="mb-3">Payment</h4>
//                      <div class="d-block my-3">
//                        <div class="custom-control custom-radio">
//                          <input id="credit" name="paymentMethod" type="radio" class="custom-control-input" checked required />
//                          <label class="custom-control-label" for="credit">Credit card</label>
//                        </div>
//                        <div class="custom-control custom-radio">
//                          <input id="debit" name="paymentMethod" type="radio" class="custom-control-input" required />
//                          <label class="custom-control-label" for="debit">Debit card</label>
//                        </div>
//                        <div class="custom-control custom-radio">
//                          <input id="paypal" name="paymentMethod" type="radio" class="custom-control-input" required />
//                          <label class="custom-control-label" for="paypal">Paypal</label>
//                        </div>
//                      </div>
//                      <div class="row">
//                        <div class="col-md-6 mb-3">
//                          <label for="cc-name">Name on card</label>
//                          <input type="text" class="form-control" id="cc-name" placeholder="" required />
//                          <small class="text-muted">Full name as displayed on card</small>
//                          <div class="invalid-feedback">
//                            Name on card is required
//                          </div>
//                        </div>
//                        <div class="col-md-6 mb-3">
//                          <label for="cc-number">Credit card number</label>
//                          <input type="text" class="form-control" id="cc-number" placeholder="" required />
//                          <div class="invalid-feedback">
//                            Credit card number is required
//                          </div>
//                        </div>
//                      </div>
//                      <div class="row">
//                        <div class="col-md-3 mb-3">
//                          <label for="cc-expiration">Expiration</label>
//                          <input type="text" class="form-control" id="cc-expiration" placeholder="" required />
//                          <div class="invalid-feedback">
//                            Expiration date required
//                          </div>
//                        </div>
//                        <div class="col-md-3 mb-3">
//                          <label for="cc-expiration">CVV</label>
//                          <input type="text" class="form-control" id="cc-cvv" placeholder="" required />
//                          <div class="invalid-feedback">
//                            Security code required
//                          </div>
//                        </div>
//                      </div>
//                      <hr class="mb-4" />
//                      <button class="btn btn-primary btn-lg btn-block" type="submit">Continue to checkout</button>
//                    </form>
//                  </div>
//                </div>
//                <footer class="my-5 pt-5 text-muted text-center text-small">
//                  <p class="mb-1">&copy; 2020-2021 therichpost.com</p>
//                  <ul class="list-inline">
//                    <li class="list-inline-item"><a href="#">Privacy</a></li>
//                    <li class="list-inline-item"><a href="#">Terms</a></li>
//                    <li class="list-inline-item"><a href="#">Support</a></li>
//                  </ul>
//                </footer>
//              </div>
          
//            </div>
//         );
//     }
// }