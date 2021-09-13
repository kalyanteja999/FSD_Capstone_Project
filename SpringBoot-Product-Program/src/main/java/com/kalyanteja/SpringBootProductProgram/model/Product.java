package com.kalyanteja.SpringBootProductProgram.model;

public class Product {
	
	private int id;
	private String product_name;
	private int available_quantity;
	private int product_price;
	private String product_image;
	private String product_description;
	
	public Product() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Product(int id, String product_name, int available_quantity, int product_price, String product_image,
			String product_description) {
		super();
		this.id = id;
		this.product_name = product_name;
		this.available_quantity = available_quantity;
		this.product_price = product_price;
		this.product_image = product_image;
		this.product_description = product_description;
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getProduct_name() {
		return product_name;
	}
	public void setProduct_name(String product_name) {
		this.product_name = product_name;
	}
	public int getAvailable_quantity() {
		return available_quantity;
	}
	public void setAvailable_quantity(int available_quantity) {
		this.available_quantity = available_quantity;
	}
	public int getProduct_price() {
		return product_price;
	}
	public void setProduct_price(int product_price) {
		this.product_price = product_price;
	}
	public String getProduct_image() {
		return product_image;
	}
	public void setProduct_image(String product_image) {
		this.product_image = product_image;
	}
	public String getProduct_description() {
		return product_description;
	}
	public void setProduct_description(String product_description) {
		this.product_description = product_description;
	}
	
	@Override
	public String toString() {
		return "Product [id=" + id + ", product_name=" + product_name + ", available_quantity=" + available_quantity
				+ ", product_price=" + product_price + ", product_image=" + product_image + ", product_description="
				+ product_description + "]";
	}
}
