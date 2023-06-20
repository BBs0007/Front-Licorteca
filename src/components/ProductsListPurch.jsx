import React, { useEffect, useState } from "react";
import axios from "axios";

const urlProducts = 'http://localhost:3001/api/productos';
const urlSuppliers = 'http://localhost:3001/api/proveedores';
const urlCatalogs = 'http://localhost:3001/api/catalogos';

export const ProductList = ({ carProducts, setCarProducts }) => {
  const [suppliers, setSuppliers] = useState([]);
  const [catalogs, setCatalogs] = useState([]);
  const [productsCat, setProductsCat] = useState([]);
  const [supplier, setSupplier] = useState('');
  const [catalog, setCatalog] = useState('');

  useEffect(() => {
    peticionGetSuppliers();
  }, []);

  const peticionGetSuppliers = () => {
    axios.get(urlSuppliers)
      .then(response => {
        setSuppliers(response.data);
      })
      .catch(error => console.log(error.message));
  }

  const handleSupplierChange = async (event) => {
    event.persist();
    await setSupplier(event.target.value)
    console.log(peticionGetCatalogsBySuppliers());
    peticionGetCatalogsBySuppliers();
  };

  const peticionGetCatalogsBySuppliers = () => {
    axios.get(urlCatalogs)
      .then(response => {
        setCatalogs(response.data.proveedor_id === supplier.id);
      })
      .catch(error => console.log(error.message));
  }

  const handleCategoryChange = async (event) => {
    event.persist();
    await setCatalog(event.target.value);
    cargarProductoCat();
  };

  const cargarProductoCat = () => {
    catalogs.forEach(catalog => {
      if (catalog._id === catalog) {
        setProductsCat(catalog.productos);
      }
    });
    console.log(productsCat);
  }

  const onAddProduct = (carProduct) => {
    // const product = {
    //   id: carProduct.id,
    //   name: carProduct.name,
    //   amount: 1,
    //   price: carProduct.price
    // };

    // if (carProducts.find(item => item.id === carProduct.id)) {
    //   const products = carProducts.map(item => (item.id === carProduct.id) ? { ...item, amount: item.amount + 1 } : item);
    //   setCarProducts(products);
    //   return;
    // }

    // setCarProducts([...carProducts, product]);
  };

  return (
    <div>
      <div className="container-items">
        <select onChange={handleSupplierChange}>
          <option value="nada">Seleccione un Proveedor</option>
          {suppliers.map(supplier => (
            <option key={supplier._id} value={supplier._id}>{supplier.name}</option>
          ))}
        </select>

        {
          catalogs.length > 0 ? (
            <select onChange={handleCategoryChange}>
              <option value="nada">Seleccione un Catálogo</option>
              {
                catalogs.map(catalog => (
                  <option key={catalog._id} value={catalog._id}>{catalog.name}</option>
                ))
              }
            </select>
          ) : null
        }
      </div>

      <div className="container-items">
        {
          productsCat.length > 0 ? (
            productsCat.map(product => (
              <div className="item" key={product._id}>
                <div className="info-product">
                  <h2>{product.name}</h2>
                  <p className="price">Bs.- {product.price}</p>
                  <button onClick={() => onAddProduct(product)} className="btn-add-cart">Añadir al carrito</button>
                </div>
              </div>
            ))
          ) : null
        }
      </div>
    </div>
  );
}