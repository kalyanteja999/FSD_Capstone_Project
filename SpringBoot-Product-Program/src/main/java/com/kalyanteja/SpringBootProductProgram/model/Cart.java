package com.kalyanteja.SpringBootProductProgram.model;

public class Cart {
	private int user_id;
	private int product_id;
	private int quantity;
	private int amount;
	private float total_amount;
	private String product_name;
	private float cart_total;
	
	public Cart() {
		super();
		// TODO Auto-generated constructor stub
		user_id=1;
		product_id=1;
		quantity=1;
		amount=1;
		total_amount=1;
		product_name="abc";
		cart_total=0;
	}
	public Cart(int user_id, int product_id, int quantity, int amount, float total_amount, String product_name) {
		super();
		this.user_id = user_id;
		this.product_id = product_id;
		this.quantity = quantity;
		this.amount = amount;
		this.total_amount = total_amount;
		this.product_name = product_name;
	}
	public Cart(float cart_total) {
		super();
		this.cart_total = cart_total;
	}
	
	public int getUser_id() {
		return user_id;
	}
	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}
	public int getProduct_id() {
		return product_id;
	}
	public void setProduct_id(int product_id) {
		this.product_id = product_id;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	public int getAmount() {
		return amount;
	}
	public void setAmount(int amount) {
		this.amount = amount;
	}
	public float getTotal_amount() {
		return total_amount;
	}
	public void setTotal_amount(float total_amount) {
		this.total_amount = total_amount;
	}
	public String getProduct_name() {
		return product_name;
	}
	public void setProduct_name(String product_name) {
		this.product_name = product_name;
	}
	public float getCart_total() {
		return cart_total;
	}
	public void setCart_total(float cart_total) {
		this.cart_total = cart_total;
	}
	
	@Override
	public String toString() {
		return "Cart [user_id=" + user_id + ", product_id=" + product_id + ", quantity=" + quantity + ", amount="
				+ amount + ", total_amount=" + total_amount + ", product_name=" + product_name + ", cart_total="
				+ cart_total + "]";
	}
}
