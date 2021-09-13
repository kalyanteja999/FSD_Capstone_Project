import React, { Component } from "react";
import axios from "axios";

export default class ProductUpdate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            product: {},
            product_name: null,
            available_quantity: null,
            product_price: null,
            product_image: null,
            product_description: null
        };
    }

    componentDidMount() {
        axios.get('http://localhost:8083/api/product/' + this.props.match.params.id)
            .then(result => {
                this.setState({
                    product: result.data,
                    product_name: result.data.product_name,
                    available_quantity: result.data.available_quantity,
                    product_price: result.data.product_price,
                    product_image: result.data.product_image,
                    product_description: result.data.product_description
                });
                console.log(this.state.product);
            })
            .catch(error => {
                console.log('There is some error : ' + error);
            })
    }

    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const product = {
            product_name: this.state.product.product_name,
            available_quantity: this.state.available_quantity,
            product_price: this.state.product_price,
            product_image: this.state.product_image,
            product_description: this.state.product_description
        }
        console.log('http://localhost:8083/api/product/updateProduct/' + this.props.match.params.id, product);
        axios.put('http://localhost:8083/api/product/updateProduct/' + this.props.match.params.id, product)
            .then(result => {
                console.log('New Update Product Values: '+result);
                console.log('Product Values Updated Successfully..!!');
                this.props.history.push('/product');
            })
            .catch(error => {
                console.log('There is some error : ' + error);
            })
    }


    render() {
        return (
            <div>
                <h2>Product Update</h2> <br />
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <b>Product Name: </b>
                        <input type="text"
                            className="form-control"
                            name="product_name"
                            placeholder="Enter Product Name:"
                            value={this.state.product_name}
                            onChange={this.handleChange} />
                    </div> <br />

                    <div className="form-group">
                    <b>Available Quantity: </b>
                        <input type="text"
                            className="form-control"
                            name="available_quantity"
                            placeholder="Enter Available Quantity:"
                            value={this.state.available_quantity}
                            onChange={this.handleChange} />
                    </div> <br />

                    <div className="form-group">
                    <b>Product Price: </b>
                        <input type="text"
                            className="form-control"
                            name="product_price"
                            placeholder="Enter Product Price:"
                            value={this.state.product_price}
                            onChange={this.handleChange} />
                    </div> <br />

                    <div className="form-group">
                    <b>Product Image: </b>
                        <input type="text"
                            className="form-control"
                            name="product_image"
                            placeholder="Enter Product Image:"
                            value={this.state.product_image}
                            onChange={this.handleChange} />
                    </div> <br />

                    <div className="form-group">
                    <b>Product Description: </b>
                        <input type="text"
                            className="form-control"
                            name="product_description"
                            placeholder="Enter Product Description:"
                            value={this.state.product_description}
                            onChange={this.handleChange} />
                    </div> <br />

                    <input type="submit" className="btn btn-secondary" value="Update Product" /> &nbsp; | &nbsp;
                    <input type="reset" className="btn btn-secondary" value="Clear Fields" />
                </form>
            </div>
        )
    }
}