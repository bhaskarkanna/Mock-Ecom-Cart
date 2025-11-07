import React from "react";
export default function CartView({ cart={items:[]}, onRemove, onUpdate, onOpenCheckout }){
  const items = cart.items || [];
  return (
    <aside className="cart-section">
      <h2>Cart</h2>
      {items.length===0 ? <p className="empty">Your cart is empty</p> : (
        <>
          <div className="cart-items">
            {items.map(it=>(
              <div className="cart-row" key={it.cartId}>
                <img src={it.image_url} alt={it.name}/>
                <div className="cart-info">
                  <div className="cart-name">{it.name}</div>
                  <div className="cart-price">₹{it.price}</div>
                </div>
                <div className="cart-qty">
                  <button onClick={()=>onUpdate(it.cartId, it.qty-1)} disabled={it.qty<=1}>-</button>
                  <span>{it.qty}</span>
                  <button onClick={()=>onUpdate(it.cartId, it.qty+1)}>+</button>
                </div>
                <div className="cart-line">₹{(it.price*it.qty).toFixed(2)}</div>
                <div><button className="btn-remove" onClick={()=>onRemove(it.cartId)}>Remove</button></div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <div>Subtotal: ₹{cart.subtotal}</div>
            <div>Shipping: ₹{cart.shipping}</div>
            <div className="cart-total"><strong>Total: ₹{cart.total}</strong></div>
            <button className="btn-checkout" onClick={onOpenCheckout}>Checkout</button>
          </div>
        </>
      )}
    </aside>
  );
}
