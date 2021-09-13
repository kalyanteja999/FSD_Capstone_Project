import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default class UserProductDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            product: {}
        }
    }

    componentDidMount() {
        console.log(this.props.match.params.id);
        axios.get('http://localhost:8083/api/product/' + this.props.match.params.id)
            .then(result => {
                this.setState({ product: result.data });
                console.log(this.state.product);
            })
            .catch(error => {
                console.log('There is some error : ' + error);
            })
    }

    deleteProduct(id) {
        axios.delete('http://localhost:8083/api/product/delete/' + id, {headers: {'Access-Control-Allow-Origin': '*'}})
            .then(result => {
                console.log(result);
                console.log('Product Deleted Successfully..!!');
                this.props.history.push('/product');
            })
            .catch(error => {
                console.log('There is some error : ' + error);
            })
    }

    render() {
        return (
            <div>
                <div className="card">
                    <div className="card-header">
                        <b>Detials of Product :</b> &nbsp;{this.state.product.product_name}
                    </div>
                    <div className="card-body">
                        <table className="table">
                            <tbody>
                                <tr>
                                    <th>Product Name</th>
                                    <td>{this.state.product.product_name}</td>
                                </tr>
                                <tr>
                                    <th>Available Quantity</th>
                                    <td>{this.state.product.available_quantity}</td>
                                </tr>
                                <tr>
                                    <th>Product Price</th>
                                    <td>Rs. {this.state.product.product_price}/-</td>
                                </tr>
                                <tr>
                                    <th>Product Image</th>
                                    <td><img src={this.state.product.product_image} alt = {this.state.product.product_name} width="150" height="100"/></td>
                                </tr>
                                <tr>
                                    <th>product Description</th>
                                    <td>{this.state.product.product_description}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="card-footer text-muted">
                        <Link to={'/final-home/'} className='btn btn-info'>Home</Link>
                    </div>
                </div>

            </div>
        )
    }
}