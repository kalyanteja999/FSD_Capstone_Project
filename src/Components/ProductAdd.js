import React, { Component } from "react";
import axios from "axios";

export default class ProductAdd extends Component {

    constructor(props) {
        super(props);
        this.state = {
            product_name: null,
            available_quantity: null,
            product_price: null,
            product_image: null,
            product_description: null
        };
    }

    handleChange = (event) => {
        event.preventDefault();
        const {name, value} = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const product = {
            product_name: this.state.product_name,
            available_quantity: this.state.available_quantity,
            product_price: this.state.product_price,
            product_image: this.state.product_image,
            product_description: this.state.product_description
        }
        console.log(product);
        axios.post('http://localhost:8083/api/product/newProduct/', product)
            .then(result => {
                console.log(result);
                console.log('Product Added Successfully..!!');
                this.props.history.push('/product');
            })
            .catch(error => {
                console.log(error);
                console.log('There is some error..!!')
            })
    }

    render() {
        return(
            <div>
            <h2>Add New Product</h2><br/><br/>
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <input type="text" 
                    className="form-control" 
                    name="product_name" 
                    placeholder="Enter Product Name: "
                    onChange={this.handleChange} />
                </div> <br/>

                <div className="form-group">
                    <input type="text" 
                    className="form-control" 
                    name="available_quantity" 
                    placeholder="Enter Available Quantity: "
                    onChange={this.handleChange} />
                </div> <br/>

                <div className="form-group">
                    <input type="text" 
                    className="form-control" 
                    name="product_price" 
                    placeholder="Enter Product Price: "
                    onChange={this.handleChange} />
                </div> <br/>

                <div className="form-group">
                    <input type="text" 
                    className="form-control" 
                    name="product_image" 
                    placeholder="Enter Product Image: "
                    onChange={this.handleChange} />
                </div> <br/>

                <div className="form-group">
                    <input type="text" 
                    className="form-control" 
                    name="product_description" 
                    placeholder="Enter Product Description: "
                    onChange={this.handleChange} />
                </div> <br/>

                <input type="submit" className="btn btn-secondary" value="Add Product" /> | &nbsp;
                <input type="reset" className="btn btn-secondary" value="Clear Fields" />
            </form>
            </div>
        )
    }
}