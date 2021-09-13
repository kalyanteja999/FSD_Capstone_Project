package com.kalyanteja.SpringBootProductProgram.model;

public class CartTotal {
	private float cartTotal;

	public CartTotal() {
		super();
		// TODO Auto-generated constructor stub
	}
	public CartTotal(float cartTotal) {
		super();
		this.cartTotal = cartTotal;
	}

	public float getCartTotal() {
		return cartTotal;
	}
	public void setCartTotal(float cartTotal) {
		this.cartTotal = cartTotal;
	}

	@Override
	public String toString() {
		return "CartTotal [cartTotal=" + cartTotal + "]";
	}
}