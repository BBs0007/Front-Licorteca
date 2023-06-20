import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import Sidenav from "../components/Sidenav";
import { Header } from "../components/HeaderPurch";
import { ProductList } from "../components/ProductsListPurch";
import axios from 'axios';

const urlProducts = "http://localhost:3000/api/products";

function PurchasePage() {
  const [carProducts, setCarProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [countProducts, setCountProducts] = useState(0);

  

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Sidenav />
        <Box component="main" sx={{ flexFlow: 1, p: 3 }}>
          <Header
            carProducts={carProducts}
            setCarProducts={setCarProducts}
            products={products}
            setProducts={setProducts}
            total={total}
            setTotal={setTotal}
            countProducts={countProducts}
            setCountProducts={setCountProducts}
          />
          <ProductList
            carProducts={carProducts}
            setCarProducts={setCarProducts}
            products={products}
            setProducts={setProducts}
            total={total}
            setTotal={setTotal}
            countProducts={countProducts}
            setCountProducts={setCountProducts}
          />
        </Box>
      </Box>
    </>
  )
}

export default PurchasePage;
