import React, { useEffect, useState } from "react";
import axios from "axios";

const urlProducts = 'http://localhost:3001/api/productos';

export const ProductList = ({ carProducts, setCarProducts }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get(urlProducts)
      .then(response => {
        setAllProducts(response.data);
      })
      .catch(error => console.log(error.message));
  }, []);

  const onAddProduct = (carProduct) => {
    const product = {
      id: carProduct._id,
      name: carProduct.name,
      amount: 1,
      price: carProduct.price
    };

    if (carProducts.find(item => item.id === carProduct._id)) {
      const products = carProducts.map(item => (item.id === carProduct._id) ? { ...item, amount: item.amount + 1 } : item);
      setCarProducts([...products]);
      return;
    } else {
      setCarProducts([...carProducts, product]);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = allProducts.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div>
      <div className="search-container" >
        <input type="text" value={searchTerm} onChange={handleSearch} placeholder="Buscar productos" />
      </div>
      
      <div className="container-items">
        {
          filteredProducts.map(product => (
            <div className="item" key={product._id}>
              <div className="info-product">
                <img src={product.url_img} alt={product.name} />
                <h2>{product.name}</h2>
                <p className="price">Bs.- {product.price}</p>
                <button onClick={() => onAddProduct(product)} className="btn-add-cart">Añadir al carrito</button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );  
};
