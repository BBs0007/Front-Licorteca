import React, { useEffect, useState } from "react";
import axios from "axios";

const urlProducts = 'http://localhost:3001/api/productos';
const urlSuppliers = 'http://localhost:3001/api/proveedores';
const urlCatalogs = 'http://localhost:3001/api/catalogos';

const ProductList = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [catalogs, setCatalogs] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState('');
  const [selectedCatalog, setSelectedCatalog] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(urlSuppliers)
      .then(response => {
        setSuppliers(response.data);
      })
      .catch(error => console.log(error.message));
  }, []);

  useEffect(() => {
    if (selectedSupplier !== '') {
      axios.get(urlCatalogs + `/${selectedSupplier}`)
        .then(response => {
          setCatalogs(response.data);
        })
        .catch(error => console.log(error.message));
    }
  }, [selectedSupplier]);

  useEffect(() => {
    if (selectedCatalog !== '') {
      const catalog = catalogs.find(catalog => catalog._id === selectedCatalog);
      if (catalog) {
        setProducts(catalog.products);
      }
    }
  }, [selectedCatalog, catalogs]);

  const handleSupplierChange = (event) => {
    setSelectedSupplier(event.target.value);
    setSelectedCatalog('');
    setProducts([]);
  };

  const handleCatalogChange = (event) => {
    setSelectedCatalog(event.target.value);
  };

  const onAddProduct = (product) => {
    // Agregar la lógica para añadir el producto al carrito
  };

  return (
    <div>
      <div className="container-items">
        <select onChange={handleSupplierChange}>
          <option value="">Seleccione un Proveedor</option>
          {suppliers.map(supplier => (
            <option key={supplier._id} value={supplier._id}>{`${supplier.name}`}</option>
          ))}
        </select>

        {selectedSupplier !== '' && (
          <select onChange={handleCatalogChange}>
            <option value="">Seleccione un Catálogo</option>
            {catalogs.map(catalog => (
              <option key={catalog._id} value={catalog._id}>{catalog.name}</option>
            ))}
          </select>
        )}
      </div>

      <div className="container-items">
        {products.length > 0 ? (
          products.map(product => (
            <div className="item" key={product._id}>
              <div className="info-product">
                <h2>{product.name}</h2>
                <p className="price">Bs.- {product.price}</p>
                <button onClick={() => onAddProduct(product)} className="btn-add-cart">Añadir al carrito</button>
              </div>
            </div>
          ))
        ) : (
          <p>No hay productos disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
