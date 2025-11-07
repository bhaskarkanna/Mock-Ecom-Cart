import React from "react";
export default function ProductsGrid({ products=[], onAdd }){
  return (
    <section className="products-section">
      <h2>Products</h2>
      <div className="product-grid">
        {products.map(p=>(
          <div className="product-card" key={p.id}>
            <img className="product-image" src={p.image_url} alt={p.name}/>
            <div className="product-body">
              <div className="product-title">{p.name}</div>
              <div className="product-cat">{p.category}</div>
              <div className="product-price">₹{p.price}</div>
              <button className="btn-add" onClick={()=>onAdd(p.id)}>Add to cart</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
