package com.kalyanteja.SpringBootProductProgram.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.kalyanteja.SpringBootProductProgram.model.Cart;
import com.kalyanteja.SpringBootProductProgram.model.CartTotal;
import com.kalyanteja.SpringBootProductProgram.model.Product;

@Transactional
@Repository
public class ProductDAO {
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
		public List<Product> getAllProducts(){
			String query = "select * from product;";
			System.out.println("Query: "+ query);
			List<Product> products = jdbcTemplate.query(query, BeanPropertyRowMapper.newInstance(Product.class));
			return products;
		}
		
		public Product getProductById(int id) {
			String query = "select * from product where id=?";
			Object[] args = {id};
			Product product = jdbcTemplate.queryForObject(query, args, BeanPropertyRowMapper.newInstance(Product.class));
			return product;
		}
		
		public List<Product> deleteProduct(int id) {
			String query ="delete from product where id=?";
			System.out.println("Delete Query: "+ query);
			jdbcTemplate.update(query,id);
			
			List<Product> products = getAllProducts();
			return products;
		}
		
		public List<Product> updateProduct(Product product) {
			String query = "update product set product_name=:product_name, available_quantity=:available_quantity, product_price=:product_price, product_image=:product_image, product_description=:product_description where id=:id";
			System.out.println("Update Query: "+ query);
			BeanPropertySqlParameterSource parm = new BeanPropertySqlParameterSource(product);
			NamedParameterJdbcTemplate template = new NamedParameterJdbcTemplate(jdbcTemplate);
			template.update(query, parm);
			
			List<Product> products = getAllProducts();
			return products;
		}
		
		public List<Product> saveProduct(Product product) {
			SimpleJdbcInsert insert = new SimpleJdbcInsert(jdbcTemplate);
			insert.withTableName("product").usingColumns("product_name", "available_quantity", "product_price", "product_image", "product_description");
			BeanPropertySqlParameterSource parm = new BeanPropertySqlParameterSource(product);
			insert.execute(parm);
			
			List<Product> products = getAllProducts();
			return products;
		}
		
		public List<Cart> getAllCartItems(){
			String query = "select * from cart;";
			System.out.println("Query: "+ query);
			List<Cart> cart = jdbcTemplate.query(query, BeanPropertyRowMapper.newInstance(Cart.class));
			return cart;
		}
		
		public Cart getCartById(int id) {
			String query = "select * from cart where product_id=?";
			System.out.println("Cart Query: "+query);
			Object[] args = {id};
			Cart cart = null;
			try {
				cart = jdbcTemplate.queryForObject(query, args, BeanPropertyRowMapper.newInstance(Cart.class));
			}
			catch(Exception e) {
				System.out.println(e);
				return null;
			}
			return cart;
		}
		
		public void addToCart(Cart cart) {
			SimpleJdbcInsert insert = new SimpleJdbcInsert(jdbcTemplate);
			insert.withTableName("cart").usingColumns("user_id", "product_id", "quantity", "amount", "total_amount", "product_name");
			BeanPropertySqlParameterSource parm = new BeanPropertySqlParameterSource(cart);
			insert.execute(parm);
		}
		
		public void updateAddToCart(Cart cart) {
			String query = "update cart set user_id=:user_id, product_id=:product_id, quantity=:quantity, amount=:amount, total_amount=:total_amount, product_name=:product_name where user_id=:user_id and product_id=:product_id";
			System.out.println("Update Query: "+ query);
			BeanPropertySqlParameterSource parm = new BeanPropertySqlParameterSource(cart);
			NamedParameterJdbcTemplate template = new NamedParameterJdbcTemplate(jdbcTemplate);
			template.update(query, parm);
		}
		
		public void removeFromCart(int id) {
			String query ="delete from cart where product_id=? and user_id=1";
			System.out.println("DeleteFromCart Query: "+ query);
			jdbcTemplate.update(query,id);
		}
		
		public void clearCart() {
			String query ="delete from cart where user_id=1;";
			System.out.println("DeleteFromCart Query: "+ query);
			jdbcTemplate.update(query);
		}
		
		public CartTotal getAllCartItemsTotal(){
			String query = "select sum(total_amount) as cartTotal from cart where user_id=1;";
			System.out.println("Query: "+ query);
			CartTotal cartTotal = null;
			try {
				cartTotal = jdbcTemplate.queryForObject(query, BeanPropertyRowMapper.newInstance(CartTotal.class));
			}
			catch(Exception e) {
				System.out.println(e);
				return null;
			}
			return cartTotal;
		}
}
