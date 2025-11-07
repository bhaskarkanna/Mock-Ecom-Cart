const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:4000";
export async function fetchProducts(){const r=await fetch(`${API_BASE}/api/products`);return r.json();}
export async function fetchCart(){const r=await fetch(`${API_BASE}/api/cart`);return r.json();}
export async function addToCart(productId, qty=1){const r=await fetch(`${API_BASE}/api/cart`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({productId,qty})});return r.json();}
export async function removeCartItem(cartId){const r=await fetch(`${API_BASE}/api/cart/${cartId}`,{method:"DELETE"});return r.json();}
export async function updateCartItem(cartId, qty){const r=await fetch(`${API_BASE}/api/cart/${cartId}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({qty})});return r.json();}
export async function checkout(payload){const r=await fetch(`${API_BASE}/api/checkout`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});return r.json();}
