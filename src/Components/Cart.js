import React, { Component } from "react";
import axios from "axios";
import { isAuthenticated } from "../repository";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default class Cart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cart: [],
            cartTotalAmt: []
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
            axios.get('http://localhost:8083/api/cart-total/')
            .then(result => {
                console.log(result);
                this.setState({ cartTotalAmt: result.data })
                // console.log(cartTotalAmt.data);
            })
            .catch(error => {
                console.log(error);
            })
    }

    addToCart(id) {
        if(window.confirm('One Item Will Be Added To The Cart..?'))
        axios.post('http://localhost:8083/api/product/addToCart/' + id, {headers: {'Access-Control-Allow-Origin': '*'}})
            .then(result => {
                console.log(result);
                console.log('Add To Cart Is Successful..!!');
            })
            .catch(error => {
                console.log('There is some error : ' + error);
            })
    }

    RemoveFromCart(id) {
        if(window.confirm('One Item Will Be Removed From Cart..?'))
        axios.delete('http://localhost:8083/api/product/removeFromCart/' + id, {headers: {'Access-Control-Allow-Origin': '*'}})
            .then(result => {
                console.log(result);
                console.log('Delete From Cart Is Successful..!!');
            })
            .catch(error => {
                console.log('There is some error : ' + error);
            })
    }

    clearCart() {
        console.log('Came to Clear Cart...');
        if(window.confirm('Are you sure you want to Clear All Cart Items..?'))
        axios.delete('http://localhost:8083/api/cart/clear-cart/')
            .then(result => {
                console.log(result);
                console.log('All Cart Items Deleted Successfully..!!');
                this.props.history.push('/final-home');
            })
            .catch(error => {
                console.log('There is some error : ' + error);
            })
    }

    render() {
        if (!isAuthenticated())
            return (<Redirect to='/login' />)
        return (
            <div>
                <center><h2><i><u>Cart Items:</u></i></h2></center>                

                {this.state.cart.map((crt, index) => {
                    return (
                        <div key={index}>
                            <div><h4>Product Name: {crt.product_name}</h4></div>
                            <div><h5>Quantity: {crt.quantity}</h5>
                            <button onClick={this.RemoveFromCart.bind(this, crt.product_id)} className='btn btn-danger'> - </button>&nbsp;&nbsp;&nbsp;
                            <button onClick={this.addToCart.bind(this, crt.product_id)} className='btn btn-info'>+</button></div>
                            <div><h6>Product Price: Rs. {crt.amount}/-</h6></div>
                            <br/>
                        </div>
                    );
                }
                
                )}
                
                 {console.log('Cart Total Amt: '+this.state.cartTotalAmt.data)}
                
                {/* <div><h4>Total Amount: Rs. {this.state.cartTotal}/-</h4></div> */}
                <div><h4>Total Amount: Rs. 600/-</h4></div>
                
                <div className="card-footer text-muted">
                    <button onClick={this.clearCart.bind()} className='btn btn-danger'>Clear Cart</button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Link to='/checkout-form' className='btn btn-success'>Checkout</Link><br/><br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Link to={'/final-home/'} className='btn btn-success'>Continue Shopping</Link>
                </div>
            </div>
        );
    }

}