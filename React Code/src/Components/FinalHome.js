import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class FinalHome extends Component {

    constructor(props) {
        super(props);
        this.state = {
            product: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8083/api/product/')
            .then(result => {
                console.log(result);
                this.setState({ product: result.data })
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

    render() {
        return (
            <div>
                <h2>Food Items List</h2>
                <table className="table table-hover">
                    <thead className="table-light">
                        <tr>
                            <th>Product Image</th>
                            <th>Product Name</th>
                            <th>Available Quantity</th>
                            <th>Product Price</th>
                            <th><center>Actions</center></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.product.map((prd, index) => {
                            return (
                                <tr key={index}>
                                    <td ><img src = {prd.product_image} alt = {prd.product_name} width="150" height="100"/></td>
                                    <td>{prd.product_name}</td>
                                    <td>&nbsp;{prd.available_quantity}</td>
                                    <td>Rs. {prd.product_price}/-</td>
                                    <td>
                                        <Link to={'/upd/' + prd.id} className='btn btn-info'>View Product Details</Link><br/><br/>
                                        <button onClick={this.RemoveFromCart.bind(this, prd.id)} className='btn btn-danger'>-</button>&nbsp;&nbsp;Add To Cart&nbsp;&nbsp;
                                        <button onClick={this.addToCart.bind(this, prd.id)} className='btn btn-warning'>+</button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}