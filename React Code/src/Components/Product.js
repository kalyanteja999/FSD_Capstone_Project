import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../repository";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

export default class Product extends Component {

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

    render() {
        if (!isAuthenticated())
            return (<Redirect to='/login' />)
        return (
            <div>
                <Link to='/product-add' className='btn btn-secondary'>Add New Product</Link>
                <br /><br />
                <h2>Product List</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Product ID</th>
                            <th>Product Name</th>
                            <th>Available Quantity</th>
                            <th>Product Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.product.map((prd, index) => {
                            return (
                                <tr key={index}>
                                    <td>{prd.id}</td>
                                    <td>{prd.product_name}</td>
                                    <td>{prd.available_quantity}</td>
                                    <td>Rs. {prd.product_price}/-</td>
                                    <td>
                                        <Link to={'/product-details/' + prd.id} className='btn btn-secondary'>View Details</Link>
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