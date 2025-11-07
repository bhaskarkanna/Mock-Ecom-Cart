import React, {useState} from "react";
export default function CheckoutModal({ onClose, onCheckout }){
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  function submit(e){e.preventDefault(); onCheckout({name:name||"Guest", email});}
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>Checkout</h3>
        <form onSubmit={submit} className="checkout-form">
          <label>Name<input value={name} onChange={e=>setName(e.target.value)} required /></label>
          <label>Email<input type="email" value={email} onChange={e=>setEmail(e.target.value)} /></label>
          <div className="modal-actions">
            <button className="btn-primary" type="submit">Place Order</button>
            <button className="btn-secondary" type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
