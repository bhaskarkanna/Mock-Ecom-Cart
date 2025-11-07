import React, { useEffect, useState } from "react";
import { fetchProducts, fetchCart, addToCart, removeCartItem, updateCartItem, checkout } from "./api";
import ProductsGrid from "./components/ProductsGrid";
import CartView from "./components/CartView";
import CheckoutModal from "./components/CheckoutModal";
import { jsPDF } from "jspdf";

export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({ items: [], subtotal: 0, shipping: 0, total: 0 });
  const [showCheckout, setShowCheckout] = useState(false);
  const [receipt, setReceipt] = useState(null);

  async function load() {
    const [p, c] = await Promise.all([fetchProducts(), fetchCart()]);
    setProducts(p);
    setCart(c);
  }
  useEffect(() => { load(); }, []);

  async function handleAdd(productId) {
    await addToCart(productId, 1);
    const c = await fetchCart();
    setCart(c);
  }
  async function handleRemove(cartId) {
    await removeCartItem(cartId);
    const c = await fetchCart();
    setCart(c);
  }
  async function handleUpdate(cartId, qty) {
    if (qty < 1) return;
    await updateCartItem(cartId, qty);
    const c = await fetchCart();
    setCart(c);
  }

  async function handleCheckout(formData) {
    const payload = {
      cartItems: cart.items.map(i => ({ productId: i.productId, qty: i.qty })),
      name: formData.name,
      email: formData.email
    };
    const res = await checkout(payload);
    if (res.receipt) {
      setReceipt(res.receipt);
      setShowCheckout(false);
      const c = await fetchCart();
      setCart(c);
    } else alert("Checkout failed");
  }

  // --- PDF Generator ---
  function downloadPDF(receipt) {
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const left = 40;
    let y = 50;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Vibe Commerce", left, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text("Order Receipt", left + 400, y);
    y += 25;
    doc.setFontSize(10);
    doc.text(`Order ID: ${receipt.id}`, left, y);
    doc.text(`Date: ${new Date(receipt.timestamp).toLocaleString()}`, left + 300, y);
    y += 20;
    doc.text(`Customer: ${receipt.customer.name} (${receipt.customer.email})`, left, y);
    y += 20;

    doc.line(left, y, 550, y);
    y += 15;
    doc.setFont("helvetica", "bold");
    doc.text("Item", left, y);
    doc.text("Qty", left + 280, y);
    doc.text("Price", left + 340, y);
    doc.text("Total", left + 420, y);
    y += 10;
    doc.line(left, y, 550, y);
    y += 15;

    doc.setFont("helvetica", "normal");
    receipt.items.forEach(it => {
      doc.text(it.name, left, y);
      doc.text(String(it.qty), left + 280, y);
      doc.text(`Rs. ${it.unitPrice.toFixed(2)}`, left + 340, y);
      doc.text(`Rs. ${it.lineTotal.toFixed(2)}`, left + 420, y);
      y += 18;
      if (y > 700) { doc.addPage(); y = 50; }
    });

    y += 10;
    doc.line(left, y, 550, y);
    y += 20;
    doc.setFont("helvetica", "bold");
    doc.text(`Total Amount: Rs. ${receipt.total.toFixed(2)}`, left + 340, y);
    y += 30;
    doc.setFont("helvetica", "italic");
    doc.text("Thank you for shopping with Vibe Commerce!", left, y);

    doc.save(`VibeCommerce_Receipt_${receipt.id}.pdf`);
  }

  return (
    <div className="app">
      <header className="site-header">
        <div className="logo">🛍️ <span>Vibe Commerce</span></div>
        <div className="tagline">Professional Mock E-Com Cart</div>
      </header>
      <main className="main-grid">
        <ProductsGrid products={products} onAdd={handleAdd} />
        <CartView
          cart={cart}
          onRemove={handleRemove}
          onUpdate={handleUpdate}
          onOpenCheckout={() => setShowCheckout(true)}
        />
      </main>

      {showCheckout && (
        <CheckoutModal onClose={() => setShowCheckout(false)} onCheckout={handleCheckout} />
      )}

      {receipt && (
        <div className="receipt-panel light">
          <div className="receipt-head">
            <h3>Order Receipt</h3>
            <div className="order-id">{receipt.id}</div>
          </div>
          <div className="receipt-meta">
            {new Date(receipt.timestamp).toLocaleString()}
          </div>
          <div className="receipt-items">
            {receipt.items.map(it => (
              <div key={it.productId} className="receipt-item">
                <img src={it.image_url} alt={it.name} />
                <div className="r-info">
                  <div className="r-name">{it.name}</div>
                  <div className="r-qty">
                    x{it.qty} • Rs.{it.unitPrice}
                  </div>
                </div>
                <div className="r-line">Rs.{it.lineTotal}</div>
              </div>
            ))}
          </div>
          <div className="receipt-total">Total Amount: Rs.{receipt.total}</div>
          <div className="receipt-actions">
            <button onClick={() => downloadPDF(receipt)}>Download Receipt (PDF)</button>
            <button onClick={() => setReceipt(null)}>Close</button>
          </div>
        </div>
      )}

      <footer className="site-footer">© Vibe Commerce — Mock Assignment</footer>
    </div>
  );
}
