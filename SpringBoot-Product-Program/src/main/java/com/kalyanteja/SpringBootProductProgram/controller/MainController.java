package com.kalyanteja.SpringBootProductProgram.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.kalyanteja.SpringBootProductProgram.dao.ProductDAO;
import com.kalyanteja.SpringBootProductProgram.model.Cart;
import com.kalyanteja.SpringBootProductProgram.model.CartTotal;
import com.kalyanteja.SpringBootProductProgram.model.Product;



@CrossOrigin("*")
@RestController
public class MainController {
	
	@Autowired
	ProductDAO productDAO;
	
	@RequestMapping(value = "/api/product", method = RequestMethod.GET)
	public List<Product> getAllProducts() {
		List<Product> products = productDAO.getAllProducts();
		//model.addAttribute("productsList", products);
		
		System.out.println("Products List: "+ products);
		
		return products;
	}
	
	@RequestMapping("/api/product/{id}")
	public Product editProductForm(@PathVariable(name="id")int id) {
		Product product = productDAO.getProductById(id);
		System.out.println("Details of Product with ID: "+id +" -> "+ product);
		//System.out.println("Update Product Details: "+ product);
		return product;
	}
	
	@RequestMapping(value = "/api/product/delete/{id}", method = RequestMethod.DELETE)
	public List<Product> delete(@PathVariable(name="id")int id) {
		System.out.println("Came to delete function...");
		List<Product> products = productDAO.deleteProduct(id);
		return products;
	}
	
	@RequestMapping(value = "/api/product/updateProduct/{id}", method = RequestMethod.PUT)
	public List<Product> updateProduct(@PathVariable int id, @RequestBody Product productDetails) {
		System.out.println("Came to update function...");
		Product product = productDAO.getProductById(id);
		product.setProduct_name(productDetails.getProduct_name());
		product.setAvailable_quantity(productDetails.getAvailable_quantity());
		product.setProduct_price(productDetails.getProduct_price());
		product.setProduct_image(productDetails.getProduct_image());
		product.setProduct_description(productDetails.getProduct_description());
		
		System.out.println("New Update Product Values: "+product);
		
		List<Product> products = productDAO.updateProduct(product); 
		return products;
	}
	
	@RequestMapping("api/product/newProduct")
	public List<Product> newProductForm(@RequestBody Product product) {
		List<Product> products = productDAO.saveProduct(product);
		return products;
	}
	
	@RequestMapping("/api/product/addToCart/{id}")
	public void addToCart(@PathVariable(name="id")int id) {
		System.out.println("Came to Add To Cart function...ID: "+id);
		Product product = productDAO.getProductById(id);
		System.out.println("Product details in cart function: "+product);
		Cart cart = productDAO.getCartById(id);
		System.out.println("Cart: "+cart);
		if(cart==null) {
			Cart cart_new = new Cart();
			cart_new.setUser_id(1);
			cart_new.setProduct_id(id);
			cart_new.setQuantity(1);
			cart_new.setAmount(product.getProduct_price());
			
			CartTotal cartTotal = productDAO.getAllCartItemsTotal();
			System.out.println("Cart List: "+ cartTotal);
			
			try {
				cart_new.setTotal_amount(cartTotal.getCartTotal() + product.getProduct_price());
			}
			catch(Exception e) {
				cart_new.setTotal_amount(product.getProduct_price());
				System.out.println("Error" +e);
			}
			
			
			//cart_new.setTotal_amount(product.getProduct_price());
			cart_new.setProduct_name(product.getProduct_name());
			System.out.println("New Added Cart Values: "+cart_new);
			productDAO.addToCart(cart_new);
		}
		else {
			cart.setQuantity(cart.getQuantity()+1);
			CartTotal cartTotal = productDAO.getAllCartItemsTotal();
			System.out.println("Cart List: "+ cartTotal);
			
			cart.setTotal_amount(cartTotal.getCartTotal() + cart.getAmount());
			System.out.println("New Updated Cart Values: "+cart);
			productDAO.updateAddToCart(cart);
		}
	}
	
	@RequestMapping(value = "/api/product/removeFromCart/{id}", method = RequestMethod.DELETE)
	public void removeFromCart(@PathVariable(name="id")int id) {
		System.out.println("Came to removeFromCart function...");
		Cart cart = productDAO.getCartById(id);
		System.out.println("Cart before removal.. "+ cart);
		if(cart==null) {
			System.out.println("Add Product To Remove...");
		}
		else {
			if(cart.getQuantity()==1) {
				productDAO.removeFromCart(id);
			}
			else {
				cart.setQuantity(cart.getQuantity() - 1);
				cart.setTotal_amount(cart.getAmount() * (cart.getQuantity()));
				productDAO.updateAddToCart(cart);
			}
		}
		
	}
	
	@RequestMapping(value = "/api/cart", method = RequestMethod.GET)
	public List<Cart> getAllCartItems() {
		List<Cart> cart = productDAO.getAllCartItems();
		System.out.println("Cart List: "+ cart);
		
		return cart;
	}
	
	@RequestMapping(value = "/api/cart/clear-cart/", method = RequestMethod.DELETE)
	public void ClearCart() {
		System.out.println("Came to Clear Cart function...");
		productDAO.clearCart();
	}
	
	@RequestMapping(value = "/api/cart-total/", method = RequestMethod.GET)
	public CartTotal getAllCartItemsTotal() {
		CartTotal cartTotal = productDAO.getAllCartItemsTotal();
		System.out.println("Cart List: "+ cartTotal);
		
		return cartTotal;
	}
	
}
